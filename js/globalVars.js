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

 function buscarDatosPorFecha(equipo){
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
		if (equipos == jugadorT) 
		{
			return buscarDatosPorFecha(equipos)	
		}

		let aux = Object.values(participantes[equipos])

		for (var i = 0; i < aux.length; i++) 
		{
			if (aux[i]==jugadorT.toLowerCase()) 
			{
				return buscarDatosPorFecha(equipos)
			}
		}
	}
	return 'error'
}