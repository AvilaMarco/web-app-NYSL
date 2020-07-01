var participantes = {};
var fechas = null;
var docrefuser = ''
var provider = new firebase.auth.GoogleAuthProvider();
let fireStore = firebase.firestore();
// var toDay = new Date().toDateString().substring(4,10).toLowerCase()
var toDay = 'oct 06'
cargardatosjson()

function eventToDay(ismes,today) {
	for(meses in fechas){
		for(dias in fechas[meses]){
			if (ismes && today.substring(0,3) == meses.substring(0,3).toLowerCase()){
				return meses
			}else if(!ismes && today.substring(4) == dias){
				return dias
			}else if(!ismes && today.substring(5) == dias && today.substring(4,5) == 0){
				return dias
			}
	 	}
	}
	return 'error'
}
// window.scrollTo(0,430)

function traerComentarios(id) {
	fireStore.collection("matchcomments").doc(id).collection('comenkey').onSnapshot(function(querySnapshot) {
		app.arraycomments = []
    querySnapshot.forEach(function(doc) {
        app.arraycomments.push(doc.data())
    });
});
}

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
	app.datosuser = {}
	app.datosuser.photoURL = user.photoURL
	app.datosuser.displayName = user.displayName
	app.datosuser.email = user.email
	setTimeout(e=> {document.querySelector('#userlogin').classList.remove('d-none')
				document.querySelector('#userlogin').classList.add('animationdiv')},2500)
	docrefuser = fireStore.collection('usuarios').doc(app.datosuser.displayName).collection('tarjetas')
	agregarUsuarios(user.displayName,app.datosuser)

	docrefuser.get().then(function(querySnapshot) {
	    querySnapshot.forEach(function(doc) {
	        app.datosarratys.push(doc.data())
	    });
	});
}else{
	app.datosarratys = []
	app.datosuser = null
} 
})

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
		fireStore.doc("json/fechas").get().then(function(doc) {
	    if (doc.exists) {
	    	fechas = doc.data().fechas
        app.mes = eventToDay(true,toDay)
        localStorage.setItem('fechas', JSON.stringify(fechas));
        app.fetchokey = true;
        setTimeout(e=> app.screanready = true,1000);
	    }
		})
	}else{
		fechas = JSON.parse(auxFechas)
		setTimeout(e=> app.fetchokey = true, 2000);
		setTimeout(e=> app.screanready = true,2500);
	}
	
	if (auxApuntes == null) {
		fireStore.doc("json/participantes").get().then(function(doc) {
	    	if (doc.exists) {
	        participantes = doc.data().participantes
	        localStorage.setItem('participantes', JSON.stringify(participantes));
	    	}
		})
	}else{
		participantes = JSON.parse(auxApuntes)
	}
}

function diasPorMes(mesaux) 
{
	let dias = []
	for(dia in fechas[mesaux]){
		dias.push(dia)
	}
	return dias
}

function returnmeses()
{
	let meses = []
	for(mesaux in fechas)
	{
		meses.push(mesaux)
	}
	return meses
}

function buscarDatosPorFecha(equipo,jugadorT,fechasteam,moths){
	let arrayteam = []
	for(mes in fechas)
	{
		for(dias in fechas[mes])
		{
			for(partidos in fechas[mes][dias])
			{
				let aux2 = Object.values(fechas[mes][dias][partidos])
				for (var i = 0; i < aux2.length; i++) 
				{
					if (fechasteam == aux2[i] && fechasteam!=null){
						if(moths == 'All'){
							arrayteam.push({'mes':mes,'dia':dias})
							arrayteam.push(fechas[mes][dias][partidos])
						}else if(mes == moths){
							arrayteam.push({'mes':mes,'dia':dias})
							arrayteam.push(fechas[mes][dias][partidos])
						}
					}
					if ((aux2[i]==equipo && toDay.substring(0,3) == mes.substring(0,3).toLowerCase() && toDay.substring(4) <= parseInt(dias, 10))&& fechasteam == null) 
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
	if (arrayteam.length !=0) {
		return arrayteam
	}else{
		return 'error'
	}	
}

function buscarEnEquipos(jugadorT){
	for(equipos in participantes)
	{
		if (equipos == jugadorT.toUpperCase()) 
		{
			return buscarDatosPorFecha(equipos,null,null)	
		}

		let aux = Object.values(participantes[equipos])

		for (var i = 0; i < aux.length; i++) 
		{
			if (aux[i]==jugadorT.toLowerCase()) 
			{
				return buscarDatosPorFecha(equipos,jugadorT,null)
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
}
// 
function commentsMatch(comentario,user,photo,id) {
	fireStore.collection("matchcomments").doc(id).collection('comenkey').doc(new Date().toString().substring(4)).set({
	'date': new Date,
	'linkfoto' : photo,
    'username': user,
    'comment' : comentario
	})
	.then(function(docRef) {
	    console.log("comentario  m enviado correctamente");
	})
}

function agregarUsuarios(usuario, objetouser){
fireStore.doc("usuarios/"+usuario).set({objetouser}).then(function(docRef) {
	    console.log("usuario enviado correctamente");
	})
}

function actualizarNickUser(usuario, nickuser){
fireStore.doc("usuarios/"+usuario).update({
	'nick' : nickuser
}).then(function(docRef) {
	    console.log("nick enviado correctamente");
	})
}

function actualizarTarjetaUsuarios(objetotarjeta){
	objetotarjeta['id'] = ''
	docrefuser.add(objetotarjeta).then(function(docRef) {
	    console.log("tarjeta enviado correctamente");
	    let auxid = docRef.id
			objetotarjeta['id'] = auxid
			app.datosarratys.push(objetotarjeta)
			updateid(auxid)
	})
}

function borrarTarjetaUsuarios(id){
	docrefuser.doc(id).delete().then(function(docRef) {
    console.log("tarjeta borrada correctamente");
	})
}

function updateid(idt) {
	docrefuser.doc(idt).update({
		'id' : idt
	}).then(function(docRef) {
		console.log("update");
	})
}