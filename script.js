document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    todoForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const newTask = todoInput.value;

        if (newTask === "") {
            alert("Please enter a task");
            return;
        }
        todoInput.value = '';

        addTask(newTask);
    });

    function addTask(task) {
        const listItem = document.createElement("li");
        const taskText = document.createElement("span");

        //checkbox
        const checkBox = document.createElement("input");

        checkBox.setAttribute("type", "checkbox");
        listItem.appendChild(checkBox);

        checkBox.addEventListener("change", function () {
            if (this.checked) {
                taskText.style.textDecoration = 'line-through';
            }
            else {
                taskText.style.textDecoration = 'none';
            }
        });

        //Adding Text
        taskText.textContent = task;
        listItem.appendChild(taskText);

        todoList.appendChild(listItem);

        //Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        listItem.appendChild(editButton);

        // Style the edit button
        editButton.style.backgroundColor = "#4CAF50";
        editButton.style.color = "white";
        editButton.style.padding = "5px 10px";
        editButton.style.border = "none";
        editButton.style.borderRadius = "4px";
        editButton.style.cursor = "pointer";
        editButton.style.marginRight = "10px";

        editButton.addEventListener('click', function () {
            const isEditing = listItem.classList.contains('editing');

            if (isEditing) {
                // Switch back to view mode
                taskText.textContent = this.previousSibling.value; // Assuming the input field is right before the edit button
                listItem.classList.remove('editing');
                editButton.textContent = 'Edit';
            } else {
                // Switch to edit mode
                const input = document.createElement('input');
                input.type = 'text';
                input.value = taskText.textContent;
                listItem.insertBefore(input, taskText);
                listItem.removeChild(taskText);
                listItem.classList.add('editing');
                editButton.textContent = 'Save';
            }
        });

        //Delete Task
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        listItem.appendChild(deleteButton);

        // Style the delete button
        deleteButton.style.backgroundColor = "#F44336";
        deleteButton.style.color = "white";
        deleteButton.style.padding = "5px 10px";
        deleteButton.style.border = "none";
        deleteButton.style.borderRadius = "4px";
        deleteButton.style.cursor = "pointer";

        deleteButton.addEventListener("click", function () {
            todoList.removeChild(listItem);
        })

        saveTaskToLocalStorage();
    }

    function saveTaskToLocalStorage() {
        const tasks = [];

        document.querySelectorAll('#todoList li').forEach(task => {
            const taskText = task.querySelector("span").textContent;
            const isCompleted = task.classList.contains("completed");
            tasks.push({ text: taskText, completed: isCompleted });
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTask(task.text);
    });
});