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