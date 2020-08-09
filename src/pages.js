const database = require('./database/db')
const { subjects, weekDays, getSubject, convertHourToMinutes } = require('./utils/format')

function pageLanding(req, res){
    return res.render('index.html')
}

async function pageStudy(req, res){
    const filters = req.query

    // Show page without proffys when doesn't have any filter
    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render('study.html', { filters, subjects, weekDays })
    }

    const timeToMinutes = convertHourToMinutes(filters.time)

    const query = (`
        SELECT * 
        FROM proffys p 
        INNER JOIN classes c ON p.id = c.proffy_id 
        WHERE EXISTS (
            SELECT cs.*
            FROM class_schedule cs
            WHERE cs.class_id = c.id
            AND cs.weekday = ${filters.weekday}
            AND cs.time_from <= ${timeToMinutes}
            AND cs.time_to > ${timeToMinutes}
        )
        AND c.subject = ${filters.subject};
    `)

    try {
        const db = await database
        const proffys = await db.all(query)
        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })
        return res.render('study.html', { proffys, subjects, filters, weekDays })
    } catch (error) {
        console.log(error)
    }
}

function pageTeach(req, res){
    return res.render('teach.html', { subjects, weekDays })
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHourToMinutes(req.body.time_from[index]),
            time_to: convertHourToMinutes(req.body.time_to[index])
        }
    })
    
    try {
        const db = await database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time" + req.body.time_from[0]

        return res.redirect('/study' + queryString)
    } catch (error) {
        console.log(error)
    }   
}

function pageSuccess(req, res) {
    return res.render('success.html')
}

module.exports = { pageLanding, pageStudy, pageTeach, saveClasses, pageSuccess }