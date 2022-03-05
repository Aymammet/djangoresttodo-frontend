
if (window.location.origin == 'file://') {
    var url = 'http://127.0.0.1:8000/' 
}
else {
    var url = "https://todo-aymammet.herokuapp.com/"
}

function checkLoginState() {
    token = myStorage.getItem('token');
    if(token) {
        showMainPage()
    }
    else {
        showLoginPage()
    }
}

async function register() {
    var registerUsername = document.getElementById('register-username').value;
    var registerFirstName = document.getElementById('register-first-name').value;
    var registerLastName = document.getElementById('register-last-name').value;
    var registerEmail = document.getElementById('register-email').value;
    var registerPassword1 = document.getElementById('register-password1').value;
    var registerPassword2 = document.getElementById('register-password2').value;
    var registerForm = document.getElementById('register-form')
    var registerUrl = url + 'register/'
    response = await fetch(registerUrl, {
        method : 'POST',
        headers: {
        'Content-type' : 'application/json',
        },
        body : JSON.stringify({
            'username': registerUsername,
            'first_name': registerFirstName,
            'last_name': registerLastName, 
            'email': registerEmail, 
            'password1': registerPassword1,
            'password2': registerPassword2,
        })
    })
    if (response.status === 201) {
        let data = await response.json();
        registerForm.reset()
        displayInfo('Successifully registered ' + registerUsername);
        showLoginPage();
    }
    else {
        let data = await response.json();
        displayRegisterError(data)
    }
}

async function login() {
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
    var loginForm = document.getElementById('login-form')
    var loginUrl = url + "login/";

    response = await fetch(loginUrl, {
        method : 'POST',
        headers: {
            'Content-type' : 'application/json',
        },
        body : JSON.stringify({
            'username': username,
            'password': password,
        })
    })

    if (response.status === 200) {
        let data = await response.json();
        myStorage.setItem('token', data['Token']);
        myStorage.setItem('username', data['username']);
        loginForm.reset()
        var message = 'You logged in as ' + data['username']
        displayInfo(message);
        userUsername.innerHTML = data['username']
        showMainPage()
    }
    else {
        let data = await response.json();
        displayLoginError(data)
    }
}

function getTasks(link) { 
    if (link) {
        mainUrl = link
    }
    else {
        mainUrl = updateUrl()
    }   

    token = myStorage.getItem('token');
    if (token) {
        fetch(mainUrl, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then(function(data) {
            results = data['results']
            tasks = []
            for(i = 0; i<results.length; i++) {
                tasks.push(results[i])
            }
            placeAllTasks(data)
            showPaginateMenu(data)
            userUsername.innerHTML = myStorage.getItem('username');
        })
    }
}

function updateUrl() {
    var currentUrl = url + 'tasks?' + 'search=' + queryp["search"] + '&status=' +  queryp["status"] + '&page=' + queryp["page"]
    return currentUrl
}

document.getElementById('filter-in-progress').addEventListener("click", function() {
    changeFilter('In Progress')
})

document.getElementById('filter-scheduled').addEventListener("click", function() {
    changeFilter('Scheduled')
})

document.getElementById('filter-completed').addEventListener("click", function() {
    changeFilter('Completed')
})

function changeFilter(filter) {
    queryp["status"] = filter
    getTasks()
}

function logout() {
    var logoutUrl = url +  "logout/";
    fetch(logoutUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': 'Token ' + myStorage.getItem('token'),
            'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then(function(data) {
            displayInfo('Successifully Logged out');
            myStorage.removeItem('token');
            myStorage.removeItem('username');
            showLoginPage()
    })
}

var addTaskForm = document.getElementById('add-task-form')

addTaskForm.addEventListener("submit", function(e) {
    e.preventDefault();
    createTask()
})

async function createTask() {
        var title = document.getElementById('title').value
        var description = document.getElementById('description').value
        var priority = document.getElementById('priority').value
        var addTaskUrl = url +  "tasks/"

        response = await fetch(addTaskUrl, {
            method : 'POST',
            headers: {
                'Authorization': 'Token ' + myStorage.getItem('token'),
                'Content-type' : 'application/json',
            },
            body : JSON.stringify({
                'title': title, 
                'description': description,
                'priority' : priority
            })
        })
        if (response.status === 201) {
            getTasks();
            addTaskForm.reset();
            createFormSection.classList.add('hidden')
            displayInfo('Task is created');
        }
        else {
            let data = await response.json();
            displayCreateError(data)
        }
}

document.getElementById('cancel').addEventListener("click", function() {
    createFormSection.classList.add('hidden')
})

async function editTask(id) {
        var updateTitle = document.getElementById('edit-title').value
        var updateDescription = document.getElementById('edit-description').value
        var updatePriority = document.getElementById('edit-priority').value
        var editTaskUrl = url +  "tasks/"  + id + '/'
        
        response = await fetch(editTaskUrl, {
            method : 'PUT',
            headers: {
                'Authorization': 'Token ' + myStorage.getItem('token'),
                'Content-type' : 'application/json',
            },
            body : JSON.stringify({
                'title': updateTitle, 
                'description': updateDescription,
                'priority' : updatePriority
            })
        })
        if (response.status === 200) {
            editTaskForm.reset()
            editTaskForm.classList.add('is-hidden')
            displayInfo('Task is updated');
            getTasks()
        }
        else {
            let data = await response.json();
            displayUpdateError(data)
        }
    
}

function deleteTask(id) {
    var deleteUrl = url + "tasks/"  + id + '/'
    fetch(deleteUrl, {
        method : 'DELETE',
        headers: {
            'Authorization': 'Token ' + myStorage.getItem('token'),
            'Content-type' : 'application/json',
        }
    })
    .then(function(data) {
        getTasks();
        displayInfo('Your task is deleted');
    })
}

async function changeState(state,task) {
    var editTaskUrl = url + "tasks/"  + task.id + '/'
    response = await fetch(editTaskUrl, {
        method : 'PUT',
        headers: {
            'Authorization': 'Token ' + myStorage.getItem('token'),
            'Content-type' : 'application/json',
        },
        body : JSON.stringify({
            'status': state,
            'title': task.title, 
            'description': task.description,
            'priority' : task.priority
        })
    })
    if (response.status === 200) {
        getTasks()
    }
}

searchInput.addEventListener("keyup", function(){
    queryp["search"] = searchInput.value
    getTasks()
})

titleHeader.addEventListener("click", function() {
    order('title')
})

priorityHeader.addEventListener("click", function() {
    order('priority')
})

statusHeader.addEventListener("click", function() {
    order('status')
})

var sort = 'asc'
async function order(parameter) {
    if (sort == 'asc') {
        var orderUrl = url + "tasks?ordering=" + parameter;
        sort = 'desc'
    }
    else {
        var orderUrl = url + "tasks?ordering=" + '-' + parameter;
        sort = 'asc'
    }
    token = myStorage.getItem('token');
    response = await fetch(orderUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': 'Token ' + token,
            'Content-Type': 'application/json'
        },
    })
    if (response.status == 200) {
        let data = await response.json();
        results = data['results']
        tasks = []
        for(i = 0; i<results.length; i++) {
            tasks.push(results[i])
        }
        placeAllTasks(data)
    }
}
