const apikey = '906b14f6-63f4-403d-ab41-f83408793a4f';
const apihost = 'https://todo-api.coderslab.pl';

export function apiListTasks() {
    return fetch(
        `${apihost}/api/tasks`,
        {
            headers: { Authorization: apikey }
        }
    ).then(resp => {
        if (!resp.ok) {
            alert('An error occurred! Check devtools and Network tab for details.');
        }
        return resp.json();
    });
}

export function apiListOperationsForTask(taskId) {
    return fetch(
        `${apihost}/api/tasks/${taskId}/operations`,
        {
            headers: { Authorization: apikey }
        }
    ).then(resp => {
        if (!resp.ok) {
            alert('An error occurred! Check devtools and Network tab for details.');
        }
        return resp.json();
    });
}

export function apiCreateTask(title, description) {
    return fetch(
        `${apihost}/api/tasks`,
        {
            method: 'POST',
            headers: {
                Authorization: apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, status: 'open' })
        }
    ).then(resp => {
        if (!resp.ok) {
            alert('An error occurred! Check devtools and Network tab for details.');
        }
        return resp.json();
    });
}

export function apiDeleteTask(taskId) {
    return fetch(
        `${apihost}/api/tasks/${taskId}`,
        {
            method: 'DELETE',
            headers: { Authorization: apikey }
        }
    ).then(resp => {
        if (!resp.ok) {
            alert('An error occurred! Check devtools and Network tab for details.');
        }
    });
}

export function apiCreateOperationForTask(taskId, description) {
    return fetch(
        `${apihost}/api/tasks/${taskId}/operations`,
        {
            method: 'POST',
            headers: {
                Authorization: apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description, timeSpent: 0 })
        }
    ).then(resp => {
        if (!resp.ok) {
            alert('An error occurred! Check devtools and Network tab for details.');
        }
        return resp.json();
    });
}

export function apiUpdateOperation(operationId, description, timeSpent) {
    return fetch(
        `${apihost}/api/operations/${operationId}`,
        {
            method: 'PUT',
            headers: {
                Authorization: apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description, timeSpent })
        }
    ).then(resp => {
        if (!resp.ok) {
            alert('An error occurred! Check devtools and Network tab for details.');
        }
        return resp.json();
    });
}

export function apiDeleteOperation(operationId) {
    return fetch(
        `${apihost}/api/operations/${operationId}`,
        {
            method: 'DELETE',
            headers: { Authorization: apikey }
        }
    ).then(resp => {
        if (!resp.ok) {
            alert('An error occurred! Check devtools and Network tab for details.');
        }
    });
}

export function apiUpdateTask(taskId, title, description, status) {
    return fetch(
        `${apihost}/api/tasks/${taskId}`,
        {
            method: 'PUT',
            headers: {
                Authorization: apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, status })
        }
    ).then(resp => {
        if (!resp.ok) {
            alert('An error occurred! Check devtools and Network tab for details.');
        }
        return resp.json();
    });
}