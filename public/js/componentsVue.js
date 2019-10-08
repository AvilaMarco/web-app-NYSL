Vue.component('navs-tabs',{
	template:`
	<div @click="mostrarWebs" class="fondo fixed-bottom d-flex menu">
		<div class="padingelement border border-dark botoncito flex-fill text-center" :class="{activeTab: selecttab == tab}" v-for="(tab,index) in tabsnav" @click="selecttab=tab">
			<i :class="iconos[index]"></i><br>{{tab}}
		</div>
	</div>`,
	data(){
		return{
			tabsnav :['Home','Schedule','Social'],
			selecttab : 'Home',
			iconos:['fas fa-home','far fa-calendar-alt','fas fa-users']
		}
	},
	methods:{
		mostrarWebs(){
			this.$emit('show',this.selecttab)
		}
	}
})

Vue.component('mapasg',{
	props:{
		linkmapa:{
			type:String
		},
		infomapa:{
			type:String
		},
		infomapa2:{
			type:String
		},
		boolean:{
			type:Boolean
		}
	},
	template:`
	<table class="table table-bordered bg-blanco text-center">
	  	<thead class="thead-dark">
	  		<tr>
	  			<th style="padding-bottom: 9px;">{{infomapa2}}:
	  			<button v-if="boolean" type="button" class="close across" data-dismiss="alert">&times;</button></th>
	  		</tr>
	  	</thead>
	  	<tbody>
	  		<tr>
	  			<td>{{infomapa}}</td>
	  		</tr>
	  		<tr>
	  			<td><iframe :src="linkmapa" class="mapag ancho40"></iframe></td>
	  		</tr>
	  	</tbody>
  	</table>
	`
})

Vue.component('table-data',{
	props:{
		matchsup:{
			type:Array
		},
		fechasaux:{
			type:Object
		},
		all:{
			type:Boolean
		}
	},
	template:`
	<div class="scroleado">
		<table id="tableanimation" class="text-center table table-hover">
			<thead class="thead-dark">
				<tr>
					<th class="sticky-top border border-0">Teams</th>
					<th class="sticky-top border border-0">Location</th>
					<th class="sticky-top border border-0">Times</th>
				</tr>
			</thead>
			<tbody v-if="!all" class="table-bordered scroleado">
				<tr v-for="matchz in matchsup">
					<template v-if="matchz.mes != null">
					<td colspan="3">{{matchz.mes}} {{matchz.dia}}</td>
					</template>
					<template v-else>
					<td>{{matchz.teamA}} <br>VS<br> {{matchz.teamB}}</td>
					<td>
						<a class="ocultarport d-block mostrar" @click="datosmap(matchz)" style="color: #007bff !important;text-decoration: underline;display:none" >{{matchz.location}}</a>

						<a @click="datosmap(matchz)" class="d-block ocultar" style="color: #007bff !important;text-decoration: underline;" data-toggle="modal" data-target="#modalt">{{matchz.location}}</a>
						  <!-- The Modal -->
						  <div class="modal fade" id="modalt">
						    <div class="modal-dialog modal-dialog-centered">
						      <mapasg id="mapasid" :linkmapa="matchz.link" :infomapa="matchz.directory" :infomapa2="matchz.location" ></mapasg>
						    </div>
						  </div>
						<button id="a1" class="btn btn-info mt-3" @click="iracomments(matchz)">Comments <i class="far fa-comments"></i></button>
					</td>
					<td>{{matchz.time}}</td>
					</template>
				</tr>
			</tbody>
			<tbody v-if="all">
				<template v-for="(mes,keymes) in fechasaux">
					<template v-for="(dia,key) in mes">
						<tr><td class="mt-3" colspan="3">{{keymes}} {{key}}</td></tr>
						<tr v-for="matchz in dia">
							<td>{{matchz.teamA}} <br>VS<br> {{matchz.teamB}}</td>
							<td class="d-flex flex-column">
								<a class="ocultarport mostrar d-none" @click="datosmap(matchz)" style="color: #007bff !important;text-decoration: underline;" >{{matchz.location}}</a>

								<a class="ocultar" style="color: #007bff !important;text-decoration: underline;" data-toggle="modal" data-target="#modalt">{{matchz.location}}</a>
								  <!-- The Modal -->
								  <div class="modal fade" id="modalt">
								    <div class="modal-dialog modal-dialog-centered">
								      <mapasg id="mapasid" :linkmapa="matchz.link" :infomapa="matchz.directory" :infomapa2="matchz.location" ></mapasg>
								    </div>
								  </div>
								<button id="a1" class="btn btn-info mt-3" @click="iracomments(matchz)"> Comments <i class="far fa-comments"></i></button>
							</td>
							<td>{{matchz.time}}</td>
						</tr>
					</template>
				</template>
			</tbody>
		</table>
		</div>`,
	methods:{
		iracomments(json){
			this.$emit('change-commet',json)
		},
		datosmap(json){
			this.$emit('changemap',json)
		}
	}
})

