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
