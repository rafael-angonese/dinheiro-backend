import express from 'express'
import 'dotenv'

import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 3333, () => {
    console.log('Server listening on port: ' + process.env.PORT)
})