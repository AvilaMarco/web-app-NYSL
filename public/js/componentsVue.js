Vue.component('navs-tabs',{
	template:`
	<div @click="mostrarWebs" class="fondo fixed-bottom d-flex menu">
		<div class="padingelement border border-dark botoncito flex-fill text-center" :class="{activeTab: selecttab == tab}" v-for="(tab,index) in tabsnav" @click="selecttab=tab">
			<i :class="iconos[index]"></i><br>{{tab}}
		</div>
	</div>`,
	data(){
		return{
			tabsnav :['Schedule','Home','Profile'],
			selecttab : 'Home',
			iconos:['far fa-calendar-alt','fas fa-home','far fa-user']
		}
	},
	methods:{
		mostrarWebs(){
			this.$emit('show',this.selecttab)
		}
	}
})

Vue.component('table-data',{
	props:{
		matcha:{
			type:Object
		},
		matchb:{
			type:Object
		},
		fechasaux:{
			type:Object
		},
		all:{
			type:Boolean
		}
	},
	template:`
	<div class="text-center">
		<table id="tableanimation" class="table table-hover table-bordered">
			<thead class="thead-dark">
				<tr>
					<th class="sticky-top">Teams</th>
					<th class="sticky-top">Location</th>
					<th class="sticky-top">Times</th>
				</tr>
			</thead>
			<tbody v-if="!all">
				<tr>
					<td>{{matcha.teamA}} <br>VS<br> {{matcha.teamB}}</td>
					<td><a id="a" href="#mapasid" @click="enviardatosmapas">{{matcha.location}}</a></td>
					<td>{{matcha.time}}</td>
				</tr>
				<tr v-if="matchb != null">
					<td>{{matchb.teamA}} <br>VS <br>{{matchb.teamB}}</td>
					<td><a id="b" href="#mapasid" @click="enviardatosmapas">{{matchb.location}}</a></td>
					<td>{{matchb.time}}</td>
				</tr>
			</tbody>
			<tbody v-if="all">
				<template v-for="(mes,key) in fechasaux">
					<tr><td class="mt-3" colspan="3">{{key}}</td></tr>
					<template v-for="(dia,key) in mes">
						<tr><td class="mt-3" colspan="3">Day: {{key}}</td></tr>
						<tr>
							<td>{{dia.matchA.teamA}} <br>VS<br> {{dia.matchA.teamB}}</td>
							<td>
								<a id="c" href="#mapasid" @click="enviardatosmapas">{{dia.matchA.location}}</a>
								<p class="d-none">{{dia.matchA.link}}</p>
								<p class="d-none">{{dia.matchA.directory}}</p>
								<p class="d-none">{{dia.matchA.location}}</p>
							</td>
							<td>{{dia.matchA.time}}</td>
						</tr>
						<tr v-if="dia.matchB!=null">
							<td>{{dia.matchB.teamA}} <br>VS <br>{{dia.matchB.teamB}}</td>
							<td>
								<a id="c" href="#mapasid" @click="enviardatosmapas">{{dia.matchB.location}}</a>
								<p class="d-none">{{dia.matchB.link}}</p>
								<p class="d-none">{{dia.matchB.directory}}</p>
								<p class="d-none">{{dia.matchB.location}}</p>
							</td>
							<td>{{dia.matchB.time}}</td>
						</tr>
					</template>
				</template>
			</tbody>
		</table>
	</div>`,
	methods:{
		enviardatosmapas(id){
			switch(id.target.id){
				case 'a':
					this.$emit('changemap',this.matcha.link,this.matcha.directory,this.matcha.location)
					break;
				case 'b':
					this.$emit('changemap',this.matchb.link,this.matchb.directory,this.matchb.location)
					break;
				case 'c':
					let link = id.target.nextElementSibling.innerText
					let directory = id.target.nextElementSibling.nextElementSibling.innerText
					let location = id.target.nextElementSibling.nextElementSibling.nextElementSibling.innerText
					this.$emit('changemap',link,directory,location)
					break;
			}
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
		}
	},
	template:`
		<div class="card m-2">
			<div class="card-header">
				<p class="card-title"><strong>{{infomapa2}}</strong>: <br>{{infomapa}}</p>
			</div>
			<div class="card-body d-flex justify-content-center">
				<iframe :src="linkmapa" class="border border-dark"></iframe>
			</div>
		</div>
	`
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
		<div class="card-header">
			<h3 v-if="!datosp[index].isteam" class="card-title">{{datosp[index].player}} ({{datosp[index].team}})</h3>
			<h3 v-if="datosp[index].isteam" class="card-title">{{datosp[index].team}}</h3>
		</div>
		<div class="card-body">
			<h4 class="card-title">Next Match: {{datosp[index].teamA}} VS {{datosp[index].teamB}}</h4>
			<ul class="list-group list-group-flush">
		    <li class="list-group-item">Place: <br><a href="#mapasid" @click="enviardatosmapas">{{datosp[index].location}}</a></li>
		    <li class="list-group-item">Day: {{datosp[index].fecha}}</li>
		    <li class="list-group-item">Time: {{datosp[index].time}}</li>
		  </ul>
		</div>
	</div>
	`,
	methods:{
		enviardatosmapas(){
			this.$emit('changemap',this.datosp[this.index].link,this.datosp[this.index].directory,this.datosp[this.index].location)
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
					<p v-show="nick!=''" class="card-text">Nick: {{nick}}</p>
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
							<p v-show="nick!=''" class="card-text">Nick: {{nick}}</p>
							<p class="card-text">Email: {{usuario.email}}</p>
					  </div>
					</div>
	  			</div>

			  <div class="row d-flex justify-content-between mt-3">
						<button @click="logout" class="botonl btn btn-primary ml-3">Logout</button>
						<button v-if="nick == ''" @click="escribirnick" class="botonl btn btn-primary mr-3">Use Nick</button>
						<button v-if="nick != ''" @click="escribirnick" class="botonl btn btn-primary mr-3">Change Nick</button>
			  </div>

			  <div v-if="write" class="input-group mt-3">
				  <input id="inputtext" class="form-control" type="text" v-model="nickaux" placeholder="write your nick">
				  <input class="btn btn-info" type="button" @click="usenick" value="enter">
			  </div>

	  	</div>

		</div>
	</div>
	`,
	data(){
		return{
			nickaux:'',
			write:false,
			nick:'',
		}
	},
	methods:{
		login(){
			this.$emit('userlogin')
		},
		logout(){
			this.$emit('userlogout')
		},
		usenick(){
			this.$emit('usenick',this.nick)
			this.nick = this.nickaux
			this.write = false
		},
		escribirnick(){
			this.write=true
			setTimeout(e=> window.scrollTo(0, 400), 100);
		},
		scrolltodown(){
			setTimeout(e=> window.scrollTo(0, 600), 300);
		}
	}
})