Vue.component('tarjeta-jugador',{
	props:{
		datosp:{
			type:Array
		},
		index:{
			type:Number
		}
	},
	template:`
	<div class="card m-3">
		<div class="card-header d-flex justify-content-between">
			<h3 v-if="!datosp[index].isteam" class="card-title">{{datosp[index].player}} ({{datosp[index].team}})</h3>
			<h3 v-if="datosp[index].isteam" class="card-title">{{datosp[index].team}}</h3>
			<div @click="borrar" style="width:40px;"><img src="img/delete.png"></div>
		</div>
		<div class="card-body">
			<h4 class="card-title">Next Match: {{datosp[index].teamA}} VS {{datosp[index].teamB}}</h4>
			<ul class="list-group list-group-flush">
		    <li class="list-group-item">
		    Place:
		    <a style="color: #007bff !important;text-decoration: underline;" data-toggle="modal" data-target="#modalt">{{matchz.location}}</a>
			  <!-- The Modal -->
			  <div class="modal fade" id="modalt">
			    <div class="modal-dialog modal-dialog-centered">
			      <mapasg :linkmapa="datosp[index].link" :infomapa="datosp[index].directory" :infomapa2="datosp[index].location" ></mapasg>
			    </div>
			  </div>
		    </li>

		    <li class="list-group-item">Day: {{datosp[index].fecha}}</li>
		    <li class="list-group-item">Time: {{datosp[index].time}}</li>
		  </ul>
		</div>
	</div>
	`,
	methods:{
		enviardatosmapas(){
			this.$emit('changemap',this.datosp[this.index].link,this.datosp[this.index].directory,this.datosp[this.index].location)
		},
		borrar(){
			this.$emit('borrar-tarjeta',this.index,this.datosp[this.index].id)
		}
	}
})

Vue.component('tarjeta-user',{
	props:{
		usuario:{
			type:Object
		},
		isrotate:{
			type:Boolean
		}
	},
	template:`
	<div class="card mt-3">
		<div v-if="usuario == null" class="card">
	  		<div class="card-body">
			  	<img id="logo-user" src="img/img.png" class="card-img-top img-thumbnail" alt="user-default">
			    <button class="btn btn-primary btn-block mt-2" @click="login">Login</button>
	 		</div>
		</div>
		<div v-if="usuario != null">
			<div class="card-header">
				<button @click="scrolltodown" data-toggle="collapse" data-target="#userconfig" class="btn btn-outline-success btn-block">User Profile Settings <i class="fas fa-cog"></i> </button>	
			</div>	
  		<div id="userconfig" class="collapse m-3">
				<div class="card-body" v-if="!isrotate">
					<img :src="usuario.photoURL" class="card-img-top img-thumbnail" alt="Card image">
					<div class="text-center mt-2">
						<p class="card-text">Name: {{usuario.displayName}}</p>
						<p class="card-text">Email: {{usuario.email}}</p>
					</div>
				</div>
				<div class="row no-gutters" v-if="isrotate">
					<div class="col-sm-5">
					  <img :src="usuario.photoURL" class="card-img img-thumbnail" alt="Card image">
					</div>
					<div class="col-sm-7">
					  <div class="textograde card-body">
							<p class="card-text">Name: {{usuario.displayName}}</p>
							<p class="card-text">Email: {{usuario.email}}</p>
					  </div>
					</div>
				</div>
			  <div class="row d-flex justify-content-between mt-3">
					<button @click="logout" class="botonl btn btn-primary btn-block ml-3">Logout</button>
			  </div>
	  	</div>
		</div>
	</div>
	`,
	methods:{
		login(){
			this.$emit('userlogin')
		},
		logout(){
			this.$emit('userlogout')
		},
		scrolltodown(){
			setTimeout(e=> window.scrollBy(0, 600), 300);
		}
	}
})

