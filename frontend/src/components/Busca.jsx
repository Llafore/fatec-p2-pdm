import { useEffect, useState } from 'react'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import apiClient from "../utils/openweathermapClient"

const Busca = ({ onBuscaRealizada, onLoading, resultados }) => {
	const [termoDeBusca, setTermoDeBusca] = useState("São Paulo")

	useEffect(() => {
		const buscar = async () => {
			onLoading(true)
			try {
				const response = await apiClient.get("/search", {
					params: {
						query: termoDeBusca
					}
				})
				onBuscaRealizada(response.data)
			} catch (error) {
				onBuscaRealizada(error.response.data)
			} finally {
				onLoading(false)
			}
		}

		if (termoDeBusca && !resultados) {
			buscar()
		}	else {
			onLoading(true)
			const timeoutID = setTimeout(() => {
				if(termoDeBusca.length >= 3) {
					buscar()
				}
			}, 2000)

			return () => {
				clearTimeout(timeoutID)
				onLoading(false)
			}
		}
	}, [termoDeBusca])

  return (
		<div className='w-12 flex flex-column align-items-center justify-content-center'>
			
			<div className='w-12 flex justify-content-center'>
				<IconField iconPosition='left' className=' flex justify-content-center'>
					<InputIcon className='pi pi-search'/>
					<InputText 
						className=''
						placeholder='Buscar...'
						onChange={(event) => setTermoDeBusca(event.target.value)}
						value={termoDeBusca}/>
				</IconField>
			</div>
		</div>
  )
}

export default Busca