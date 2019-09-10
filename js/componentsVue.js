Vue.component('navs-tabs',{
	template:`
	<div @click="mostrarWebs">
		<span class="tabs" :class="{activeTab:selecttab == tab}" v-for="tab in tabsnav" @click="selecttab=tab">
			{{tab}}
		</span>
	</div>`,
	data(){
		return{
			tabsnav :['fechas','home','perfil'],
			selecttab : 'home'
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
	<div>
		<table>
			<thead>
				<tr>
					<th>Teams</th>
					<th>Location</th>
					<th>Times</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{matcha.teamA}} VS {{matcha.teamB}}</td>
					<td><a href="#" @click="cargamap = matcha.link">{{matcha.location}}</a></td>
					<td>{{matcha.time}}</td>
				</tr>
				<tr>
					<td>{{matchb.teamA}} VS {{matchb.teamB}}</td>
					<td><a href="#" @click="cargamap = matchb.link">{{matchb.location}}</a></td>
					<td>{{matchb.time}}</td>
				</tr>
			</tbody>
		</table>
		<iframe :src="cargamap"></iframe>
	</div>`,
	data(){
		return{cargamap:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.654246110987!2d-87.6312390845582!3d41.90029237922041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd34e07f6bac3%3A0x68a82e5d59952c86!2s24%20W%20Walton%20St%2C%20Chicago%2C%20IL%2060610%2C%20EE.%20UU.!5e0!3m2!1ses-419!2sar!4v1568147863099!5m2!1ses-419!2sar'}
	}
})

const app = new Vue({
	el:'#app',
	data:{
		selecttabV:'home',
		meses:meses(),
		mes:primerMes,
		dia:'',
		fechas:fechas,
		player:'',
		datos:{}
	},
	methods:{
		selectVue(id){
			this.selecttabV = id
		},
		buscarplayeroteam(){
			if (this.player != '') 
			{
				let aux = buscarenequipo(this.player)
				aux!= 'error' ? this.datos = aux:alert("el jugador no esta registrado")
				console.log(this.player)
			}else{
				alert("falta completar el campo")
			}
		}
	},
	computed:{
		dias(){
			this.dia = diasPorMes(this.mes)[0]
			return diasPorMes(this.mes)
		},
	}
})