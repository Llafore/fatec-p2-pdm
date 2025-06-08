import Busca from "./components/Busca"
import { useState } from 'react'
import striptags from 'striptags'

const App = () => {
	const [resultados, setResultados] = useState(null)
	const [loading, setLoading] = useState(false)

  const onBuscaRealizada = (resposta) => {
    setResultados(resposta)
  }

  const onLoading = (situacao) => {
    setLoading(situacao)
  }



  return (
    <div className="w-12 flex flex-column align-items-center px-8">
      <h1 className="m-0 p-2">Previsão do tempo</h1>

      <p className="m-0 pb-3">
        Pesquise a cidade para obter uma previsão do tempo para os próximos 5 dias
      </p>

      <Busca onBuscaRealizada={onBuscaRealizada} onLoading={onLoading} resultados={resultados}/>
      <div className="h-2rem flex align-items-center justify-content-center">
        {loading && 
          <div className='fadein animation-duration-100 animation-iteration-1 flex align-items-center justify-content-center'>
            <p className="m-0 p-0">
              Buscando
            </p>
            <i className="pi pi-spin pi-spinner px-2" style={{ color: 'var(--primary-color)' }}></i>
          </div>
        }
      </div>

      <div className={`flex flex-column transition-all transition-duration-500 ${loading ? "opacity-20" : "opacity-100"}`}>
        {resultados && !resultados.erro ? resultados.map((previsao) => (
          <div className="pb-4 flex flex-column" key={previsao.dt}>
            <p className="m-0">{new Date(previsao.dt * 1000).toLocaleString("pt-br")}</p>
            <p className="m-0">{striptags(previsao.weather[0].description)}</p>
            <p className="m-0">Mínima: {striptags(previsao.main.temp_min.toString())}</p>
            <p className="m-0">Máxima: {striptags(previsao.main.temp_max.toString())}</p>
            <p className="m-0">Umidade: {striptags(previsao.main.humidity.toString())}</p>
          </div>
        )): ""}

        {resultados && resultados.erro ? 
          <div className="flex flex-wrap align-items-center justify-content-center">
            <i className="pi pi-exclamation-circle px-2 mt-1" style={{ color: 'red', fontSize: '1.25rem' }}></i>
            <p className="m-0">
              Erro ao consultar cidade: {striptags(resultados.erro)}
            </p>
          </div>
        : ""}
      </div>

    </div>
  )
}

export default App
