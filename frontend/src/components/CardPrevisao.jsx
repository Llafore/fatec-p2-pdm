import React from 'react'
import striptags from 'striptags'
import { Card } from 'primereact/card';

const CardPrevisao = ({ previsoes }) => {
	const timezone = parseInt(striptags(previsoes.timezone.toString()));

	const formatarData = (data) => {
		if (typeof data === "string" || data instanceof String) {
			data = parseInt(striptags(data))
		}
		const dataHoraFormatada = new Date((data + timezone) * 1000).toLocaleString("pt-br", {timeZone: "UTC"})
		const dataFormatada = dataHoraFormatada.split(",")[0]
		const horaFormatada = dataHoraFormatada.split(",")[1]
		return {
			data: dataFormatada,
			hora: horaFormatada
		}
	}

	const capitalizar = (texto) => {
		return String(texto).charAt(0).toUpperCase() + String(texto).slice(1)
	}

  return (
		<div className='flex flex-wrap'>
			{previsoes.list.map((previsao) => (
				<div className="w-full md:w-4 lg:w-3 p-2" key={previsao.dt}>
					<Card className="flex flex-column align-items-center justify-content-center surface-300 w-full text-center">
						<div className='w-full flex justify-content-between'>
							<p className="m-0 font-bold">{formatarData(previsao.dt).data}</p>
							<p className="m-0">{formatarData(previsao.dt).hora}</p>
						</div>

						<div className='w-full flex flex-column justify-content-center align-items-center gap-2'>
							<img src={`https://openweathermap.org/img/wn/${previsao.icon}@4x.png`} alt={previsao.description} />
							<p className="m-0 pb-2">{capitalizar(striptags(previsao.description))}</p>

							<p className="m-0">
								<i className="pi pi-arrow-down pr-2" style={{ color: 'red' }}></i>	
								Mínima: {striptags(previsao.temp_min.toString())} °C
							</p>

							<p className="m-0">
								<i className="pi pi-arrow-up pr-2" style={{ color: '#8888ff'}}></i>	
								Máxima: {striptags(previsao.temp_max.toString())} °C
							</p>

							<p className="m-0 pt-2">Umidade do ar: {striptags(previsao.humidity.toString())}%</p>
						</div>
					</Card>
				</div>
					
				))
			}
		</div>
  )
}

export default CardPrevisao