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
 	app.equipo = equipo
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
 						fechas[mes][dias][partidos]['fecha'] = dias+' de '+mes
 						fechas[mes][dias][partidos]['team'] = equipo 
 						fechas[mes][dias][partidos]['isteam'] = true
 						if(jugadorT!=null){
 							fechas[mes][dias][partidos]['player'] = jugadorT
 							fechas[mes][dias][partidos]['isteam'] = false
 						}
 						return fechas[mes][dias][partidos]
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