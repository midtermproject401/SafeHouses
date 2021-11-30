"use strict";
const { hotel } = require("./src/models/index");

const bookConnection = require("socket.io-client");

let host = "http://localhost:5000/booking";

const socket = bookConnection.connect(`${host}`);

socket.emit('getall')

socket.on("check-availability", async (payload) => {
  let newBooking = await hotel.get(payload.msg.hotelid);

  const hotelMsgs = {
    messageBody: `${newBooking.hotelName} : Hello ms/mr ${payload.booking.LastName} : we recieved your request ${payload.booking.id} and we will check the availability for ${payload.msg.accommodationType} and verify the payment method : ${payload.booking.paymentMethod}`,
  };

  socket.emit("availableRoom", payload);
  socket.emit("hotelMsgs", { message: hotelMsgs, payload: payload });
});

socket.on("check-verify", async (payload) => {
  let newBooking = await hotel.get(payload.msg.hotelid);

  const verfiyingMsg = {
    messageBody: ` ${newBooking.hotelName}: ms/mr ${payload.booking.LastName} your booking went successfully , your checking in date starts ${payload.booking.checkInDate} and ends ${payload.booking.checkoutDate} `,
  };
  socket.emit("verifyBooking", {payload:payload,hotel:newBooking});

  socket.emit("verifyMsgs", {
    message: verfiyingMsg,
    payload: payload,
  });
});
///////////////////////////////////////////////Dashboard//////////////////////////////////////////////
socket.on('hotel',payload=>{
    console.log(payload.mssege)
    socket.emit('received',{id:payload.messageId});
})
