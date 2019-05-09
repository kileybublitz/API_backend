import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get('/', (request, response) => {
response.json({info: 'Test'})
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})