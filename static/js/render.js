
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
var url = {
    "search":"",
    "status" : "",
    "page" : "1 " 
}

var headerText = document.getElementById('welcome-text')
var greetingText = document.getElementById('welcome-username')
var loginForm = document.getElementById('login-form')
var registerForm = document.getElementById('register-form')


var tasks = []
var titleAscending = true
var statusAscending = true
var idAscending = true



function showMainPage(username) {
    loginSection.classList.add('hidden')
    registerSection.classList.add('hidden')
    mainSection.classList.remove('hidden')
    createFormSection.classList.add('hidden')
    getTasks()
    // loginForm.classList.add('is-hidden')
    // registerForm.classList.add('is-hidden')
    // loginLink.classList.add('is-hidden')
    // registerLink.classList.add('is-hidden')
    // logoutButton.classList.remove('is-hidden')
    // greetingText.innerHTML ='Welcome ' +  myStorage.getItem('username');
    // headerText.innerHTML = ''
    // addTaskIcon.classList.remove('is-hidden')
    // document.getElementById('search-form').classList.remove('is-hidden')
    
}

function showLoginPage() {
    // console.log('login page')
    main.classList.add('hidden')
    registerSection.classList.add('hidden')
    loginSection.classList.remove('hidden')
    resetErrors()

    // document.getElementById('register').classList.add('is-hidden')
    // document.getElementById('login').classList.remove('is-hidden')
    
    // registerLink.classList.remove('is-hidden')
    // loginLink.classList.add('is-hidden')
    // logoutButton.classList.add('is-hidden')
    // document.getElementById('login').classList.remove('is-hidden')
    // document.getElementById('register').classList.add('is-hidden')
    // loginForm.classList.remove('is-hidden')
    // headerText.innerHTML = 'Please login with your username and password'
    // tasksWrapper.innerHTML = ''
    // addTaskIcon.classList.add('is-hidden')
    // document.getElementById('search-form').classList.add('is-hidden')
    // paginatedMenu.classList.add('is-hidden')
    // resetErrors()

}

function showRegisterpage(){
    // console.log('reg page')
    mainSection.classList.add('hidden')
    loginSection.classList.add('hidden')
    registerSection.classList.remove('hidden')
    resetErrors()

    // document.getElementById('register').classList.remove('is-hidden')
    // document.getElementById('login').classList.add('is-hidden')
    // loginLink.classList.remove('is-hidden')
    // document.getElementById('register').classList.remove('is-hidden')
    // document.getElementById('login').classList.add('is-hidden')
    // registerForm.classList.remove('is-hidden')
    // registerLink.classList.add('is-hidden')
    // headerText.innerHTML = 'Please register'
    // addTaskIcon.classList.add('is-hidden')
    // document.getElementById('search-form').classList.add('is-hidden')

    // resetErrors()
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
    // console.log(1)
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
    // showPaginateMenu(data)
}



// function createHeaders(){
//     header = document.createElement('div')
//     header.classList.add('columns')
//     header.classList.add('is-mobile')
//     header.id = 'task-header'

//     // indexHeader = document.createElement('div')
//     // indexHeader.classList.add('column')
//     // indexHeader.classList.add('is-1')
//     // indexHeader.classList.add('has-text-weight-bold')
//     // indexHeader.classList.add('pl-0')
        
//     // button1 = document.createElement('button')
//     // button1.classList.add('button')
//     // button1.classList.add('is-info')
//     // button1.innerHTML = 'No'
//     // indexHeader.appendChild(button1)
//     // button1.addEventListener("click", function() {
//     //     if (idAscending) {
//     //         order('-id')
//     //         idAscending = false
//     //     }
//     //     else {
//     //         order('id')
//     //         idAscending = true
//     //     }
//     // })
//     // header.appendChild(indexHeader)

//     titleHeader = document.createElement('div')
//     titleHeader.classList.add('column')
//     titleHeader.classList.add('is-8')
//     titleHeader.classList.add('has-text-weight-bold')
//     // titleHeader.classList.add('has-text-centered')
//     button = document.createElement('button')
//     button.classList.add('button')
//     button.classList.add('is-info')
    
