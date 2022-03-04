
var myStorage = window.localStorage;
var loginLink = document.getElementById('login-link')
var registerLink = document.getElementById('register-link')
var mainSection = document.getElementById('main')
var loginSection = document.getElementById('login')
var registerSection = document.getElementById('register')
var logoutButton = document.getElementById('logout-button')
var registerButton = document.getElementById('register-button')
var loginButton = document.getElementById('login-button')
var tasksWrapper = document.getElementById('tasksWrapper')
var taskBody = document.getElementById('taskBody')
var sampleTask = document.getElementById('sampleTask')
var titleHeader = document.getElementById('titleHeader')
var priorityHeader = document.getElementById('priorityHeader')
var statusHeader = document.getElementById('statusHeader')
var searchInput = document.getElementById('searchInput')
var createTaskSection = document.getElementById('createTaskSection')
var createFormSection = document.getElementById('createFormSection')
var addTaskForm = document.getElementById('add-task-form')
var detailIsActive = false
var paginatedMenu = document.getElementById('paginateMenu')
// var url = 'http://127.0.0.1:8000/tasks/'
var queryp = {
    "search":"",
    "status" : "",
    "page" : "1 " 
}
var tasks = []


function showMainPage() {
    loginSection.classList.add('hidden')
    registerSection.classList.add('hidden')
    mainSection.classList.remove('hidden')
    createFormSection.classList.add('hidden')
    getTasks()
}

function showLoginPage() {
    main.classList.add('hidden')
    registerSection.classList.add('hidden')
    loginSection.classList.remove('hidden')
    resetErrors()
}

function showRegisterpage(){
    mainSection.classList.add('hidden')
    loginSection.classList.add('hidden')
    registerSection.classList.remove('hidden')
    resetErrors()
}

loginLink.addEventListener("click", function() {
    showLoginPage()
})

registerLink.addEventListener("click", function() {
    showRegisterpage()
})

logoutButton.addEventListener("click", function() {
    logout()
})

registerButton.addEventListener("click", function(e) {
    e.preventDefault();
    register();
})

loginButton.addEventListener("click", function(e) {
    e.preventDefault();
    login();
})

createTaskSection.addEventListener("click", function() {
    resetErrors()
    if (createFormSection.classList.contains('hidden')) {
        createFormSection.classList.remove('hidden')
    }
    else {
        createFormSection.classList.add('hidden')

    }
})

function placeAllTasks(data) {
    tasksWrapper.classList.remove('hidden')
    taskBody.innerHTML = ''
    for (const task of tasks) {
        var placedTask = placeTask(task)
        taskBody.appendChild(placedTask)
    }
}

function placeTask(task) {
    template = sampleTask.cloneNode(true)
    template.id = ''
    template.querySelector('#taskTitle').innerHTML = task.title
    template.querySelector('#taskPriority').innerHTML = task.priority
    taskStatus = template.querySelector('#taskStatus')
    taskStatus.innerHTML = task.status
    taskStatus.classList.add('cursor-pointer')
    if (task.status == 'Completed') {
        taskStatus.classList.add('bg-green-600')
        taskStatus.classList.add('hover:bg-green-500')
        taskStatus.classList.add('text-white')
        taskStatus.addEventListener("click", function() {
            changeState('Scheduled', task)
        })
    }
    if (task.status == 'Scheduled') {
        taskStatus.classList.add('bg-yellow-500')
        taskStatus.classList.add('hover:bg-yellow-400')
        taskStatus.addEventListener("click", function() {
            changeState('In Progress', task)
        })
    }
    if (task.status == 'In Progress') {
        taskStatus.classList.add('bg-purple-600')
        taskStatus.classList.add('hover:bg-purple-500')
        taskStatus.addEventListener("click", function() {
            changeState('Completed', task)
        })
    }
    template.addEventListener("click", function() {
        showTaskDetail(task, this)
    })
    template.classList.remove('hidden')    
    return template
}

