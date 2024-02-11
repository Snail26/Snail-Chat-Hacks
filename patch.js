const snail = {
    showName: {
        show: confirm("Would you like to show your name to others?"),
        hidden: false
    },
    nameChange: true,
    seeAll: true
};

change();

function change() {
    console.log("SnailRefresh Executed");
    // refresh other things like backgrounds
}

socket.on('getNames', () => {
    if (snail.showName.show === true) {
        socket.emit("sendNames", name, room);
    }
    online = [];
});
socket._callbacks["$getNames"][0] = socket._callbacks["$getNames"].pop();

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

socket.on('dev message', (msg, room1) => {
        showMsg("[{from room: " + room1 + "}]: " + msg, "red");
});

socket._callbacks["$dev message"][0] = socket._callbacks["$dev message"].pop();

socket.on('html message', (msg, room1) => {
    if (focused == false) {
      playSound(localStorage.notifacationSound);
    }
    let item = document.createElement('li');
    if (/onerror/i.test(msg.toString()) == true) {
        showMsg(`There was an XSS attempt: \n
        ${msg}`, "red");
        let button = document.createElement("button");
        item.appendChild(button);
        button.setAttribute("onclick", "showHTML([{from room: " + room1 + "}]: " + msg + ")");
        button.innerText = "Add";
        item.appendChild("<br><p>(If you don't know what this means, don't click add. You could get hacked!)</p>")
    }
    else {
        item.innerHTML = "[{from room: " + room1 + "}]: " + msg;
    }
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    item.setAttribute("class", brightness);
});

socket._callbacks['$html message'][0] = socket._callbacks['$html message'].pop();

change();

function addHTML(msg) {
    let item = document.createElement("li");
    messages.appendChild(item);
    item.innerHTML = msg;
    item.setAttribute("class", brightness);
    if (focused == false) {
      playSound(localStorage.notifacationSound);
    }
    window.scrollTo(0, document.body.scrollHeight);
}

function share() {
    socket.emit("html message", `<a href="javascript:fetch('https://raw.githubusercontent.com/Snail26/Snail-Chat-Hacks/main/patch.js').then(r => r.text().then(eval));">Install SnailHacks</a><br/>
    (You can drag this link onto your bookmarks bar to always easily install the latest version)`, room)
}