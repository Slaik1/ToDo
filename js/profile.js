const DOMAINURL='https://6484e2a6ee799e3216271c29.mockapi.io/api/v1/users'
let userId
if(localStorage.getItem('userId') === null){
    createNewUser()
}
else{
    userId = localStorage.getItem('userId')
}

function createNewUser(){
    userId = Math.floor(Math.random()*99+1)
    localStorage.setItem('userId',userId)
}

async function fetchUserInfo(userId){
   try{
        const response = await fetch(DOMAINURL+'/'+ userId)
        const data = await response.json()
        fillUserInfo(data)
    }
    catch(e){
        alert(e)
    }
}

function fillUserInfo(data){
    const DOMFields = findDOMContent()
    DOMFields.name.innerText = data.name
    DOMFields.country.innerText = data.country
    DOMFields.city.innerText = data.city
    DOMFields.street.innerText = data.street
    DOMFields.phone.innerText = data.phone
    DOMFields.birthDate.innerText = data.birthdate
    DOMFields.photo.src=data.image
}

function stopLoader(){
    document.body.classList.add('loaded');
}

function findDOMContent(){
    const fields = document.querySelector('.profile__info').children

    const DOMFields={
        name:'',
        country:'',
        city:'',
        street:'',
        phone:'',
        birthDate:'',
    }

    let i=0
    for (let field in DOMFields) {
        DOMFields[field] = fields[i].children[1]
        i++
    }

    DOMFields.photo = document.querySelector('#photo')
    
    return DOMFields
}

fetchUserInfo(userId)
stopLoader()