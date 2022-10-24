const socket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

/* global socket handler
- 서버에서 보내는 event 를 클라이언트에서 받아주는 메소드
*/
socket.on('user_connected', (username) => {
  console.log(`${username} connected`);
});

socket.on('new_chat', ({ chat, username }) => {
  drawNewChat(`${username}: ${chat}`);
});

/* sever event 끝 */

// * message 를 server 로 전송
const handleSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    drawNewChat(`me: ${inputValue}`);
    event.target.elements[0].value = '';
  }

  console.log('hello world');
};

//* draw functions
const drawHelloStranger = (username) => {
  helloStrangerElement.innerText = `Hello ${username} Stranger :)`;
};

const drawNewChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `
    <div>
    ${message}
    </div>
    `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => drawHelloStranger(data));
}

function init() {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
}

init();
