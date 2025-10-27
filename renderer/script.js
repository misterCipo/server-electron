const statusEl = document.querySelector('#status span');
const messagesEl = document.getElementById('messages');
const inputEl = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', () => {
  statusEl.textContent = 'Connesso';
  statusEl.className = 'connected';
});

socket.addEventListener('message', (event) => {
  const li = document.createElement('li');
  li.textContent = event.data;
  messagesEl.appendChild(li);
});

socket.addEventListener('close', () => {
  statusEl.textContent = 'Disconnesso';
  statusEl.className = 'disconnected';
});

sendBtn.addEventListener('click', () => {
  const message = inputEl.value;
  if (message && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
    inputEl.value = '';
  }
});
