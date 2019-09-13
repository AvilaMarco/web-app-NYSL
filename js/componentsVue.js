Vue.component('navs-tabs',{
	template:`
	<div @click="mostrarWebs" class="fondo fixed-bottom d-flex">
		<div class="border border-dark botoncito flex-fill text-center" :class="{activeTab: selecttab == tab}" v-for="(tab,index) in tabsnav" @click="selecttab=tab">
			<i :class="iconos[index]"></i><br>{{tab}}
		</div>
	</div>`,
	data(){
		return{
			tabsnav :['fechas','home','perfil'],
			selecttab : 'home',
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
	<div class="table-responsive text-center">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Teams</th>
					<th>Location</th>
					<th>Times</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{matcha.teamA}} <br>VS<br> {{matcha.teamB}}</td>
					<td><a href="#" @click="cambiarmapaa">{{matcha.location}}</a></td>
					<td>{{matcha.time}}</td>
				</tr>
				<tr>
					<td>{{matchb.teamA}} <br>VS <br>{{matchb.teamB}}</td>
					<td><a href="#" @click="cambiarmapab">{{matchb.location}}</a></td>
					<td>{{matchb.time}}</td>
				</tr>
			</tbody>
		</table>
		<h4>{{lugaractualmaps}}: <br>{{directorymaps}}</h4>
		<iframe :src="cargamap" class="border border-dark"></iframe>
	</div>`,
	data(){
		return{cargamap:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.654246110987!2d-87.6312390845582!3d41.90029237922041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd34e07f6bac3%3A0x68a82e5d59952c86!2s24%20W%20Walton%20St%2C%20Chicago%2C%20IL%2060610%2C%20EE.%20UU.!5e0!3m2!1ses-419!2sar!4v1568147863099!5m2!1ses-419!2sar',
		lugaractualmaps:'AJ Katzenmaier Elementary',directorymaps:'24 W. Walton St., Chicago, IL 60610'}
	},
	methods:{
		cambiarmapaa(){
			this.cargamap = this.matcha.link;
			this.lugaractualmaps = this.matcha.location;
			this.directorymaps = this.matcha.directory
		},
		cambiarmapab(){
			this.cargamap = this.matchb.link;
			this.lugaractualmaps = this.matchb.location;
			this.directorymaps = this.matchb.directory
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
	<div class="card">
		<div class="card-header">
			<h3 v-if="!datosp[index].isteam" class="card-title">{{datosp[index].player}} ({{datosp[index].team}})</h3>
			<h3 v-if="datosp[index].isteam" class="card-title">{{datosp[index].team}}</h3>
		</div>
		<div class="card-body">
			<h4 class="card-title">Proximo Partido: {{datosp[index].teamA}} VS {{datosp[index].teamB}}</h4>
			<ul class="list-group list-group-flush">
		    <li class="list-group-item">Lugar: {{datosp[index].location}}</li>
		    <li class="list-group-item">Fecha: {{datosp[index].fecha}}</li>
		    <li class="list-group-item">Hora: {{datosp[index].time}}</li>
		  </ul>
		</div>
	</div>
	`
})

Vue.component('cabecera-general',{
	template:`
	<header>
				<img class="mw-100 cabecera" src="img/fondo.png" alt="fondo-header">
				<img class="w-25 logo" src="img/nysl_logo.png" alt="logo-header">
	</header>`
})

const app = new Vue({
	el:'#app',
	data:{
		selecttabV:'home',
		fechas:fechas,
		meses:meses(),
		mes:primerMes,
		dia:'',
		datos:{},
		datosarratys:[],
		player:'',
		limitetarjetas:[],
		contador:0,
		textocommet:''
	},
	methods:{
		selectVue(id){
			this.selecttabV = id
		},
		buscarPlayerOTeam(){
			if (this.player != '') 
			{
				let aux = buscarEnEquipos(this.player)
				aux!= 'error' ? this.datosarratys.push(aux):alert("El jugador/equipo no esta registrado")
				this.contador++
				this.limitetarjetas.push(this.contador);
				
			}else{
				alert("Falta Completar el Campo")
			}
		},
		enviado(){
			if(this.textocommet!=''){
				alert("mensaje enviado")
			}else{
				alert("Falta Completar el campo")
			}
		}
	},
	computed:{
		dias(){
			this.dia = diasPorMes(this.mes)[0]
			return diasPorMes(this.mes)
		}
	}
})

