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

function convertHourToMinutes(time) {
    const [hour, minutes] = time.split(':')
    return Number((hour * 60) + minutes)
}

module.exports = { subjects, weekDays, getSubject, convertHourToMinutes }