const express = require('express')
const router = express.Router()
const path = require('path')
const { nftContentDeliver } = require('./api/nftContent');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

router.get('/getNFTContent', nftContentDeliver)

module.exports = router;