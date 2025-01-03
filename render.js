import { apiListOperationsForTask, apiDeleteTask, apiCreateOperationForTask, apiUpdateOperation, apiDeleteOperation, apiUpdateTask } from './api.js';

export function renderTask(taskId, title, description, status) {
    const section = document.createElement('section');
    section.className = 'card mt-5 shadow-sm';
    document.querySelector('main').appendChild(section);

    const headerDiv = document.createElement('div');
    headerDiv.className = 'card-header d-flex justify-content-between align-items-center';
    section.appendChild(headerDiv);

    const headerLeftDiv = document.createElement('div');
    headerDiv.appendChild(headerLeftDiv);

    const h5 = document.createElement('h5');
    h5.innerText = title;
    headerLeftDiv.appendChild(h5);

    const h6 = document.createElement('h6');
    h6.className = 'card-subtitle text-muted';
    h6.innerText = description;
    headerLeftDiv.appendChild(h6);

    const headerRightDiv = document.createElement('div');
    headerDiv.appendChild(headerRightDiv);

    if (status === 'open') {
        const finishButton = document.createElement('button');
        finishButton.className = 'btn btn-dark btn-sm js-task-open-only';
        finishButton.innerText = 'Finish';
        finishButton.addEventListener('click', function () {
            apiUpdateTask(taskId, title, description, 'closed').then(() => {
                section.querySelectorAll('.js-task-open-only').forEach(element => element.remove());
            });
        });
        headerRightDiv.appendChild(finishButton);
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-outline-danger btn-sm ml-2';
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function () {
        apiDeleteTask(taskId).then(() => {
            section.remove();
        });
    });
    headerRightDiv.appendChild(deleteButton);

    const ul = document.createElement('ul');
    ul.className = 'list-group list-group-flush';
    section.appendChild(ul);

    apiListOperationsForTask(taskId).then(response => {
        response.data.forEach(operation => {
            renderOperation(ul, status, operation.id, operation.description, operation.timeSpent);
        });
    });

    if (status === 'open') {
        const form = document.createElement('form');
        form.className = 'd-flex mt-2 js-task-open-only';
        section.appendChild(form);

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'New operation description';
        input.className = 'form-control';
        input.required = true;
        form.appendChild(input);

        const button = document.createElement('button');
        button.type = 'submit';
        button.className = 'btn btn-primary ml-2';
        button.innerText = 'Add';
        form.appendChild(button);

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const description = input.value.trim();
            if (description) {
                apiCreateOperationForTask(taskId, description).then(response => {
                    const newOperation = response.data;
                    renderOperation(ul, status, newOperation.id, newOperation.description, newOperation.timeSpent);
                    form.reset();
                });
            }
        });
    }
}

export function renderOperation(operationsList, status, operationId, operationDescription, timeSpent) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    operationsList.appendChild(li);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.innerText = operationDescription;
    li.appendChild(descriptionDiv);

    const time = document.createElement('span');
    time.className = 'badge badge-success badge-pill ml-2';
    time.innerText = formatTime(timeSpent);
    descriptionDiv.appendChild(time);

    if (status === 'open') {
        const addButton = document.createElement('button');
        addButton.className = 'btn btn-outline-success btn-sm js-task-open-only';
        addButton.innerText = '+15m';
        li.appendChild(addButton);

        const hourButton = document.createElement('button');
        hourButton.className = 'btn btn-outline-success btn-sm ml-2 js-task-open-only';
        hourButton.innerText = '+1h';
        li.appendChild(hourButton);

        addButton.addEventListener('click', function () {
            const newTimeSpent = timeSpent + 15;
            apiUpdateOperation(operationId, operationDescription, newTimeSpent).then(() => {
                timeSpent = newTimeSpent;
                time.innerText = formatTime(timeSpent);
            });
        });

        hourButton.addEventListener('click', function () {
            const newTimeSpent = timeSpent + 60;
            apiUpdateOperation(operationId, operationDescription, newTimeSpent).then(() => {
                timeSpent = newTimeSpent;
                time.innerText = formatTime(timeSpent);
            });
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-outline-danger btn-sm ml-2 js-task-open-only';
        deleteButton.innerText = 'Delete';
        li.appendChild(deleteButton);

        deleteButton.addEventListener('click', function () {
            apiDeleteOperation(operationId).then(() => {
                li.remove();
            });
        });
    }
}

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}