const app = new Vue({
	el:'#app',
	data:{
		selecttabV:'Home',
		fechas:{},
		participantes:{},
		meses:meses(),
		mes:'',
		dia:'',
		datosarratys:[],
		player:'',
		limitetarjetas:[],
		contador:0,
		textocommet:'',
		onecallfunction:true,
		mapalink:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190255.33858302396!2d-87.87204658078659!3d41.833903666429514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20Illinois%2C%20EE.%20UU.!5e0!3m2!1ses-419!2sar!4v1568589433667!5m2!1ses-419!2sar',
		mapainfo:'',
		mapalocation:'click any location in the tables',
		datosuser:null,
		isrotate:false,
		linkimg:'img/fondo.png'
	},
	created: function () {
    cargardatosjson();
    console.log('a is: ' + this.app)
  	},
	methods:{
		selectVue(id){
			this.selecttabV = id
		},
		buscarPlayerOTeam(){
			let aux = buscarEnEquipos(this.player)
			aux!= 'error' ? this.datosarratys.push(aux):alert("El jugador no esta registrado")
			this.contador++
			this.limitetarjetas.push(this.contador);
		},
		logingoogle(){
			firebase.auth().signInWithRedirect(provider)
		},
		logoutgoogle(){
			firebase.auth().signOut()
		},
		enviado(){
			agregarComentarios(this.textocommet)
			alert("gracias por comentar")
		},
		scrolltodown(){
			if (this.onecallfunction) {
				this.onecallfunction = false
				if(this.isrotate){
					console.log(this.isrotate)
					setTimeout(e=> window.scrollTo(0, 900), 250);
				}else{
					setTimeout(e=> window.scrollTo(0, 400), 250);
				}
			}

		},
		chageinfomap(linkmap,infomap,locationmap){
			this.selecttabV = 'Schedule'
			this.mapalink = linkmap
			this.mapainfo = infomap
			this.mapalocation = locationmap
		},
		addnick(nick){
			this.datosuser.nick = nick
		},
		animation(){
			document.querySelector('#tableanimation').classList.add('animationtable')
			setTimeout(e=> document.querySelector('#tableanimation').classList.remove('animationtable'), 3100);
		}
	},
	computed:{
		dias(){
			this.dia = diasPorMes(this.mes)[0]
			return diasPorMes(this.mes)
		},
		rotationscreen(){
			return this.isrotate
		}
	}
})

