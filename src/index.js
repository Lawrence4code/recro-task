// ****************************************** Servers Functionality ****************************************** //

// system start with one initial server
const servers = [{ name: 'Server One' }];
// list for server numbers
const serverNumbers = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
];

const serverRoot = document.getElementById('servers');

// function to create server element and set html
const createServerElement = (serverObj) => {
  const serverName = document.createElement('p');
  serverName.className = 'serverName';
  serverRoot.appendChild(serverName);
  serverName.innerHTML = `${serverObj.name}`;
};

createServerElement(servers[0]);

const addServerButton = document.getElementsByClassName('addServer')[0];
addServerButton.addEventListener('click', () => {
  if (servers.length <= 9) {
    const newServerObj = { name: `Server ${serverNumbers[servers.length]}` };
    // create new server above and push to server list
    servers.push(newServerObj);
    // add the new server node to the rootServer
    createServerElement(newServerObj);
    // statements for unabling and disabling add and remove server button
    servers.length > 9 && (addServerButton.disabled = true);
    if (servers.length > 1) {
      removeServerButton.disabled = false;
    }
  }
});

// initially remove server is disable, one server initial and will exists thoughout system
const removeServerButton = document.getElementsByClassName('removeServer')[0];
removeServerButton.disabled = true;

// reusable function for remove servers
const removeServerEvent = () => {
  if (servers.length > 1) {
    // if server has more than one server remove the least priority server from bottom
    servers.pop();
    // remove all child of serverRoot and then populate all remaining servers
    while (serverRoot.firstChild) {
      serverRoot.removeChild(serverRoot.firstChild);
    }
    for (let server of servers) {
      createServerElement(server);
    }

    // statements for unabling and disabling add and remove server button
    if (servers.length > 1) {
      removeServerButton.disabled = false;
      addServerButton.disabled = false;
    } else {
      removeServerButton.disabled = true;
    }
  } else {
    removeServerButton.disabled = true;
  }
};

// add event to remove button
removeServerButton.addEventListener('click', removeServerEvent);

// remove server every 5 seconds if server is not in use
setInterval(() => {
  removeServerEvent();
}, 5000);

// ****************************************** Tasks Functionality ****************************************** //

let tasks = [];
let [currentTask, ...waitingTasks] = tasks;

const addTaskButton = document.getElementsByClassName('addTask')[0];
const tasksRoot = document.getElementById('tasks');

var waitingTasksList = [];

// add event listen to add task button
addTaskButton.addEventListener('click', () => {
  const newTaskObj = {
    id: tasks.length + 1,
    status: 'waiting',
  };
  // create a push a new task
  tasks.push(newTaskObj);
  let [currentTask, ...waitingTasks] = tasks;
  waitingTasksList = waitingTasks;

  startProcessingTask(currentTask, waitingTasks);
});

const createTaskNode = () => {};

// function to create server element and set html
const createTaskElement = (taskObj) => {
  const task = document.createElement('div');
  const taskId = document.createElement('p');
  const deleteButton = document.createElement('button');
  taskId.className = 'taskName';
  task.className = 'task';
  deleteButton.innerText = 'Delete';

  tasksRoot.appendChild(task);
  // first task start processing immediately and tasks which are currently worked on, therefore should not be able to delete
  if (taskObj.id === 1 || taskObj.status === 'processing') {
    task.innerHTML = `<div class="taskBar"> <p> Task ${taskObj.id} - ${taskObj.status} </p></div>`;
  } else {
    task.innerHTML = `<div class="taskBar"> <p> Task ${taskObj.id} - ${taskObj.status} </p> <button data-taskId=${taskObj.id} class="taskDeleteButton"> Delete</button></div>`;
  }

  task.dataset.taskId = `${taskObj.id}`;
};

const deleteButtons = document.getElementsByClassName('taskDeleteButton');

// delete task function
const deleteTaskFunction = (e) => {
  while (tasksRoot.firstChild) {
    tasksRoot.removeChild(tasksRoot.firstChild);
  }
  const taskIdToBeDelete = e.target.dataset.taskid;
  let [currentTask, ...waitingTasks] = tasks.filter((task) => {
    return task.id !== Number(taskIdToBeDelete);
  });
  // createWaitingTaskElements(tasks);
  startProcessingTask(currentTask, waitingTasks);
};

const createWaitingTaskElements = (waitingTasks) => {
  if (waitingTasks) {
    for (let task of waitingTasks) {
      createTaskElement(task);
    }
  }
};

// start processing task in ascending order
const startProcessingTask = (currentTask, waitingTasks) => {
  while (tasksRoot.firstChild) {
    tasksRoot.removeChild(tasksRoot.firstChild);
  }
  // the current task state to processing
  currentTask.status = 'processing';
  if (currentTask) {
    createTaskElement(currentTask);
    createWaitingTaskElements(waitingTasks);
    setTimeout(() => {
      tasks = [...waitingTasks];
      if (tasks.length >= 1) {
        let [currentTask, ...waitingTasks] = tasks;
        startProcessingTask(currentTask, waitingTasks);
      } else {
        while (tasksRoot.firstChild) {
          tasksRoot.removeChild(tasksRoot.firstChild);
        }
      }
    }, 20000);
  }

  for (let button of deleteButtons) {
    button.addEventListener('click', deleteTaskFunction);
  }
};
