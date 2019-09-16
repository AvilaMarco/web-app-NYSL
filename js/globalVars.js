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

 let primerMes = meses()[0]

 function buscarDatosPorFecha(equipo,jugadorT){
 	// app.equipo = equipo
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