const app = new Vue({
	el:'#app',
	data:{
		selecttabV:'Home',
		mes:'All',
		dia:'',
		datosarratys:[],
		player:'',
		textocommet:'',
		onecallfunction:true,
		mapalink:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190255.33858302396!2d-87.87204658078659!3d41.833903666429514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20Illinois%2C%20EE.%20UU.!5e0!3m2!1ses-419!2sar!4v1568589433667!5m2!1ses-419!2sar',
		mapainfo:'',
		mapalocation:'click any location in the tables',
		datosuser:null,
		isrotate:false,
		linkimg:'img/fondo.png',
		matchcommentdata:{},
		commentmatch:'',
		arraycomments:[],
		fetchokey:false,
		teamnow:'',
		screanready:false
	},
	methods: {
		selectVue(id){
			this.selecttabV = id
		},
		buscarPlayerOTeam(){
			let aux = buscarEnEquipos(this.player)
			if (aux!= 'error') {
				actualizarTarjetaUsuarios(aux)
				this.player = ''
			}else if(this.player == ''){
				alert("Write the Numbre or Team")
			}else{
				alert("The player is not registered")
			}
			
		},
		logingoogle(){
			firebase.auth().signInWithRedirect(provider)
		},
		logoutgoogle(){
			firebase.auth().signOut()
		},
		enviado(){
			if (this.datosuser != null){
				agregarComentarios(this.textocommet,this.datosuser.displayName)
			}else if (this.datosuser == null){
				agregarComentarios(this.textocommet,null)
			}
			alert("gracias por comentar")
		},
		scrolltodown(){
			setTimeout(e=> window.scrollBy(0, 450), 250);
		},
		chageinfomap(json){
			console.log("nice")
			this.mapalink = json.link
			this.mapainfo = json.directory
			this.mapalocation = json.location
		},
		addnick(nick){
			this.datosuser.nick = nick
			actualizarNickUser(this.datosuser.displayName, nick)
		},
		animation(){
			document.querySelector('#tableanimation').classList.add('animationtable')
			setTimeout(e=> document.querySelector('#tableanimation').classList.remove('animationtable'), 1000);
		},
		eliminartarjeta(index,id){
			this.datosarratys.splice(index,1)
			borrarTarjetaUsuarios(id)
		},
		tocommet(match){
			this.matchcommentdata = match
			traerComentarios(match.id)
			this.selecttabV = 'commets'
		},
		comentar(){
			let name = this.datosuser.displayName
			commentsMatch(this.commentmatch,name,this.datosuser.photoURL,this.matchcommentdata.id)
			this.commentmatch = ''
			setTimeout(e=> window.scrollBy(0, 100), 300);
		},
		filtroteam(event){

			// let aux = this.teamnow
			// let spinername = document.querySelectorAll('.spiner')
			// let bool= false
			// spinername.forEach(e=>(e.attributes.name.value == aux)?bool=true:null)
			// if (this.teamnow == event.target.id && bool){
			// 	this.teamnow = ''
			// }else{
			// 	console.log(event.target.id)
			// 	spinername.forEach(e=>(e.attributes.name.value == event.target.id)?e.classList.remove('d-none'):e.classList.add('d-none'))
			// 	this.teamnow = event.target.id
			// }	

			let aux = this.teamnow
			let teamClick = event.target.id
			let id = "#"+teamClick
			console.log(teamClick)
				console.log(id)
				// console.log(document.querySelector(id))
			if (aux == teamClick){
				this.teamnow = ''
				// console.log(teamClick)
				// console.log(id)
				// console.log(document.querySelector(id))
				document.querySelector('#'+teamClick).style.opacity = 0.3;
				document.querySelector('#'+teamClick).style.color = '#28a745';
				document.querySelector('#'+teamClick).style.background = 'white';
			}else if(this.teamnow == '' ||  aux!= teamClick){
				// console.log(aux)
				// console.log(event.target.id)
				aux != "" ?document.querySelector(aux).style.opacity = 0.3:null
				document.querySelector('#'+teamClick).style.color = ''
				document.querySelector('#'+teamClick).style.background = '';
				document.querySelector('#'+teamClick).style.opacity = 1;
				this.teamnow = teamClick
				window.scrollTo(0, 230)
				this.animation()
			}	
		}
	},
	computed:{
		dias(){
			this.dia = diasPorMes(this.mes)[0]
			return diasPorMes(this.mes)
		},
		rotationscreen(){
			return this.isrotate
		},
		obtenerFechas(){
				return (JSON.parse(localStorage.getItem('fechas')) || fechas)
			
		},
		// obtenerParticipantes(){
		// 	return (JSON.parse(localStorage.getItem('participantes')) || participantes)
		// },
		obtenerMeses(){
			if (this.mes != '') {
				return returnmeses()
			}
		},
		userimg(){
			if (this.datosuser == null) {
				return 'img/img.png'
			}else{
				return this.datosuser.photoURL
			}	
		}, 
		daynow(){
			return eventToDay(false,toDay)
		},
		monthnow(){
			return eventToDay(true,toDay)
		},
		teamdate(){
			// let aux = buscarDatosPorFecha(null,null,this.teamnow,this.mes)
			// console.log(aux)
			document.querySelector('#mapasid').offsetHeight = document.querySelector('#tableanimation').offsetHeight
			return buscarDatosPorFecha(null,null,this.teamnow,this.mes)
		}
	}
})

