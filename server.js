require('dotenv').config()

const express = require('express')


const app = express()
const port = 3000

const route = require('./router');


app.use("/", route)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