//     button.innerHTML = 'Title'
//     titleHeader.appendChild(button)
//     titleHeader.id = 'title-header'
//     button.addEventListener("click", function() {
//         if (titleAscending) {
//             order('-title')
//             titleAscending = false
//         }
//         else {
//             order('title')
//             titleAscending = true
//         }
//     })
//     header.appendChild(titleHeader)

//     statusHeader = document.createElement('div')
//     statusHeader.classList.add('column')
//     statusHeader.classList.add('is-3')
//     statusHeader.classList.add('has-text-weight-bold')
//     statusHeader.classList.add('has-text-centered')
//     statusHeader.classList.add('pr-0')
        
    
//     dropdownStatus = document.getElementById('dropdown-status')
//     dropdown = dropdownStatus.cloneNode(true)
//     dropdown.classList.remove('is-hidden')
//     statusHeader.appendChild(dropdown)
//     var drpBtn = dropdown.querySelector('.dropdown-button')

//     drpBtn.addEventListener('click', function(event) {
//         event.stopPropagation();
//         dropdown.classList.toggle('is-active');
//       });
    
//     dropdown.querySelector('#filterDone').addEventListener("click", function() {
//         getTasks('http://127.0.0.1:8000/tasks?complete=true')
//         dropdown.querySelector('#filterDone').classList.add('is-active')
//         dropdown.querySelector('#filterInProgress').classList.remove('is-active')
//     })

//     dropdown.querySelector('#filterInProgress').addEventListener("click", function() {
//         getTasks('http://127.0.0.1:8000/tasks?complete=false')
//         dropdown.querySelector('#filterInProgress').classList.add('is-active')
//         dropdown.querySelector('#filterDone').classList.remove('is-active')
//     })
    
    
    
//     statusSort = dropdown.querySelector('.sort-button')
//     statusSort.addEventListener("click", function() {
//         if (statusAscending) {
//             order('-status')
//             statusAscending = false
//         }
//         else {
//             order('status')
//             statusAscending = true
//         }
//     })
//     header.appendChild(statusHeader)
//     tasksWrapper.appendChild(header)
// }

function placeTask(task) {
    template = sampleTask.cloneNode(true)
    template.id = ''
    template.querySelector('#taskTitle').innerHTML = task.title
    template.querySelector('#taskPriority').innerHTML = task.priority
    taskStatus = template.querySelector('#taskStatus')
    taskStatus.innerHTML = task.status
    taskStatus.classList.add('cursor-pointer')
    if (task.status == 'Completed') {
        // taskStatus.classList.remove('bg-purple-200')
        // taskStatus.classList.remove('text-purple-600')
        // taskStatus.classList.remove('hover:bg-purple-300')
        taskStatus.classList.add('bg-green-600')
        taskStatus.classList.add('hover:bg-green-500')
        taskStatus.classList.add('text-white')

        taskStatus.addEventListener("click", function() {
            changeState('Scheduled', task)
        })
    }
    if (task.status == 'Scheduled') {
        // taskStatus.classList.remove('bg-yello-600')
        // taskStatus.classList.remove('text-purple-600')
        // taskStatus.classList.remove('hover:bg-yellow-500')
        // taskStatus.classList.remove('hover:bg-purple-500')
        
        taskStatus.classList.add('bg-yellow-500')
        taskStatus.classList.add('hover:bg-yellow-400')
        // taskStatus.classList.add('text-yellow-600')
        taskStatus.addEventListener("click", function() {
            changeState('In Progress', task)
        })
    }
    if (task.status == 'In Progress') {
        // taskStatus.classList.remove('bg-purple-600')
        // taskStatus.classList.remove('hover:bg-purple-500')
        // taskStatus.classList.remove('text-yellow-600')
        taskStatus.classList.add('bg-purple-600')
        // taskStatus.classList.add('text-purple-500')
        taskStatus.classList.add('hover:bg-purple-500')
        taskStatus.addEventListener("click", function() {
            changeState('Completed', task)
        })
    }
    template.addEventListener("click", function() {
        showTaskDetail(task, this)
    })
    
    template.classList.remove('hidden')    
    // console.log(template)
    // taskTemplate = createTaskTemplate()
    // taskTemplate.querySelector('.task-title').innerHTML = task.title
    // taskTemplate.querySelector('.task-title').addEventListener("click", function() {
    //     showTaskDetail(task, this.parentElement)
    // })
    // statusButton = taskTemplate.querySelector('.status-button')
    // if(task.complete == true) {
    //     statusButton.classList.remove('is-info');
    //     statusButton.classList.add('is-danger');
    //     statusButton.innerHTML = 'Done'
    //     statusButton.addEventListener("click", function(){
    //         changeState(task)
    //     })
    //     taskTemplate.querySelector('.task-title').style.setProperty("text-decoration", "line-through");
    // }
    // else {
    //     statusButton.classList.add('is-info');
    //     statusButton.classList.remove('is-danger');
    //     statusButton.innerHTML = 'In Progress'
    //     statusButton.addEventListener("click", function(){
    //         changeState(task)
    //     })
    // }
    return template
}

