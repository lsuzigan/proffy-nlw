const addTime = document.querySelector('#add-time')
addTime.onclick = e => {
        const fieldContainerParent = document.querySelector('#schedule-items')
        const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)
        const fields = newFieldContainer.querySelectorAll('input')
        
        fields.forEach(function(field) {
                field.value = ""
            })

        // Another option to clear the fields values
        // for (field in fields) {
        //     fields[field] = ''
        // }

        fieldContainerParent.appendChild(newFieldContainer)
}