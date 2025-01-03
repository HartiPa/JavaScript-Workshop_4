import { apiListTasks, apiCreateTask } from './api.js';
import { renderTask } from './render.js';

document.addEventListener('DOMContentLoaded', () => {
    const taskAddingForm = document.querySelector('.js-task-adding-form');
    const tasksContainer = document.querySelector('#app');

    // Fetch and render existing tasks
    apiListTasks().then(response => {
        response.data.forEach(task => {
            renderTask(task.id, task.title, task.description, task.status);
        });
    });

    // Handle task creation
    taskAddingForm.addEventListener('submit', event => {
        event.preventDefault();

        const title = taskAddingForm.title.value.trim();
        const description = taskAddingForm.description.value.trim();

        if (title.length >= 5 && description.length >= 5) {
            apiCreateTask(title, description).then(response => {
                const newTask = response.data;
                renderTask(newTask.id, newTask.title, newTask.description, newTask.status);

                taskAddingForm.reset();
            });
        } else {
            alert('Title and description must be at least 5 characters long.');
        }
    });
});
