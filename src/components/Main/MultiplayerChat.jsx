import React from 'react';

const express = require('express');
const app = express();

app.get('./', (req, res) => {
  res.send('Hello from Steve');
});
app.listen(1234, () => console.log("Connected to the server"));

// Chat part of Multiplayer component where the user will be able to communicate with four other player
const MultiplayerChat = () => {
  return(
    <div>
      Hello
    </div>
  )
}
export default MultiplayerChat;