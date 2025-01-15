let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();

    if (taskName) {
        const task = {
            id: Date.now(),
            name: taskName,
            completed: false,
        };
        tasks.push(task);
        taskInput.value = '';
        renderTasks();
    }
}

function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

function editTask(taskId) {
    const newTaskName = prompt("Edit Task:");
    if (newTaskName) {
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, name: newTaskName };
            }
            return task;
        });
        renderTasks();
    }
}

function renderTasks() {
    const pendingTasks = document.getElementById('pendingTasks');
    const completedTasks = document.getElementById('completedTasks');

    pendingTasks.innerHTML = '';
    completedTasks.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.name;
        taskItem.classList.toggle('completed', task.completed);

        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const completeButton = document.createElement('button');
        completeButton.className = 'complete';
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.onclick = () => toggleTaskCompletion(task.id);
        taskActions.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(task.id);
        taskActions.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);
        taskActions.appendChild(deleteButton);

        taskItem.appendChild(taskActions);

        if (task.completed) {
            completedTasks.appendChild(taskItem);
        } else {
            pendingTasks.appendChild(taskItem);
        }
    });
}
