// funcion de orden superior, funciones que reciben parametros para funcionar
// array.map(function(variable de iteracion[i]/valor del objeto actual,index[indice o posicion del elemento]
// /i,arr(puedo llamar al array )),thisvalue(valor a usar como this en la funcion)) recorre por completo un array,
// recibe function de parametro y retorna una nueva funcion, la misma cantidad de elementos, retunr
// map siempre retorna algo


// funcion flecha / lambda no necasariamente usa un array
// var newarray = array.map(i=>i*2)
//var newarray = array.map((parametros) => n*index*) no acepta this

// array.forEach(function(currentValue[obligatorio],index,arr),thisvalue) no retorna nada por defecto

// variable con string `texto ${operacion con variable}` etiquetas html las toma como texto

// array.filter(function(sinparametros)) retorna la misma o menor catidad de elementos del array
// solo retorna los valores que tiene el array

// operador ternario
// let myLambda = item => item%2 ===0 ? item : null;
// .......................condicion ? entonces:sino;
// operador logico ¿, sirve para comparar con algo que ouede ser nulo8(algo || otra cosa)

//api	http://animista.net/ 	https://d3js.org/	https://es.seaicons.com/56807/

// doom
// encontrar elementos html document/(getElementById)/(getElementBytag)/(getElementByclassname)
// modficar elemt.attributo	elemt.innerHTML		elemt.style.property classlst
// crear document.createelement(etiqueta MAYUSCULA)
// array.from(convertir a array).forEach(p => p.style.color = "blue");
//appendchilda agregar hijo
//array.foreach(p => {
	// objeto.onclick = function;
// })

//document.queryselector -> primer elemento que encuentra
// document.queryselectorall -> todos los que encuentra igual que css
// elemento.classlist.toggle("asfa") -> interruptor
// elemento.addEventListener("evento", function)

// switch (expresión) {
//   case valor1:
//     //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
//     [break;]
//   case valor2:
//     //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
//     [break;]
//   ...
//   case valorN:
//     //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
//     [break;]
//   default:
//     //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
//     [break;]
// }

// https://www.azulweb.net/#

/*ajax enviar datos a un servidor, peticiones de cambios, es una tenologia
asincronico java scip y XMLDocument
fetch(url,)
.then(function)*/

/*vue instancia 
computed se ejecuta cuando cambian su variables usadas
methods se ejecuta siempe que cambian las vaiables de as instancia*/
//key de open state:13b2120c-4d1c-4c70-8904-151c6088644f
//http://docs.openstates.org/en/latest/api/index.html

//obtene datos json: http://static.socraticarts.com/AjaxTester/
/*/metadata/state/
/legislators?state=CA*/
// scope del query querySelector


/*[{
	"id": "CAL000385", 
	"leg_id": "CAL000385", 
	"all_ids": ["CAL000385"], 
	"full_name": "Brian Maienschein", "first_name": "Brian", "last_name": "Maienschein", 
	"suffix": "", 
	"photo_url": "https://www.assembly.ca.gov/sites/assembly.ca.gov/files/memberphotos/ad77-brian_maienschein_120x150.jpg", 
	"url": "https://a77.asmdc.org/", 
	"email": null, 
	"party": "Democratic", 
	"chamber": "lower", 
	"district": "77", 
	"state": "ca", 
	"sources": [{"url": "http://assembly.ca.gov/assemblymembers"}], 
	"active": true, 
	"roles": [{"term": "20172018", "district": "77", "chamber": "lower", "state": "ca", "party": "Democratic", "type": "member", "start_date": null, "end_date": null}], 
	"offices": [{"name": "Capitol Office", "fax": null, "phone": "916-319-2077", "email": null, "address": "P.O. Box 942849;Sacramento, CA 94249-0077", "type": "capitol"}, {"name": "District Office #1", "fax": null, "phone": "858-675-0077", "email": null, "address": "12396 World Trade Drive, Suite 118;San Diego, CA 92128", "type": "district"}], 
	"old_roles": {}, 
	"middle_name": "", 
	"country": "us", 
	"level": "state", 
	"created_at": "2018-10-18 14:35:18", 
	"updated_at": "2019-08-22 23:30:37"
}*/

/*function de orden superior, tiene parametro funcion y la palabra this, en vue hay que usar en general un aux
lista computada = computed sirve para retornar listas de cosas siempre se usa el return*/

// https://mindhubweb.xtolcorp.com/ebooks/item?id=1439/**/
// created:{
// 	lo primero que se ejecuta con el vue, cuando se instancia
// }

// scope de var let const
// if(){
// 	var a 	let b 
// 	if(){
// 		var sigue siendo la misma variable, pero let es otra
// 		var a let b
// 	}
// }

// switch("2"){
// 	case "1":
// 	console.log("2");
// 	case "2":
// 	console.log("2");
// 	case"3":
// 	console.log("2")
// 	break;
// 	case"4":
// 	console.log("2")
// }

