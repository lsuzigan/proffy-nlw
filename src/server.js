// Importing express
const express = require('express')
const server = express()

// Importing nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache:true
})

// Importing pages
const { pageLanding, pageStudy, pageTeach, saveClasses } = require('./pages')

server
    .use(express.urlencoded({ extended: true }))
    // Configure static files (css, imagens, scripts)
    .use(express.static('public'))
    // App routes
    .get('/', pageLanding)
    .get('/study', pageStudy)
    .get('/teach', pageTeach)
    .post('/save-classes', saveClasses)
    // Start server
    .listen(5000)