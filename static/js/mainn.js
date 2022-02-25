
    var loginLink = document.getElementById('login-link')
    var registerLink = document.getElementById('register-link')
    var logoutLink = document.getElementById('logout-link') 
    var registerButton = document.getElementById('register-button')
    var loginButton = document.getElementById('register-button')
    var logoutButton = document.getElementById('register-button')
    var welcomeText = document.getElementById('welcome-text')
    
    loginLink.addEventListener("click", function() {
        showRegisterpage()
    })
    registerLink.addEventListener("click", function() {
        showLoginPage()
    })

    function showLoginPage() {
        console.log(34)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        registerLink.classList.remove('is-hidden')
        document.getElementById('login').classList.remove('is-hidden')
        document.getElementById('register').classList.add('is-hidden')
        loginLink.classList.add('is-hidden')
        document.getElementById('login-form').classList.remove('is-hidden')
        document.getElementById('task-items').classList.add('is-hidden')
        welcomeText.innerHTML = 'Please login'
    }

    function showRegisterpage(){
        loginLink.classList.remove('is-hidden')
        document.getElementById('register').classList.remove('is-hidden')
        document.getElementById('login').classList.add('is-hidden')
        registerLink.classList.add('is-hidden')
        welcomeText.innerHTML = 'Please register'
    }

    function main() {
        token = myStorage.getItem('token');
        if (token) {
            getTasks()
            registerLink.classList.add('is-hidden')
        }
        else {
            showLoginPage()
        }
    }
    main()

    

   

    loginLink.addEventListener("click", function() {
        registerLink.classList.remove('is-hidden')
        document.getElementById('login').classList.remove('is-hidden')
        document.getElementById('register').classList.add('is-hidden')
        loginLink.classList.add('is-hidden')
        welcomeText.innerHTML = 'Please login'
    })

    registerLink.addEventListener("click", function() {
        loginLink.classList.remove('is-hidden')
        document.getElementById('register').classList.remove('is-hidden')
        document.getElementById('login').classList.add('is-hidden')
        this.classList.add('is-hidden')
        welcomeText.innerHTML = 'Please register'
    })


    // Register
    
    registerButton.addEventListener("click", function(e) {
        e.preventDefault();
        registerUser();
    })

    function registerUser() {
        var registerUsername = document.getElementById('register-username').value;
        var registerFirstName = document.getElementById('register-first-name').value;
        var registerLastName = document.getElementById('register-last-name').value;
        var registerEmail = document.getElementById('register-email').value;
        var registerPassword1 = document.getElementById('register-password1').value;
        var registerPassword2 = document.getElementById('register-password2').value;
        var registerUrl = "http://127.0.0.1:8000/register/";        
        
        fetch(registerUrl, {
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
        .then((resp) => resp.json())
        .then(function(data) {
            document.getElementById('register-form').reset()
            alert('Successifully registered')
        })
    }


    var loginUrl = "http://127.0.0.1:8000/login/"
    var loginButton = document.getElementById('login-button')

    loginButton.addEventListener("click", function(e) {
        e.preventDefault()
        async function login() {
            username = document.getElementById('username').value
            password = document.getElementById('password').value
            await fetch(loginUrl, {
                method : 'POST',
                headers: {
                    'Content-type' : 'application/json',
                },
                body : JSON.stringify({
                    'username': username,
                    'password': password,
                })
            })
            .then((resp) => resp.json())
            .then(function(data) {
                var getData = data;
                console.log(getData)
                myStorage.setItem('token', getData['Token']);
                document.getElementById('login-form').reset();  
                loginLink.classList.add('is-hidden');
                logoutLink.classList.remove('is-hidden');
                registerLink.classList.add('is-hidden');
                main();
                console.log(9)
                document.getElementById('login-form').classList.add('is-hidden')
                document.getElementById('task-items').classList.remove('is-hidden')
                main();
            })
        }   
        login()
    })
    console.log(myStorage)


    function logout() {
        logoutLink.addEventListener("click", function() {
            console.log(98)
        var url = "http://127.0.0.1:8000/logout/";
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': 'Token ' + myStorage.getItem('token'),
                'Content-Type': 'application/json'
                }
            })
            .then((resp) => resp.json())
            .then(function(data) {
                asd = data;
                console.log(asd)
                myStorage.removeItem('token');
                logoutLink.classList.add('is-hidden')
                main();
                })
            })
      
    }
    logout()


    addTask = document.getElementById('add-task')
    addTaskIcon = document.getElementById('add-task-icon')
    addTaskIcon.addEventListener("click", function(){
        if(addTask.classList.contains('is-hidden')) {
            addTask.classList.remove('is-hidden')
        }
        else {
            addTask.classList.add('is-hidden')
        }   
    })
    cancelButton = document.getElementById('cancel-button')
    cancelButton.addEventListener("click", function() {
        addTask.classList.add('is-hidden')
    })
    
    function getTasks() {
        token = myStorage.getItem('token');
        if (token) {
        document.getElementById('login').classList.add('is-hidden')
        document.getElementById('register').classList.add('is-hidden')
        logoutLink.classList.remove('is-hidden')
        loginLink.classList.add('is-hidden')
        var getTasksUrl = "http://127.0.0.1:8000/tasks/";
            console.log(1)
            console.log(token)
            fetch(getTasksUrl, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': 'Token ' + token,
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => resp.json())
            .then(function(data) {
                tasksList = data;
                document.getElementById('task-items').classList.remove('is-hidden')
                placeTasks(tasksList)
            })
        }
        else {
            console.log(2)
            console.log(token)
        }
        
     
        
    }
    getTasks()
    // function getCookie(name) {
    //     let cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         const cookies = document.cookie.split(';');
    //         for (let i = 0; i < cookies.length; i++) {
    //             const cookie = cookies[i].trim();
    //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    //     return cookieValue;
    // }
    // const csrftoken = getCookie('csrftoken');
    var activeItem = null;
    var tasks = document.getElementById('tasks');
    
    
    // Get Tasks
  
    // getTasks()

        // add Task
        var form = document.getElementById('add-task')
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            var title = document.getElementById('title').value
            var description = document.getElementById('description').value
            var priority = document.getElementById('priority').value
            fetch(url, {
                method : 'POST',
                headers: {
                    'Content-type' : 'application/json',
                    'X-CSRFToken' : csrftoken
                },
                body : JSON.stringify({
                    'title': title, 
                    'description': description,
                    'priority' : priority
                })
            }).then(function(response){
                getTasks();
                addTask.classList.add('is-hidden')
                document.getElementById('form').reset();
            })
            
        })

        // Edit Task
        var formCreated = false
        function editTask(task, element) {
            if (formCreated == false) {
                createForm(element)
                formCreated = true
            }
            
            var updateForm = document.getElementById('update-form')
                updateForm.addEventListener("submit", function(e) {
                    e.preventDefault();
                    var updateTitle = document.getElementById('update-title').value
                    var updateDescription = document.getElementById('update-description').value
                    var updatePriority = document.getElementById('update-priority').value
                    
                    var updateUrl = url + task.id + '/';
                    fetch(updateUrl, {
                        method : 'PUT',
                        headers: {
                            'Content-type' : 'application/json',
                            'X-CSRFToken' : csrftoken
                        },
                        body : JSON.stringify({
                            'title': updateTitle, 
                            'description': updateDescription,
                            'priority' : updatePriority
                        
                        })
                    }).then((resp) => resp.json())
                    .then(function(data) {
                        task = data;
                        updateForm.remove()
                        renderTask(task, element)
                        formCreated = false
                    })
                })
            
        }

        // Delete Task
        function deleteTask(task) {
            var deleteUrl = url + task.id
            fetch(deleteUrl, {
                method : 'DELETE',
                headers: {
                    'Content-type' : 'application/json',
                    'X-CSRFToken' : csrftoken
                }
            }).then((response) => {
                getTasks();
            })
        }

        // Change task status
        function changeStatus(task, button) {
            var changeStateUrl = "http://127.0.0.1:8000/base/tasks/" + task.id + "/change-state/";
            fetch(changeStateUrl, {
                method : 'POST',
                headers: {
                    'Content-type' : 'application/json',
                    'X-CSRFToken' : csrftoken
                },
                body : JSON.stringify({'complete': task.complete})
            }).then ((response) => response.json())
                .then(function(data){
                    taskState = data
                    if (taskState['state']) {
                        button.classList.remove('is-info')
                        button.classList.add('is-danger')
                        button.innerHTML = 'Done'
                        console.log(button)
                        console.log('y')
                    }
                    else {
                        console.log('x')
                        button.classList.remove('is-danger')
                        button.classList.add('is-info')
                        button.innerHTML = 'In progress'
                        console.log(button)
                        console.log('x')
                    }
                })
        }

        function createForm(element) {
            console.log(1)
            form = document.getElementById('form')
            updateForm = form.cloneNode(true)
            updateForm.id = 'update-form'
            updateForm.querySelector('#title').value = element.querySelector('.task-title').innerHTML
            console.log(element.querySelector('.task-title'))
            // updateForm.querySelector('#description').value = task.description
            // updateForm.querySelector('#priority').value = task.priority
            updateForm.querySelector('#submit-button').innerHTML = 'Update'
            updateForm.querySelector('#title').id = 'update-title'
            updateForm.querySelector('#description').id = 'update-description'
            updateForm.querySelector('#priority').id = 'update-priority'
            element.after(updateForm) 
        }


        function taskDetail(task, element) {
            var detailUrl = "http://127.0.0.1:8000/base/tasks/"+ task.id + "/details/";
            fetch(detailUrl,{
                method : 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'X-CSRFToken' : csrftoken
                },
            }).then((response) => response.json())
                .then(function(data) {
                task = data;
                showTaskDetail(task, element)
            }) 
        }
        detailIsActive = false

        function placeTasks(allTasks) {
            taskWrapper = document.getElementById('tasks')
            taskWrapper.innerHTML = ''
            let index = 0
            let completedTasks = 0
            for (const task of allTasks) {
                index = index + 1
                sample = createTaskTemplate()
                el = renderTask(task, sample, index)
                el.querySelector('.task-number').innerHTML = index
                el.querySelector('.task-edit').addEventListener("click", function() {
                    editTask(task, this.parentElement)
                })
                taskWrapper.appendChild(el)
            }
        }
            function renderTask(task, sample) {
                
                sample.querySelector('.task-title').innerHTML = task.title
                sample.querySelector('.task-title').addEventListener("click", function() {
                    showTaskDetail(task, this.parentElement)
                })
                // sample.querySelector('.task-number').innerHTML = index
                sample.querySelector('.task-delete').id = task.id
                editButton = sample.querySelector('.task-edit')
                // editButton.addEventListener("click", function() {
                //     editTask(task, this.parentElement);
                // })
                statusButton = sample.querySelector('.status-button')
                if(task.complete == true) {
                    statusButton.classList.remove('is-info');
                    statusButton.classList.add('is-danger');
                    statusButton.innerHTML = 'Done'
                }
                statusButton.addEventListener("click", function() {
                    changeStatus(task, this)
                })
        
                deleteButton = sample.querySelector('.task-delete');
                deleteButton.addEventListener("click", function() {
                    deleteTask(task)
                })
                return sample
                
            }
            // document.getElementById('incompleted-tasks').innerHTML = allTasks.length - completedTasks
        
    
        function createTaskTemplate() {
            taskItem = document.createElement('div')
            taskItem.classList.add('columns')
            taskItem.classList.add('is-mobile')
            taskItem.classList.add('task-items')
            taskNumber = document.createElement('div')
            taskNumber.classList.add('column')
            taskNumber.classList.add('is-1')
            taskNumber.classList.add('task-number')
            taskNumber.classList.add('is-flex')
            taskNumber.classList.add('is-align-items-center')
            taskItem.appendChild(taskNumber)
            taskTitle = document.createElement('div')
            taskTitle.classList.add('column')
            taskTitle.classList.add('is-6')
            taskTitle.classList.add('task-title')
            taskTitle.classList.add('is-flex')
            taskTitle.classList.add('is-align-items-center')
            taskItem.appendChild(taskTitle)
            taskStatus = document.createElement('div')
            taskStatus.classList.add('column')
            taskStatus.classList.add('is-3')
            taskStatus.classList.add('task-status')
            taskStatus.classList.add('is-flex')
            taskStatus.classList.add('is-align-items-center')
            taskStatus.classList.add('is-justify-content-center')
            button = document.createElement('button')
            button.classList.add('button')
            button.classList.add('is-info')
            button.classList.add('is-outlined')
            button.classList.add('status-button')
            button.innerHTML = 'In progress'
            taskStatus.appendChild(button)
            taskItem.appendChild(taskStatus)
            taskEdit = document.createElement('div')
            taskEdit.classList.add('column')
            taskEdit.classList.add('is-1')
            taskEdit.classList.add('task-edit')
            taskEdit.classList.add('is-flex')
            taskEdit.classList.add('is-align-items-center')
            taskEdit.classList.add('is-justify-content-center')
            icon = document.createElement('i')
            icon.classList.add('fas')
            icon.classList.add('fa-edit')
            icon.classList.add('fa-2x')
            taskEdit.appendChild(icon)
            taskItem.appendChild(taskEdit)
            taskDelete = document.createElement('div')
            taskDelete.classList.add('column')
            taskDelete.classList.add('is-1')
            taskDelete.classList.add('has-text-centered')
            taskDelete.classList.add('task-delete')
            taskDelete.classList.add('is-flex')
            taskDelete.classList.add('is-align-items-center')
            taskDelete.classList.add('is-justify-content-center')
            icon = document.createElement('i')
            icon.classList.add('fas')
            icon.classList.add('fa-times-circle')
            icon.classList.add('fa-2x')
            taskDelete.appendChild(icon)
            taskItem.appendChild(taskDelete)
            return taskItem
        }
    
        function showTaskDetail(task, element) {
            if (detailIsActive == false) {
                taskDetail = document.createElement('div')
                taskDetail.classList.add('task-detail')
                taskDetail.classList.add('columns')
                taskDetail.classList.add('is-mobile')
                left = document.createElement('div')
                left.classList.add('column')
                left.classList.add('is-1')
                right = document.createElement('div')
                right.classList.add('column')
                right.classList.add('is-11')
                title = document.createElement('p')
                title.innerHTML = task.title
                right.appendChild(title)
                description = document.createElement('p')
                description.innerHTML = task.description
                right.appendChild(description)
                createdDate = document.createElement('p')
                createdDate.innerHTML = task.created_date
                right.appendChild(createdDate)
                priority = document.createElement('p')
                priority.innerHTML = task.priority
                right.appendChild(priority)
                state = document.createElement('p')
                state.innerHTML = task.complete
                right.appendChild(state)
                taskDetail.appendChild(left)
                taskDetail.appendChild(right)   
                element.after(taskDetail)
                detailIsActive = true
            }
            else {
                taskDetail.classList.add('is-hidden')
                detailIsActive = false
            }        
        }
})
    
        
