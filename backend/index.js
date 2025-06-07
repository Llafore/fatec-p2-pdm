require('dotenv').config()
const axios = require('axios')
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

const openWeatherClient = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

app.get('/search', async (req, res) => {
    const city = req.query.query
    if(!city){
        return res.status(400).json({ erro: 'Parâmetro "query" é obrigatório.' });
    }
    try{
            const result = await openWeatherClient.get('forecast', {
            params: {
                q: city,
                appid: process.env.OPENWEATHER_KEY,
                units: 'metric',
                lang: 'pt_br'
            }
        })
        res.json(result.data)

    } catch (error) {
        if(error.response){
            const { status, data } = error.response
            res.status(status).json({ erro: data.message })
        } else {
            res.status(500).json({ erro: 'Erro ao acessar a API do OpenWeatherMap.'})
        }
    }

})

const port = 3000
app.listen(port, () => console.log(`Back no ar, porta ${port}.`))