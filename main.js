// main.js - Inicializace aplikace a obsluha uživatelských akcí
import { apiListTasks, apiCreateTask } from './api.js';
import { renderTask } from './render.js';

document.addEventListener('DOMContentLoaded', function () {
    // Load and render tasks when the page loads
    apiListTasks().then(response => {
        response.data.forEach(task => {
            renderTask(task.id, task.title, task.description, task.status);
        });
    });

    // Handle new task submission
    const taskForm = document.querySelector('#task-form');
    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.querySelector('#task-title').value;
        const description = document.querySelector('#task-desc').value;

        apiCreateTask(title, description).then(response => {
            const newTask = response.data;
            renderTask(newTask.id, newTask.title, newTask.description, newTask.status);

            // Clear the form inputs
            document.querySelector('#task-title').value = '';
            document.querySelector('#task-desc').value = '';
        });
    });
});
