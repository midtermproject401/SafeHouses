const bookConnection = require("socket.io-client");

let host = "http://localhost:5000/booking";

const socket = bookConnection.connect(`${host}`); // to connect to /namespace

socket.on("newBook", (payload) => {
  let clientMsg = {
    messageBody: `The booking number ${payload.id} by ${payload.FirstName} was checked using  ${payload.paymentMethod}`,
  };
  socket.emit("booked", payload);
  socket.emit("clientMsg", { message: clientMsg, payload: payload });
});

////////////////////////Dashboard//////////////////////////////////////////
socket.emit('getall',{type:"client"})

socket.on('client',payload=>{
  console.log(payload.mssege)
  socket.emit('received',{id:payload.messageId});

})