// let arr = [24,6,7,1,4,7,8]
// for (var i = 8; i >= 0; --i) {
// 	console.log(i)
// 	continue;
// 	console.log(i+1)
// 	// console.log(arr[i])
// }

// arrr.foreach(coldback,this)
// arrr.foreach((item,index,arr)=>instrucciones de la function,this)

// let a = document.createelement("A")
// a.classlist.add("link")
// a.href = "algo.com"
// nodo de texto para agregar como hijo a un elemento
// let text = document.createtextnode("google")
// event.prevent.default()
// a.appendchild(text)

// ajax(asynchronics js and xml)
// json(js object notation)
// fetch peticiones asincronicas a servidors(endpoint)(tambien sirve con json locales)
// fetch(endpoint,init).then(function(response){
// 	if(response.ok){
// 		response.JSON()
// 		200 -> ok
// 	}else{
// 		4xx -> error del cliente
// 		404 -> no se encontro el recurso
// 		403 -> no hay accesoo
// 		401 -> sin autorizacion
// 		400 -> bad request
// 		500 -> error del servidor
// 		throw new error(response.status)
// 	}
// }).then(function(json){
// 	uso los datos json
// }).catch(function(error){
// 	console.log(error)
// })
// endpoint = "json local"
// init = {
// 	method:'post',
// 	headers:{datos de autorizacion}
// }

//https://webappnysl-b397e.firebaseapp.com/

// fiebase:
// firebase login(logout)
// firebase init
// firebase deploy
// datarules-> reglas para acceder a la base de datos
// carpeta public
// abilitar google para ver(autorizacion)
// var provider = new firebase.auth.GoogleauthProvider()
// firebase.auth().signInwithPopup(provider);
// firebase.auth().signOut()

// database

// var newkey = firebase.database().ref('nombrekey').push().key()='key()crea una nueva key ramdom'
// var updates = {}
// update['posts' + newkey] = {
// 	messge:oasjdoasd,
// 	username =aosdjasd
// }

// firebase.database().ref().update(updates);

// update['form/matfh4'] = {mesege:alsjd}
// la barra sirve para entrar en un nueva 'carpeta' objeto

// FIREBASE:
// collection and documents, como objetos json, los documents guardan json y las collections guardan documents y asi sucesvamente
// collection>documents>subcollection>documents
// one root collection? or more?
// GUARDAR DATOS EN FIRESTORE
// luego de inicializar firebase
// var firestore = firebase.firestore()
// var dOCREF = firestore.doc("ruta donde quiero guardar datos, respetando,collection>document>collection>document")
// los datos solo se guardan en document
// dOCREF.set({
// 	datos a guardar, se escirbe en json
// 	tambien funciona con promesas
// }).then(function(){
// 	console.log("todo nice")
// }).catch(function(error){
// 	console.log(error)
// })

// OBTENER DATOS DE FIRESTORE
// dOCREF.get().then(function(doc){
// 	if(doc && doc.exists){
// 		const data = doc.data();
// 		data tiene los DATOS que necesito
// 	}
// }).catch(function(error){
// 	console.log(error)
// })

// USAR O ACTUALIZAR DATOS EN TIEMPO REAL 
// getRealTimeUpdate = function(){
// 	dOCREF.onSnapshot(function(doc){
// 		if(doc && doc.exists){
// 		const data = doc.data();
// 		data tiene los DATOS que necesito
// 	}
// 	})
// }
// onSnapshot escuhca cuando se realiza un cambio en el documento donde se referencio, tambien recibe un documento como parametro en el 
// callback de su funcion anonima
// getRealTimeUpdate()
// a[href^='#']--> elije los elemetos a con tributo href que comienzan con #
// fireStore.collection("users").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//     });
// });


// USUARIOS:
// definir login con google
// var provider = new firebase.auth.GoogleAuthProvider();
// firebase.auth().signInWithRedirect(provider).then(function(result){
// fireba
// })
// usuario actual
// firebase.auth().currentUser;
// 	datos de usuario
// 	name = user.displayName;
//   email = user.email;
//   photoUrl = user.photoURL;
//   emailVerified = user.emailVerified;

// cerrar sesion -> firebase.auth().signOut()

//  eliminar usuario => var user = firebase.auth().currentUser;
// 		user.delete().then(function() {
// 		  // User deleted.
// 		}).catch(function(error) {
// 		  // An error happened.
// 		});



// 		https://firebase.google.com/docs/database/security/user-security

// function hola(){
// fireStore.doc("json/fechas").set({fechas}).then(function(docRef) {
// 	    console.log("fechas enviado correctamente");
// 	}).catch(function(error) {
// 	    console.error("Error adding document: ", error);
// 	});

// }

// vue created()
// mounted() -> luego de que vue cargo todos los datos de vue
// filtro all
// consejos login
