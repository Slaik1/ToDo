const DOMAINURL = 'https://6484e2a6ee799e3216271c29.mockapi.io/api/v1'

const endpoints={
	users:'/users',
	todo:'/todo'
}

const USER_ID = 1

const TODO_BASE_URL = DOMAINURL + endpoints.users + '/' + USER_ID + endpoints.todo

class TacksApi {
	getList = tryCatchWrapper(async () => {
			const response = await fetch(TODO_BASE_URL)
			const tasksList = await response.json()
	
			return tasksList
	})

	add = tryCatchWrapper(async (newTask) => {
			const request = await fetch(TODO_BASE_URL, {
					method: 'POST',
					headers: {'content-type':'application/json'},
					body: JSON.stringify(newTask)
			})

			if(!request.ok) throw new Error("Ошибка запроса создания todo")

			const newTodo = await request.json()

			return newTodo
	})

	change = tryCatchWrapper(async (taskId, checked) => {
			await fetch(TODO_BASE_URL + '/' + taskId ,{
					method: 'PUT',
					headers: {'content-type':'application/json'},
					body: JSON.stringify({
							checked: checked
					})
			})
	})

	delete = tryCatchWrapper(async (id) => { 
			await fetch(TODO_BASE_URL + '/' +id, {
					method: 'DELETE',
			})
	})
}

var API = {
	tasks: new TacksApi()
}