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
						<td><a href="#" @click="cargamap = matchb.link">{{matcha.location}}</a></td>
						<td>{{matchb.time}}</td>
					</tr>
				</tbody>
			</table>
			<iframe src="https://www.google.com.ar/maps/place/2101+N+Fremont+St,+Chicago,+IL+60614,+EE.+UU./@41.9197808,-87.6535554,17z/data=!3m1!4b1!4m5!3m4!1s0x880fd3196fb41dc7:0x970be7f7d6336df5!8m2!3d41.9197768!4d-87.6513667"></iframe>
		</div>`,
		data(){
			return{
				cargamap:'matcha.link'
			}
		}
})

Vue.component('maps',{
	template:`
	<iframe src=""></iframe>

	`
})
const app = new Vue({
	el:'#app',
	data:{
		selecttabV:'home',
		meses:meses(),
		mes:primerMes,
		dia:'',
		fechas:fechas
	},
	methods:{
		selectVue(id){
			this.selecttabV = id
		}
	},
	computed:{
		dias(){
			this.dia = diasPorMes(this.mes)[0]
			return diasPorMes(this.mes)
		},
	}
})