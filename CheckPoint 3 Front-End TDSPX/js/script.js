document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    

    // Carrega as tarefas do localStorage e exibe na tela ao carregar a página
    loadTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToList(taskText);
            saveTask(taskText);
            taskInput.value = '';
        }
    });

    deleteAllBtn.addEventListener('click', () => {
        todoList.innerHTML = '';
        localStorage.removeItem('tasks');
    });

   

    // Função para carregar e listar tarefas na tela
    function loadTasks() {
        todoList.innerHTML = ''; // Limpa a lista atual
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => addTaskToList(task));
    }

    // Função para adicionar tarefa na lista
    function addTaskToList(taskText) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn">Excluir</button>
        `;
        todoList.appendChild(li);

        // Adiciona o evento de clique ao botão de excluir
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove(); // Remove o item da lista (DOM)
            deleteTask(taskText); // Remove o item do localStorage
        });
    }

    // Função para salvar tarefa no localStorage
    function saveTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Função para deletar tarefa do localStorage
    function deleteTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
