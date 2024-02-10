const snail = {
    showName: confirm("Would you like your name shown to others?"),
    nameChange: true,
    seeAll: true
};

change();

function change() {
    console.log("SnailRefresh Executed");
    socket.emit("getNames");
}

socket.on('getNames', () => {
    if (snail.showName === true) {
        socket.emit("sendNames", name, room);
    }
    online = [];
});
socket._callbacks["$getNames"][0] = socket._callbacks.$getNames.pop();

socket.emit("getNames");

socket.on('chat message', socket._callbacks["$chat message"].toString().replace("if(room1 == room)", "if(room1)").replace("...(finalContent.reverse())", "...(room1 + finalContent.reverse())"));

change();