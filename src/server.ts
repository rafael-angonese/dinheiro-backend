import express from 'express'
import 'dotenv'

const app = express()

app.listen(process.env.PORT || 3333, () => {
    console.log('Server listening on port: ' + process.env.PORT)
  })