function displayRegisterError(data) {
    resetErrors()
    if (data['error']) {
        errorText = data['error']
        if (errorText[0].includes('user')){
            errorField = document.getElementById('username-error')
            errorField.innerHTML = errorText[0]
            errorField.classList.remove('is-hidden')
        }
        if (errorText[0].includes('email')){
            errorField = document.getElementById('email-error')
            errorField.innerHTML = errorText[0]
            errorField.classList.remove('is-hidden')
        }
        if (errorText[0].includes('Passwords')){
            errorField = document.getElementById('password1-error')
            errorField.innerHTML = errorText[0]
            errorField.classList.remove('is-hidden')

            errorField2 = document.getElementById('password2-error')
            errorField2.innerHTML = errorText[0]
            errorField2.classList.remove('is-hidden')
        }
        if(errorText[0].includes('No')) {
            errorField = document.getElementById('login-error')
            errorField.innerHTML = errorText[0]
            errorField.classList.remove('is-hidden')
        }
    }
    else {
        if (data['username']) {
            errorField = document.getElementById('username-error')
            errorField.innerHTML = data['username']
            errorField.classList.remove('is-hidden')
            document.getElementById('register-username').classList.add('border')
            document.getElementById('register-username').classList.add('border-red-500')
            
        }
        if (data['first_name']) {
            errorField = document.getElementById('first-name-error')
            errorField.innerHTML = data['first_name']
            errorField.classList.remove('is-hidden')
            document.getElementById('register-first-name').classList.add('border')
            document.getElementById('register-first-name').classList.add('border-red-500')
        }
        if (data['last_name']) {
            errorField = document.getElementById('last-name-error')
            errorField.innerHTML = data['last_name']
            errorField.classList.remove('is-hidden')
            document.getElementById('register-last-name').classList.add('border')
            document.getElementById('register-last-name').classList.add('border-red-500')
        }
        if (data['email']) {
            errorField = document.getElementById('email-error')
            errorField.innerHTML = data['email']
            errorField.classList.remove('is-hidden')
            document.getElementById('register-email').classList.add('border')
            document.getElementById('register-email').classList.add('border-red-500')
        }
        if (data['password1']) {
            errorField = document.getElementById('password1-error')
            errorField.innerHTML = data['password1']
            errorField.classList.remove('is-hidden')
            document.getElementById('register-password1').classList.add('border')
            document.getElementById('register-password1').classList.add('border-red-500')
        }
        if (data['password2']) {
            errorField = document.getElementById('password2-error')
            errorField.innerHTML = data['password2']
            errorField.classList.remove('is-hidden')
            document.getElementById('register-password2').classList.add('border')
            document.getElementById('register-password2').classList.add('border-red-500')
        }
    } 
}

function displayLoginError(data) {
    resetErrors()
    if (data['error']) {
        errorText = data['error']
        if (errorText[0].includes('No')){
            errorField = document.getElementById('login-username-error')
            errorField.innerHTML = errorText[0]
            errorField.classList.remove('is-hidden')
            document.getElementById('login-username').classList.add('border')
            document.getElementById('login-username').classList.add('border-red-500')
        }
    }
    else {
        if (data['username']) {
            errorField = document.getElementById('login-username-error')
            errorField.innerHTML = data['username']
            errorField.classList.remove('is-hidden')
            document.getElementById('login-username').classList.add('border')
            document.getElementById('login-username').classList.add('border-red-500')
        }
        if (data['password']) {
            errorField = document.getElementById('login-password-error')
            errorField.innerHTML = data['password']
            errorField.classList.remove('is-hidden')
            document.getElementById('login-password').classList.add('border')
            document.getElementById('login-password').classList.add('border-red-500')
        }
    }
}

function resetErrors() {
    errorFields = document.getElementsByClassName('error');
    for (i=0; i < errorFields.length; i++) {
        errorFields[i].innerHTML = ''
        errorFields[i].classList.add('is-hidden')
    }
    inputFields = document.getElementsByClassName('input')
    for (i=0; i < inputFields.length; i++) {
        inputFields[i].classList.remove('border')
        inputFields[i].classList.remove('border-red-500')
    } 
}