// function createTaskTemplate() {
//     taskItem = document.createElement('div')
//     taskItem.classList.add('columns')
//     taskItem.classList.add('is-mobile')
//     taskItem.classList.add('task-items')
//     // taskNumber = document.createElement('div')
//     // taskNumber.classList.add('column')
//     // taskNumber.classList.add('is-1')
//     // taskNumber.classList.add('task-number')
//     // taskNumber.classList.add('is-flex')
//     // taskNumber.classList.add('is-align-items-center')
//     // taskItem.appendChild(taskNumber)
    
//     taskTitle = document.createElement('div')
//     taskTitle.classList.add('column')
//     taskTitle.classList.add('is-8')
//     taskTitle.classList.add('task-title')
//     taskTitle.classList.add('is-flex')
//     taskTitle.classList.add('is-align-items-center')
//     taskItem.appendChild(taskTitle)
//     taskStatus = document.createElement('div')
//     taskStatus.classList.add('column')
//     taskStatus.classList.add('is-3')
//     taskStatus.classList.add('task-status')
//     taskStatus.classList.add('is-flex')
//     taskStatus.classList.add('is-align-items-center')
//     taskStatus.classList.add('is-justify-content-center')
//     button = document.createElement('button')
//     button.classList.add('button')
//     button.classList.add('is-info')
//     button.classList.add('is-outlined')
//     button.classList.add('status-button')
//     button.innerHTML = 'In progress'

//     taskStatus.appendChild(button)
//     taskItem.appendChild(taskStatus)
//     return taskItem
// }

