/////////////////////////// booking part ///////////////////////////////
const port = 5000;
const io = require("socket.io")(port);
const uuid = require("uuid").v4;

const bookRoom = io.of("/booking");

bookRoom.on("connection", (socket) => {
  console.log("connected to cap name-space", socket.id);

  ///////////////////////// msqQueues//////////////////////////////////////////
  const msgQueue = {
    client: {},
    hotels: {},
  };
  socket.on("clientMsg", (payload) => {
    const id = uuid();
    msgQueue.hotels[id] = payload.message;
    bookRoom.emit("hotel", { messageId: id, mssege: msgQueue.hotels[id] });
    // console.log("========================= message to hotel");
    // console.log(msgQueue);
    // console.log("========================= message to hotel");
  });


  socket.on("hotelMsgs", (payload) => {
    const id = uuid();
    msgQueue.client[id] = payload.message;
    bookRoom.emit("client", { messageId: id, mssege: msgQueue.client[id] });
  });
  // console.log("========================= message to client");

  // console.log(msgQueue);
  // console.log("========================= message to client");

  socket.on("verifyMsgs", (payload) => {
    const id = uuid();
    msgQueue.client[id] = payload.message;
    bookRoom.emit("client", { messageId: id, mssege: msgQueue.client[id] });
  });
  // console.log("========================= message to client");

  // console.log(msgQueue);
  // console.log("========================= message to client");

  //////////////////////////// DELETE MSQ /////////////////////////////////////////

  socket.on("received", (payload) => {
    console.log(msgQueue);
    delete msgQueue.client[payload.id];
    delete msgQueue.hotels[payload.id];
  });

  ///////////////////////Dashboard/////////////////////////////////////////////

  socket.on("book-detect", (payload) => {
    bookRoom.emit("newBook", payload.msg);
  });

  socket.on("booked", (payload) => {
    console.log("==================================");
    console.log("Custmor Data", payload);
    console.log("==================================");
  });

  // console.log("========================= message to hotel");
  // console.log(msgQueue.hotels);
  // console.log("========================= message to hotel");


  socket.on("respond-detect", (payload) => {
    bookRoom.emit("check-availability", payload);
  });
  socket.on("availableRoom", (payload) => {
    console.log("==================================");
    console.log("Room Data", payload);
    console.log("==================================");
    socket.emit("check-verify", payload);
  });
 

  socket.on("verifyBooking", (payload) => {
    console.log("==================================");
    console.log("Hotel Data", payload.hotel);
    console.log("==================================");
  });

  socket.on("getall", () => {
    console.log("getall");
    // console.log(msgQueue);

    Object.keys(msgQueue.hotels).forEach((id) => {
      socket.emit("hotel", { messageId: id, mssege: msgQueue.hotels[id] });
    });
    Object.keys(msgQueue.client).forEach((id) => {
      socket.emit("client", { messageId: id, mssege: msgQueue.client[id] });
    });
  });
});

////////////////////////////////////////////////////////////////////////
