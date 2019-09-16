Vue.component('navs-tabs',{
	template:`
	<div @click="mostrarWebs" class="fondo fixed-bottom d-flex">
		<div class="border border-dark botoncito flex-fill text-center" :class="{activeTab: selecttab == tab}" v-for="(tab,index) in tabsnav" @click="selecttab=tab">
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
		}
	},
	template:`
	<div class="text-center">
		<table class="table table-hover table-bordered">
			<thead class="thead-dark">
				<tr>
					<th>Teams</th>
					<th>Location</th>
					<th>Times</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{matcha.teamA}} <br>VS<br> {{matcha.teamB}}</td>
					<td><a id="a" href="#mapasid" @click="enviardatosmapas">{{matcha.location}}</a></td>
					<td>{{matcha.time}}</td>
				</tr>
				<tr>
					<td>{{matchb.teamA}} <br>VS <br>{{matchb.teamB}}</td>
					<td><a id="b" href="#mapasid" @click="enviardatosmapas">{{matchb.location}}</a></td>
					<td>{{matchb.time}}</td>
				</tr>
			</tbody>
		</table>
	</div>`,
	methods:{
		enviardatosmapas(id){
			if (id.target.id=='a') {
			this.$emit('changemap',this.matcha.link,this.matcha.directory,this.matcha.location)
			}else if(id.target.id=='b'){
				this.$emit('changemap',this.matchb.link,this.matchb.directory,this.matchb.location)
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

const app = new Vue({
	el:'#app',
	data:{
		selecttabV:'Home',
		fechas:fechas,
		meses:meses(),
		mes:primerMes,
		dia:'',
		datosarratys:[],
		player:'',
		limitetarjetas:[],
		contador:0,
		textocommet:'',
		onecallfunction:true,
		mapalink:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190255.33858302396!2d-87.87204658078659!3d41.833903666429514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20Illinois%2C%20EE.%20UU.!5e0!3m2!1ses-419!2sar!4v1568589433667!5m2!1ses-419!2sar',
		mapainfo:'address',
		mapalocation:'choose an'
	},
	methods:{
		selectVue(id){
			this.selecttabV = id
		},
		buscarPlayerOTeam(){
			let aux = buscarEnEquipos(this.player)
			aux!= 'error' ? this.datosarratys.push(aux):alert("El jugador/equipo no esta registrado")
			this.contador++
			this.limitetarjetas.push(this.contador);
		},
		enviado(){
			firebase.auth().signInWithRedirect(provider);
			// agregarComentarios(this.textocommet)
			// alert("gracias por comentar")
		},
		scrolltodown(){
			if (this.onecallfunction) {
				this.onecallfunction = false
				setTimeout(e=> window.scrollTo(0, 400), 200);
			}
		},
		chageinfomap(linkmap,infomap,locationmap){
			this.selecttabV = 'Schedule'
			this.mapalink = linkmap
			this.mapainfo = infomap
			this.mapalocation = locationmap
		}
	},
	computed:{
		dias(){
			this.dia = diasPorMes(this.mes)[0]
			return diasPorMes(this.mes)
		}
	}
})