function displayRegisterError(data) {
    resetErrors()
    if (data['error']) {
        errorText = data['error']
        // console.log(errorText)
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
    // console.log(data)
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
        // editTaskForm.querySelector('.is-grouped').id = task.id
        // editTaskForm.querySelector('#submit-button').id = ''
        // deleteButton.classList.add('button')
        // deleteButton.classList.add('is-danger')
        // deleteButton.type = 'reset'
        // deleteButton.addEventListener("click", function() {
        //     deleteTask(task.id)
        // })
        // deleteButton.innerHTML = 'Delete'
        // editTaskForm.querySelector('.is-grouped').appendChild(deleteButton)
        tr = document.createElement('tr')
        td = document.createElement('td')
        td.colSpan = "3"
        td.appendChild(editTaskForm)
        
        tr.appendChild(td)
        element.after(tr)
        detailIsActive = true
        // editTask(task.id)
    }
    else {
        console.log(89)
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
    console.log(data)
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

// document.getElementById('statusFilterButton').addEventListener("click", function() {
//     document.getElementById('taskTable').style.height = '200px';
// })


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
    
    // previousButton = paginatedMenu.querySelector('.pagination-previous')
    // nextButton = paginatedMenu.querySelector('.pagination-next')
    
    // if (data['next'] || data['previous']) {
    //     paginatedMenu.classList.remove('is-hidden');
    //     if (data['previous']) {
    //         previousButton.classList.remove('is-hidden');

    //         var new_element = previousButton.cloneNode(true);
    //         previousButton.parentNode.replaceChild(new_element, previousButton);

    //         new_element.addEventListener("click", function() {
    //             getTasks(data['previous'])
    //         })
    //     }
    //     if (data['next']) {
    //         nextButton.classList.remove('is-hidden');
            
    //         var y = nextButton.cloneNode(true);
    //         nextButton.parentNode.replaceChild(y, nextButton);

    //         y.addEventListener("click", function() {
    //             getTasks(data['next'])
    //         })
    //     }

    //     if(!data['next']){
    //         nextButton.classList.add('is-hidden');
    //     }
    //     if(!data['previous']){
    //         previousButton.classList.add('is-hidden');
    //     }
    // }
    // else {
    //     paginatedMenu.classList.add('is-hidden')
    // }
    // count =data['count']
    // group = Math.ceil(count/5)
    // pagList = paginatedMenu.querySelector('.pagination-list')
    // pagList.innerHTML = ''
    // for (i=1; i <= group; i++ ) {
    //     li = document.createElement('li')
    //     a = document.createElement('a')
    //     a.classList.add('pagination-link')
    //     a.innerHTML = i
    //     li.appendChild(a)
    //     pagList.appendChild(li)
    //     url = "http://127.0.0.1:8000/tasks/?page=" + i
    //     addPaginationEvent(a, url); 
    // }
    // if (data['next']) {
    //     currentPage = parseInt(data['next'][data['next'].length - 1]) - 1
    // }
    // else if (data['previous']) {
    //     currentPage = parseInt(data['previous'][data['previous'].length - 1]) + 1
    // }
    // console.log(data)
    // console.log(currentPage)
    
    // if(currentPage) {
    //     paginationLinks = document.getElementsByClassName('pagination-link')
    //     for (paginationLink of paginationLinks) {
    //         paginationLink.classList.remove('is-active')
    //     }
    //     for (paginationLink of paginationLinks) {
    //         if(paginationLink.innerHTML == String(currentPage)) {
    //             String(currentPage)
    //             paginationLink.classList.add('is-current')
    //         }
    //     }
    // }
}

function setLinksToPagination(data) {
    // console.log(data)
    pageItems = document.getElementsByClassName('page-item')
    // console.log(data)
    // console.log(url)
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
            url['page'] = this.id
            console.log(url)
            getTasks(linkToPage)
        })


        // console.log(pageItems[i])
        // console.log(pageItems[i])
        // if(pageItems[i].id == 'previousPage' && data['previous']) {
            // console.log(6777)
            // console.log(pageItems[i].id)
            // console.log(data['previous'])
            // var new_element = pageItems[i].cloneNode(true);
            // pageItems[i].parentNode.replaceChild(new_element, pageItems[i]);
            // new_element.addEventListener("click", function(){
                // url['page'] = (parseInt(url['page'])  - 1).toString()
                // console.log(url)
                // getTasks(data['previous'])
            // })
        // }
        // if(pageItems[i].id == 'nextPage' && data['next']) {
            // var new_element2 =  pageItems[i].cloneNode(true);
            // pageItems[i].parentNode.replaceChild(new_element2, pageItems[i]);
            // new_element2.addEventListener("click", function(){
                // console.log(data)
                // console.log(88)
                // url['page'] = (parseInt(url['page'])  + 1).toString()
                // console.log(url)
                // console.log(data['next'])
                // console.log(data)
                // getTasks(data['next'])  
            // })
        // }
        // if (pageItems[i].id != 'previousPage' && pageItems[i].id != 'nextPage' ) {
            // pageItems[i].addEventListener('click', function() {
                // linkToPage = 'http://127.0.0.1:8000/tasks/?page=' + this.id
                // url['page'] = this.id
                // console.log(url)
                // getTasks(linkToPage)
            // })
        // }
    }
}

