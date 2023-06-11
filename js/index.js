document.addEventListener('DOMContentLoaded',() =>{
    const container = document.querySelector('.container__input').children

    const elements={
        input:container[0],
        btnAdd:container[1],
        tasks:document.querySelector('.container__tasks'),
        alert:document.querySelector('.container__alert')
    }

    function addTask(text){
        const li=document.createElement('li')
        const span=document.createElement('span')
        const img=document.createElement('img')

        span.innerText = text
        img.src='./icons/delete.svg'

        li.appendChild(span)
        li.appendChild(img)
        elements.tasks.appendChild(li)
        saveData()
    }

    function saveData(){
        localStorage.setItem('data',elements.tasks.innerText)
    }
    
    function showData(){
        elements.tasks.innerText=localStorage.getItem('data')
    }

    elements.btnAdd.onclick=()=>{
        if(elements.input.value === ''){
            elements.alert.style.visibility='visible'
        }else{
            addTask(elements.input.value)
            elements.input.value=''
            elements.alert.style.visibility='hidden'
        }
    }

    elements.tasks.addEventListener('click',function(e){
        if(e.target.tagName === 'SPAN'){
            e.target.classList.toggle('done')
            saveData()
        }else if(e.target.tagName === 'IMG'){
            e.target.parentNode.remove()
            saveData()
        }
    })
    showData()
})