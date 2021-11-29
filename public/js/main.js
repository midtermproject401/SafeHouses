const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const rent = document.getElementById('rent');



const { username, Advname } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

rent.addEventListener('click', (e) => {
  e.preventDefault();

 if (username.includes("(owner)"))
 {
  let msg1 ='plese check the House details and payment method in the below link';
   let msg2 =`https://safe-housy.herokuapp.com/rent/${Advname}`;
  msg1 = msg1.trim();
   if (!msg1) {
    return false;
  }
  msg2 = msg2.trim();
  if (!msg2) {
   return false;
 }
  // Emit message to server
  socket.emit('chatMessage', msg1);
  socket.emit('chatMessage', msg2);
  // Clear input
  e.target.elements.msg1.value = '';
  e.target.elements.msg1.focus();
  e.target.elements.msg2.value = '';
  e.target.elements.msg2.focus();
}
else {
  alert("You Can't rent the house until agreement from the owner:) ")
}
}

);
const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, Advname });

// Get room and users
socket.on('roomUsers', ({ Advname, users }) => {
  outputRoomName(Advname);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(Advname) {
  roomName.innerText = Advname;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = 'http://localhost:3000';
  } else {
  }
});
