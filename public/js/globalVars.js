var participantes = {};
var fechas = {};
var idramdon = 0
var provider = new firebase.auth.GoogleAuthProvider();
// cargardatosjson();
let fireStore = firebase.firestore();
// base de datos
let docRefFechas = fireStore.doc("json/fechas");
let docRefParticipantes = fireStore.doc("json/participantes");

cargardatosjson()


firebase.auth().onAuthStateChanged(function(user) {
if (user) {
	app.datosuser = {}
	app.datosuser.photoURL = user.photoURL
	app.datosuser.displayName = user.displayName
	app.datosuser.email = user.email
	app.datosuser.nick = ''
	document.querySelector('#userlogin').classList.remove('d-none')
	document.querySelector('#userlogin').classList.add('animationdiv')
	agregarUsuarios(user.displayName,app.datosuser)
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

function agregarComentarios(comentario) {
	fireStore.collection("commets").add({
    feedback:comentario
	})
	.then(function(docRef) {
	    console.log("comentario enviado correctamente");
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

function agregarUsuarios(usuario, objetouser){
fireStore.doc("usuarios/"+usuario).set({objetouser}).then(function(docRef) {
	    console.log("usuario enviado correctamente");
	}).catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

function actualizarTarjetaUsuarios(usuario, objetotarjeta){
fireStore.collection('usuarios').doc(usuario).collection('tarjetas').add({objetotarjeta}).then(function(docRef) {
	    console.log("tarjeta enviado correctamente");
		objetotarjeta['id'] = docRef.id
		app.datosarratys.push(objetotarjeta)
	}).catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

function borrarTarjetaUsuarios(usuario, id){
fireStore.doc("usuarios/"+usuario+"/tarjeta/"+id).delete().then(function(docRef) {
	    console.log("tarjeta borrada correctamente");
	}).catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}


function actualizarNickUser(usuario, nickuser){
fireStore.doc("usuarios/"+usuario).update({
	nick : nickuser
}).then(function(docRef) {
	    console.log("nick enviado correctamente");
	}).catch(function(error) {
	    console.error("Error adding document: ", error);
	});
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