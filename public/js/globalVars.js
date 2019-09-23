var participantes = {}
var fechas = {}
var provider = new firebase.auth.GoogleAuthProvider();

let fireStore = firebase.firestore();
// base de datos
let docRefFechas = fireStore.doc("json/fechas");
let docRefParticipantes = fireStore.doc("json/participantes");



firebase.auth().onAuthStateChanged(function(user) {
if (user) {
	app.datosuser = {}
	app.datosuser.photoURL = user.photoURL
	app.datosuser.displayName = user.displayName
	app.datosuser.email = user.email
	app.datosuser.nick = ''
	document.querySelector('#userlogin').classList.remove('d-none')
	document.querySelector('#userlogin').classList.add('animationdiv')
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
	        console.log("Document data:", doc.data());
	        fechas = doc.data().fechas
	        app.fechas = doc.data().fechas
			app.mes = meses()[0]
	        localStorage.setItem('fechas', JSON.stringify(doc.data().fechas));
	    } else {
	        // doc.data() will be undefined in this case
	        console.log("No such document!");
	    }
		}).catch(function(error) {
	    	console.log("Error getting document:", error);
		});
	}else{
		fechas = auxFechas.parse()
		console.log(fechas)
		app.fechas = fechas
		app.mes = meses()[0]
	}
	
if (auxApuntes == null) {
	docRefParticipantes.get().then(function(doc) {
    	if (doc.exists) {
        console.log("Document data:", doc.data());
        app.participantes = doc.data()
        localStorage.setItem('participantes', JSON.stringify(doc.data().participantes));
    	} else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    	}
	}).catch(function(error) {
    	console.log("Error getting document:", error);
	});
}else{
	participantes = auxApuntes.parse()
	console.log(participantes)
	app.participantes = participantes
}
}