function showTaskDetail(task, element) {
    if (detailIsActive == false) {
        editTaskForm = addTaskForm.cloneNode(true)
        editTaskForm.id = 'edit-task-form'
        editTaskForm.classList.add('bg-gray-300')
        editTaskForm.querySelector('#title').id = 'edit-title'
        editTaskForm.querySelector('#description').id = 'edit-description'
        editTaskForm.querySelector('#priority').id = 'edit-priority'
        editTaskForm.querySelector('#edit-title').value = task.title
        editTaskForm.querySelector('#edit-description').value = task.description
        editTaskForm.querySelector('#edit-priority').value = task.priority
        editTaskForm.querySelector('#submit-button').innerHTML = 'Update'
        deleteButton = editTaskForm.querySelector('#submit-button').cloneNode(true)
        deleteButton.id = 'delete-button'
        deleteButton.innerHTML = 'Delete'
        editTaskForm.querySelector('#submit-button').after(deleteButton)
        deleteButton.classList.remove('bg-green-600')
        deleteButton.classList.add('bg-red-600')
        deleteButton.classList.remove('hover:bg-green-500')
        deleteButton.classList.add('hover:bg-red-500')
        deleteButton.type = 'reset'
        deleteButton.addEventListener("click", function() {
            deleteTask(task.id)
        })
        console.log(deleteButton)
        editTaskForm.addEventListener("submit", function(e) {
            e.preventDefault()
            editTask(task.id)
        })
        editTaskForm.querySelector('#title-error').id = 'update-title-error'
        editTaskForm.querySelector('#description-error').id = 'update-description-error'
        editTaskForm.querySelector('#cancel').id = 'edit-cancel'
        editTaskForm.querySelector('#edit-cancel').addEventListener("click", function() {
            editTaskForm.classList.add('hidden')
        })
        editTaskForm.classList.remove('hidden')
        tr = document.createElement('tr')
        td = document.createElement('td')
        td.colSpan = "3"
        td.appendChild(editTaskForm)
        tr.appendChild(td)
        element.after(tr)
        detailIsActive = true
    }
    else {
        editTaskForm.classList.add('hidden')
        detailIsActive = false
    }        
}

function displayInfo(text) {
    info = document.getElementById('message')
    info.querySelector('#displayMessage').innerHTML = text
    info.classList.remove('hidden')
    const myTimeout = setTimeout(removeInfo, 5000);
    myTimeout
}

function displayCreateError(data){
    resetErrors()
    if(data['error']) {
        errorField = document.getElementById('title-error')
        errorField.innerHTML = data['error']
        errorField.classList.remove('hidden')

    }
    if(data['title']) {
        errorField = document.getElementById('title-error')
        errorField.innerHTML = data['title']
        errorField.classList.remove('hidden')
    }
    if(data['description']) {
        errorField = document.getElementById('description-error')
        errorField.innerHTML = data['description']
        errorField.classList.remove('hidden')
    }
}

function displayUpdateError(data){
    resetErrors()
    if(data['error']) {
        errorField = document.getElementById('update-title-error')
        errorField.innerHTML = data['error']
        errorField.classList.remove('hidden')
    }
    if(data['title']) {
        errorField = document.getElementById('update-title-error')
        errorField.innerHTML = data['title']
        errorField.classList.remove('hidden')
    }
    if(data['description']) {
        errorField = document.getElementById('update-description-error')
        errorField.innerHTML = data['description']
        errorField.classList.remove('hidden')
    }
}

function removeInfo(){
    info = document.getElementById('message')
    info.classList.add('hidden')
}

function showPaginateMenu(data){
    previousPage = document.getElementById('previousPage')
    nextPage = document.getElementById('nextPage')
    
    if (data['next'] || data['previous']) {
        if (data['previous']) {
            previousPage.classList.remove('disabled')
        }
        if (!data['previous']) {
            previousPage.classList.add('disabled')
        }
        if (data['next']) {
            nextPage.classList.remove('disabled')
        }
        if (!data['next']) {
            nextPage.classList.add('disabled')
        }
        
        count =data['count']
        group = Math.ceil(count/5)
        pageNumbers = document.getElementById('pageNumbers')
        pageNumbers.innerHTML = '' 
        
        for (i=1; i <= group;  i++ ) {
            li = previousPage.cloneNode(true)
            li.id = i
            li.classList.remove('disabled')
            a = li.querySelector('a')
            a.innerHTML = i
            a.href = ''
            pageNumbers.appendChild(li)
        }
    }
    setLinksToPagination(data)
    paginatedMenu.classList.remove('hidden')
}

function setLinksToPagination(data) {
    pageItems = document.getElementsByClassName('page-item')
    if (data['previous']) {
        var previousPage = document.getElementById('previousPage')
        var prPage = previousPage.cloneNode(true)
        previousPage.parentNode.replaceChild(prPage, previousPage)
        prPage.addEventListener("click", function() {
            console.log(data['previous'])
            getTasks(data['previous'])
        })
    }
    if (data['next']) {
        var nextPage = document.getElementById('nextPage')
        var nxPage = nextPage.cloneNode(true)
        nextPage.parentNode.replaceChild(nxPage, nextPage)
        nxPage.addEventListener("click", function() {
            getTasks(data['next'])
        })
    }
    for (i=1; i < pageItems.length -1; i++) {
        pageItems[i].addEventListener('click', function() {
            linkToPage = 'http://127.0.0.1:8000/tasks/?page=' + this.id
            queryp['page'] = this.id
            getTasks(linkToPage)
        })
    }

}

