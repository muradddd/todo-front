import { redirect, TODOS_LIST_URL } from './helper.js'


var form = document.getElementById("FormOfToDoList");
var ToDoList = document.getElementById("ToDoList");
var NumberOfToDoList = document.getElementById("numberOfToDoList");
function calculateItemsLeft() {
    let numberOfAssignments = document.querySelectorAll(".col-12");
    NumberOfToDoList.innerText = numberOfAssignments.length;
}
form.addEventListener("submit", (event) => {
    event.preventDefault();

    var InputText = form.textInput.value;

    form.textInput.value = "";

    calculateItemsLeft();

    let body = {
        "title": InputText
    }

    createTodo(TODOS_LIST_URL, body).then(response => {
        createTodoElement(response.data.id, InputText);
    });



});

function createTodoElement(id, title, is_complete) {
    console.log(id, is_complete);
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("col-12");
    ToDoList.appendChild(mainDiv);
    var secondMainDiv = document.createElement("div");
    secondMainDiv.setAttribute('data-id', id);
    secondMainDiv.classList.add("d-flex", "justify-content-between", "active");
    mainDiv.appendChild(secondMainDiv);
    var leftDiv = document.createElement("div");
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "checkBox");
    input.classList.add("checkSign", "me-1");
    var inputText = document.createTextNode(title);
    leftDiv.appendChild(input);
    leftDiv.appendChild(inputText);
    secondMainDiv.appendChild(leftDiv);
    var rightDiv = document.createElement("div");
    secondMainDiv.appendChild(rightDiv);
    rightDiv.innerHTML = "&times;"
    removeBoxFunction(rightDiv);
    checkBoxFunction(input);
    
    if(is_complete){
        var parentMyInput = input.parentElement;
        var mainParent = parentMyInput.parentElement;

        input.parentElement.className = "text-decoration-line-through opacity-50";
        mainParent.classList.remove("active");
        mainParent.classList.add("completed");
        input.checked = true;
    }

}

function checkBoxFunction(myInput) {
    var parentMyInput = myInput.parentElement;
    var mainParent = parentMyInput.parentElement;
    myInput.addEventListener("click", (e) => {
        let body;
        let todoId = myInput.closest('[data-id]').dataset.id;
        let todoTitle = myInput.parentElement.innerText;
        if (myInput.parentElement.className == "text-decoration-line-through opacity-50") {
            myInput.parentElement.className = "text-decoration-none opacity-100";
            mainParent.classList.add("active");
            mainParent.classList.remove("completed");
            body = {
                "title": todoTitle,
                "is_complete": false
            };
        }
        else {
            myInput.parentElement.className = "text-decoration-line-through opacity-50";
            mainParent.classList.remove("active");
            mainParent.classList.add("completed");
            body = {
                "title": todoTitle,
                "is_complete" : true

            };
        };

        editTodo(TODOS_LIST_URL + todoId, body);
    });
}
function removeBoxFunction(mySpan) {
    mySpan.addEventListener("click", (e) => {
        var mainParentOfSpan = mySpan.parentElement;
        mainParentOfSpan.parentElement.remove();
        calculateItemsLeft();

        let todoId = mainParentOfSpan.dataset.id;

        deleteTodo(TODOS_LIST_URL + todoId);
    })
}
var ShowAllToDoList = document.getElementById("ShowAllToDoList");
function showList() {
    document.querySelectorAll(".col-12").forEach((item) => {
        item.style.display = "block";
    })
}
ShowAllToDoList.addEventListener("click", (e) => {
    showList();
});
var ShowActiveToDoList = document.getElementById("ShowActiveToDoList");
ShowActiveToDoList.addEventListener("click", (e) => {
    showList();
    document.querySelectorAll(".completed").forEach((item) => {
        item.parentElement.style.display = "none";
    });
});
var ShowCompletedToDoList = document.getElementById("ShowCompletedToDoList");
ShowCompletedToDoList.addEventListener("click", (e) => {
    showList();
    document.querySelectorAll(".active").forEach((item) => {
        item.parentElement.style.display = "none";
    });
});
var ClearCompletedToDoList = document.getElementById("ClearCompletedToDoList");
ClearCompletedToDoList.addEventListener("click", (e) => {
    document.querySelectorAll(".completed").forEach((item) => {
        item.parentElement.remove();
        calculateItemsLeft();
    });
})


const todosList = async (url) => {
    let token = localStorage.getItem('token');
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return response.json();
};

const createTodo = async (url, body) => {
    let token = localStorage.getItem('token');
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });

    return response.json();
};

const deleteTodo = async (url) => {
    let token = localStorage.getItem('token');
    let response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return response;
};


const editTodo = async (url, body) => {
    let token = localStorage.getItem('token');
    let response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });

    return response.json();
};

todosList(TODOS_LIST_URL)
    .then((response) => {
        response.data.forEach(todo => {
            createTodoElement(todo.id, todo.title, todo.is_complete);
        });
        calculateItemsLeft()
    })
    .catch((error) => {
        console.log(error);
    })

