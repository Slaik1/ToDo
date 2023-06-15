window.onload = () => {


const DOMContent = {
    wrapper : document.querySelector('#wrapper'),
    addButton : document.querySelector('#addButton'),
    input : document.querySelector('#input'),
    tasks : document.querySelector('.container__tasks'),
    alert : document.querySelector('.container__alert')
}

///////////////// Helpers
function alertFormError(error,visibility = 'visible'){
    DOMContent.alert.textContent = error
    DOMContent.alert.style.visibility = visibility
}

function fillDOM(tasksList) {
    for (const taskItem of tasksList) {
        insertToDo(taskItem)
    }
}

function insertToDo(taskItem) {
    const li = document.createElement('li')
    const title = document.createElement('SPAN')
    const deleteBtn = document.createElement('img')

    title.innerText = taskItem.title

    deleteBtn.src='./icons/delete.svg'

    if(taskItem.checked === true){
        title.classList.add('done')
    } 

    title.onclick = async () => {
        title.classList.toggle('done')

        await API.tasks.change(
            taskItem.id,
            title.classList.value === 'done'
        )
    }

    deleteBtn.onclick = async() => {
        await API.tasks.delete(taskItem.id)
        li.remove()
    }

    li.appendChild(title)
    li.appendChild(deleteBtn)
    DOMContent.tasks.appendChild(li)
}

DOMContent.addButton.onclick = async () => { 
    if(DOMContent.input.value === '') {
        return alertFormError('Text field is empty')
    }

    try {
        const taskItem = {
            title: DOMContent.input.value,
            checked: false,
            timestamp: Date.now(),
        }

        const newTodo = await API.tasks.add(taskItem)

        insertToDo(newTodo)

        DOMContent.input.value=''
    } catch (error) {
        alertFormError(error)
    }finally{
        alertFormError('','hidden')
    }    
}

async function loadContent() {
    try {
        const tasksList = await API.tasks.getList()

        console.log("tasksList",tasksList);

        fillDOM(tasksList)
    } catch (error) {
        alertFormError(error)
    }finally{
        DOMContent.wrapper.classList.add('loaded')
    }
}

loadContent()

}