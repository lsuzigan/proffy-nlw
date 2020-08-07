const proffys = [
    {
        name: "Lucas Suzigan",
        avatar: "https://avatars2.githubusercontent.com/u/50274831?s=460&u=129e6605b1685696bcd4423bcc82b011789f0041&v=4",
        whatsapp: "11985684035",
        bio: "Mestre na poderosíssima história da segunda guerra mundial. Minhas aulas são uma verdadeira replica da guerra, não se assuste.",
        subject: "História",
        cost: "25",
        weekday: [1,3,5],
        time_from: [1200],
        time_to: [1440]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
    "Inglês"
]

const weekDays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

// Change the number received from page and get the subject name
function getSubject(subjectNumber) {
    const position = +subjectNumber - 1 
    return subjects[position]
}

function pageLanding(req, res){
    return res.render('index.html')
}

function pageStudy(req, res){
    const filters = req.query
    return res.render('study.html', { proffys, filters, subjects, weekDays })
}

function pageTeach(req, res){
    const data = req.query
    const isNotEmpty = Object.keys(data).length > 0

    if(isNotEmpty) {
        data.subject = getSubject(data.subject)
        proffys.push(data)

        return res.redirect('/study')
    }

    return res.render('teach.html', { subjects, weekDays })
}

const express = require('express')
const server = express()

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache:true
})

server
    // Configure static files (css, imagens, scripts)
    .use(express.static('public'))
    // App routes
    .get('/', pageLanding)
    .get('/study', pageStudy)
    .get('/teach', pageTeach)
    // Start server
    .listen(5000)