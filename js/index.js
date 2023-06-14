const DOMAINURL = 'https://6484e2a6ee799e3216271c29.mockapi.io/api/v1'
let userId

const endpoints={
    users:'/users',
    todo:'/todo'
}

const DOMContent = {
    wrapper : document.querySelector('#wrapper'),
    addButton : document.querySelector('#addButton'),
    input : document.querySelector('#input'),
    tasks : document.querySelector('.container__tasks'),
    alert : document.querySelector('.container__alert')
}

DOMContent.addButton.onclick = async () => {
    const timestamp = Date.now()
    if(DOMContent.input.value === '') {
        alertFormError('Text field is empty')
    }else{
        const taskItem = {
            title: DOMContent.input.value,
            checked: false,
            timestamp: timestamp,
        }
        try {
            await addToDoToBase(taskItem)
            insertToDo(await takeTaskFromDate(timestamp))
        } catch (error) {
            alertFormError(error)
        }finally{
            DOMContent.input.value=''
            alertFormError('','hidden')
        }
    }
}

function alertFormError(error,visibility = 'visible'){
    DOMContent.alert.textContent = error
    DOMContent.alert.style.visibility = visibility
}

async function takeTaskFromDate(timestamp) {
    try {
        const url = new URL(DOMAINURL + endpoints.users + '/' + userId + endpoints.todo)
        url.searchParams.append('timestamp',timestamp)
        const response = await fetch(url)
        const taskItem = await response.json()
        return taskItem[0]
    } catch (error) {
        alertFormError(error)
    }
}

async function loadContent() {
    try {
        if (!localStorage.getItem('token')) {
            await createNewUser()
        }
        await getIdFromToken(localStorage.getItem('token'));
        const tasksList = await getTasksList()
        fillDOM(tasksList)
    } catch (error) {
        alertFormError(error)
    }finally{
        DOMContent.wrapper.classList.add('loaded')
    }
}

async function createNewUser() {
    try {
        const token = {
            token : Date.now()
        }
        const response = await fetch(DOMAINURL + endpoints.users,{
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(token)
        })
        localStorage.setItem('token', token.token);
    } catch (error) {
        alertFormError(error)
    }
}

async function getIdFromToken(token) {
    try{
        const url = new URL(DOMAINURL + endpoints.users)
        url.searchParams.append('token',token)
        const response = await fetch(url)
        const data = await response.json()
        userId = data[0].id
        console.log(data[0]);
    }
    catch(error){
        alertFormError(error)
    }
}

async function getTasksList() {
    try {
        const response = await fetch(DOMAINURL + endpoints.users + '/' + userId + endpoints.todo)
        tasksList = await response.json()
        return tasksList
    } catch (error) {
        alertFormError(error)
    }
}

async function addToDoToBase(newTask) {
    try {
        await fetch(DOMAINURL + endpoints.users + '/' + userId + endpoints.todo,{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(newTask)
        })
    } catch (error) {
        alertFormError(error)
    }
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

    li.appendChild(title)
    li.appendChild(deleteBtn)
    DOMContent.tasks.appendChild(li)

    title.onclick = () => {
        changeCheck(taskItem.id,title)
    }

    deleteBtn.onclick = () => {
        deleteTask(taskItem.id,title)
    }
}

async function changeCheck(taskId, title) {
    try {
        title.classList.toggle('done')
        await fetch(DOMAINURL + endpoints.users + '/' + userId + endpoints.todo + '/' + taskId ,{
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
                checked: title.classList.value === 'done'
            })
        })
    } catch (error) {
        alertFormError(error)
    }
}

async function deleteTask(taskId, title) {
    try {
        title.parentNode.remove()
        await fetch(DOMAINURL + endpoints.users + '/' + userId + endpoints.todo + '/' +taskId ,{
            method: 'DELETE',
        })
    } catch (error) {
        alertFormError(error)
    }
}

loadContent()