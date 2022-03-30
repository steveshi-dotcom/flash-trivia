import socketIOClient from "socket.io-client";

//const socket = socketIOClient(`https://flash-trivia-v1-server.herokuapp.com/`, {secure: false});
const socket = socketIOClient(`localhost:4001`, {secure: false});

// Export socket as default to make socket available globally
export default socket;