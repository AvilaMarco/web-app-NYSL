var participantes = {};
var fechas = {};
var docrefuser = ''
var provider = new firebase.auth.GoogleAuthProvider();
// cargardatosjson();
let fireStore = firebase.firestore();
// base de datos
let docRefFechas = fireStore.doc("json/fechas");
let docRefParticipantes = fireStore.doc("json/participantes");

cargardatosjson()
// ir a 140

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
	app.datosuser = {}
	app.datosuser.photoURL = user.photoURL
	app.datosuser.displayName = user.displayName
	app.datosuser.email = user.email
	app.datosuser.nick = ''
	document.querySelector('#userlogin').classList.remove('d-none')
	document.querySelector('#userlogin').classList.add('animationdiv')
	docrefuser = fireStore.collection('usuarios').doc(app.datosuser.displayName).collection('tarjetas')
	agregarUsuarios(user.displayName,app.datosuser)
	docrefuser.get().then(function(querySnapshot) {
	    querySnapshot.forEach(function(doc) {
	        // doc.data() is never undefined for query doc snapshots
	        // console.log(doc.id, " => ", doc.data());
	        app.datosarratys.push(doc.data())
	    });
	});
}else{
	app.datosuser = null
} 
})

function diasPorMes(mesaux) 
{
	let dias = []
	for(dia in fechas[mesaux]){
		dias.push(dia)
	}
	return dias
}

function meses()
{
	let meses = []
	for(mesaux in fechas)
	{
		meses.push(mesaux)
	}
	return meses
}

function buscarDatosPorFecha(equipo,jugadorT){
	for(mes in fechas)
	{
		for(dias in fechas[mes])
		{
			for(partidos in fechas[mes][dias])
			{
				let aux2 = Object.values(fechas[mes][dias][partidos])
				for (var i = 0; i < aux2.length; i++) 
				{
					if (aux2[i]==equipo) 
					{
						let objetoaux = {}
						objetoaux['location'] = fechas[mes][dias][partidos].location
						objetoaux['directory'] = fechas[mes][dias][partidos].directory
						objetoaux['link'] = fechas[mes][dias][partidos].link
						objetoaux['time'] = fechas[mes][dias][partidos].time
						objetoaux['teamA'] = fechas[mes][dias][partidos].teamA
						objetoaux['teamB'] = fechas[mes][dias][partidos].teamB
 						objetoaux['fecha'] = dias+' de '+mes
 						objetoaux['team'] = equipo 
 						objetoaux['isteam'] = true
 						if(jugadorT!=null){
 							objetoaux['player'] = jugadorT
 							objetoaux['isteam'] = false
 						}
 						return objetoaux
 					}
 				}
 			}
 		}
	}
	return 'error'
}

function buscarEnEquipos(jugadorT){
	for(equipos in participantes)
	{
		if (equipos == jugadorT.toUpperCase()) 
		{
			return buscarDatosPorFecha(equipos,null)	
		}

		let aux = Object.values(participantes[equipos])

		for (var i = 0; i < aux.length; i++) 
		{
			if (aux[i]==jugadorT.toLowerCase()) 
			{
				return buscarDatosPorFecha(equipos,jugadorT)
			}
		}
	}
	return 'error'
}

function agregarComentarios(comentario,user) {
	fireStore.collection("commets").add({
    'feedback':comentario,
    'username':user
	})
	.then(function(docRef) {
	    console.log("comentario enviado correctamente");
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

function commentsMatch(comentario,user,photo,id) {
	fireStore.collection("matchcomments").doc(id).collection('comenkey').add({
	'linkfoto' : photo,
    'username': user,
    'comment' : comentario
	})
	.then(function(docRef) {
	    console.log("comentario  m enviado correctamente");
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

function traerComentarios(id) {
	fireStore.collection("matchcomments").doc(id).collection('comenkey').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});
}

function agregarUsuarios(usuario, objetouser){
fireStore.doc("usuarios/"+usuario).set({objetouser}).then(function(docRef) {
	    console.log("usuario enviado correctamente");
	}).catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

function actualizarNickUser(usuario, nickuser){
fireStore.doc("usuarios/"+usuario).update({
	'nick' : nickuser
}).then(function(docRef) {
	    console.log("nick enviado correctamente");
	}).catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

function actualizarTarjetaUsuarios(objetotarjeta){
	objetotarjeta['id'] = ''
docrefuser.add(objetotarjeta).then(function(docRef) {
	    console.log("tarjeta enviado correctamente");
	    let auxid = docRef.id
		objetotarjeta['id'] = auxid
		app.datosarratys.push(objetotarjeta)
		updateid(auxid)
	}).catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

function borrarTarjetaUsuarios(id){

docrefuser.doc(id).delete().then(function(docRef) {
	    console.log("tarjeta borrada correctamente");
	}).catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

function updateid(idt) {
	docrefuser.doc(idt).update({
			'id' : idt
		}).then(function(docRef) {
			console.log("update");
		}).catch(function(error) {
		console.error("Error: ", error);});
	// body...
}

window.addEventListener("orientationchange", function() {
	if (screen.orientation.angle == 0) {
		app.isrotate = false;
		app.linkimg = 'img/fondo.png';
	}else if(screen.orientation.angle != 0){
		app.isrotate = true;
		app.linkimg = 'img/header-landscape.jpg';
	}
});

function cargardatosjson() {
	let auxFechas = localStorage.getItem('fechas');
	let auxApuntes = localStorage.getItem('participantes');

	if (auxFechas == null) {
		docRefFechas.get().then(function(doc) {
	    if (doc.exists) {
	    	let aux = doc.data().fechas
	        fechas = aux
	        app.fechas = aux
			app.meses = meses()
	        localStorage.setItem('fechas', JSON.stringify(aux));
	    }
		}).catch(function(error) {
	    	console.log("Error getting document:", error);
		});
	}else{
		fechas = JSON.parse(auxFechas)
	}
	
if (auxApuntes == null) {
	docRefParticipantes.get().then(function(doc) {
    	if (doc.exists) {
        let aux = doc.data().participantes
        participantes = aux
        app.participantes = aux
        localStorage.setItem('participantes', JSON.stringify(aux));
    	}
	}).catch(function(error) {
    	console.log("Error getting document:", error);
	});
}else{
	participantes = JSON.parse(auxApuntes)
}
}