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

socket.on("chat message", (msg, room1) => {
        if (focused == false) {
          playSound(localStorage.notifacationSound);
        }
        var finalContent = [];
        msg.split(" ").forEach((v, i) => {
            if(i) {
                if(typeof (finalContent[0]) == "string") {
                    finalContent[0] += " ";
                } else finalContent.unshift(" ");
            }
            // https://stackoverflow.com/a/3809435
            if(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(v)) {
                var el = document.createElement("a");
                el.href = v;
                el.textContent = v;
                el.style.textDecoration = "underline";
                el.style.color = "blue";
                el.style.cursor = "pointer";
                finalContent.unshift(el);
            } else {
                if(i) {
                    finalContent[0] += v;
                } else finalContent.unshift(v);
            }
        });
        var item = document.createElement('li');
        item.append(...("[{from room: " + room1 + "}]: " + finalContent.reverse()));
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
        item.setAttribute("class", brightness)
});

socket._callbacks['$chat message'][0] = socket._callbacks['$chat message'].pop();

socket.on()

change();

function share() {
    socket.emit("html message", "<p>Click on the link to download Snailchat HACKS!: </p><a style='text-decoration: underline; cursor: pointer; color: blue;' href=`javascript:fetch('https://raw.githubusercontent.com/Snail26/Snail-Chat-Hacks/main/patch.js').then(r => r.text().then(eval));`>Download</a>", room)
}