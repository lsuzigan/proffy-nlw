const database = require('./db')
const creatProffy = require('./createProffy')

database.then( async (db) => {
    proffyValue = {
        name: "Lucas Suzigan",
        avatar: "https://avatars2.githubusercontent.com/u/50274831?s=460&u=129e6605b1685696bcd4423bcc82b011789f0041&v=4",
        whatsapp: "11985684035",
        bio: "Mestre na poderosíssima história da segunda guerra mundial. Minhas aulas são uma verdadeira replica da guerra, não se assuste."
    }

    classValue = {
        subject: "7",
        cost: "25"
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: [1200],
            time_to: [1440]
        },
        {
            weekday: 3,
            time_from: [1200],
            time_to: [1440]
        }
    ]

    // await creatProffy(db, { proffyValue, classValue, classScheduleValues })

    const selectedProffys = await db.all('SELECT * FROM proffys;')
    // console.log(selectedProffys)

    const selectedClassesAndProffys = await db.all(`
        SELECT * FROM proffys p 
        INNER JOIN classes c ON p.id = c.proffy_id 
        WHERE c.proffy_id = 1;
        `)
    // console.log(selectedClassesAndProffys)

    // select schedule class where wanted time is equal or greater than the time_from, and lower than time_to
    const selectClassesSchedules = await db.all(`
        SELECT cs.*
        FROM class_schedule cs
        WHERE cs.class_id = 1
        AND cs.weekday = 3
        AND cs.time_from <= 1300
        AND cs.time_to > 1300
    `)
    // console.log(selectClassesSchedules)
})