function diasPorMes(mesaux) 
{
	let dias = []
	for(dia in fechas[mesaux])
	{
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
 let primerMes = meses()[0]

 function tarjetadeldia(equipo){
 	let aux = []
 	let corte = false
	for(mes in fechas){
		for(dias in fechas[mes]){
			for(partidos in fechas[mes][dias]){
				let aux2 = Object.values(fechas[mes][dias][partidos])
				for (var i = 0; i < 2; i++) {
					if (aux2[i]==equipo && !corte) 
					{
 						aux.push(fechas[mes][dias][partidos])
 						corte = true
 					}
 				}
 			}
 		}
	}
 return aux[0];
}

function buscarenequipo(jugadorT){
	let equipo = ''
	let corte = false
	for(equipos in participantes){
		let aux = Object.values(participantes[equipos])
		for (var i = 0; i < aux.length; i++) {
			if (aux[i]==jugadorT && !corte) 
			{
				equipo = equipos
				corte = true
			}
		}
	}
	if (equipo!='') 
		{
		return tarjetadeldia(equipo)	
	}else{
		return 'error'
	}
}