import express from 'express'
import 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import routes from './routes'

const corsOptions = {
  origin: '*',
  credentials: true,
}

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(routes)

app.listen(process.env.PORT || 3333, () => {
  console.log('Server listening on port: ' + process.env.PORT)
})