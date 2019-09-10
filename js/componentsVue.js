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
		equipos:{
			type:Object
		},
		lugar:{
			type:Object
		},
		horario:{
			type:Array
		},
		dia:{
			type:String
		}
	},
	template:`
	<div>
			<h3>{{}}</h3>
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
						<td>{{equipos.a}} and {{equipos.b}}</td>
						<td>{{lugar.a}}</td>
						<td>{{horario[0]}} a.m</td>
					</tr>
					<tr>
						<td>{{equipos.c}} and {{equipos.d}}</td>
						<td>{{lugar.b}}</td>
						<td>{{horario[1]}} p.m</td>
					</tr>
				</tbody>
			</table>
		</div>`
})

const app = new Vue({
	el:'#app',
	data:{
		selecttabV:'home',
		locations:['AJ Katzenmaier','Greenbay','Howard A Yeager','Marjorie P Hart','North','South'],
		equipos:['U1','U2','U3','U4','U5','U6'],
		times:['9:30','1:00'],
		dias1:[1,8,15,22,29],
		dias2:[6,8,20,27],
		dia:'',
		mes:''
	},
	methods:{
		selectVue(id){
			this.selecttabV = id
		}
	}
})