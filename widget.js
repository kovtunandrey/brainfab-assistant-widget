function assistant_widget(assistant_id) {
    const currentURL = window.location.hostname;
    if (document.cookie.includes(`assistant_widget=${currentURL}`)) {
        createAndAppendWidget(assistant_id);
    } else {
        fetch(`https://brainfab-assistant.bubbleapps.io/api/1.1/wf/widget_validator?assistant_id=${assistant_id}&url=${encodeURIComponent(currentURL)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Access to the widget is denied: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                if (data.response.validate === true) {
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 1);
                    document.cookie = `assistant_widget=${currentURL}; expires=${expirationDate.toUTCString()}; path=/`;
                    createAndAppendWidget(assistant_id);
                } else {
                    console.error("Access to the widget is denied: validation failed.");
                }
            })
            .catch(error => {
                console.error(error.message);
            });
    }
}

function createAndAppendWidget(assistant_id) {
    const newElement = document.createElement('div');
    newElement.innerHTML = `<style>
#chat-widget {
    font-family: Verdana, Arial, Helvetica, sans-serif;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 100px;
    height: 100px;
    cursor: pointer;
    text-align: center;
    font-size: 13px;
    z-index: 10000;
    background-image: url('https://be1338c21a36dfb47a79e72d7caa09ce.cdn.bubble.io/f1720523944703x543528083910456600/svgviewer-output.svg');
    background-size: 95%; 
    background-position: center;
    background-repeat: no-repeat;
}
#chat-container {
    background-color: #fff;
    display: none;
    position: fixed;
    bottom: 125px;
    right: 20px;
    width: 400px;
    height: 600px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    padding: 5px;
    z-index: 10000;
}
#iframe-container {
    width: 100%;
    height: 100%;
}
#close-chat {
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 30px;
    line-height: 30px;
    text-align: center;
    color: #000;
    background-color: #fff;
    border-radius: 50%;
    z-index: 10001;
}
@media (max-width: 765px) {
    #chat-widget {
        width: 65px;
        height: 65px; 
        background-size: 90%;
    }
    #chat-container {
        bottom: 0;  
        right: 0;
        left: 0;
        top:0;
        width: 100%;
        height: calc(100%);
        border-radius: 0;
        border: 0 px solid #ccc;
        z-index: 10001;
    }
    #close-chat {
        display: block;
    }
}
</style>
<body>
    <div id="chat-widget" onclick="toggleChat()"></div>
    <div id="chat-container">
        <div id="close-chat" onclick="toggleChat()">×</div>
        <div id="iframe-container">
            <iframe style="border:0px; width: 100%; height:100%" src="https://assistant.brainfab.com/widget-chat/${encodeURIComponent(assistant_id)}"></iframe>
        </div>
    </div>
</body>`;
    document.body.appendChild(newElement);
}

function toggleChat() {
    const chatContainer = document.getElementById("chat-container");
    const body = document.body;
    const html = document.documentElement;
    if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
        chatContainer.style.display = "block";
        body.style.overflow = "hidden";
        html.style.overflow = "hidden";
    } else {
        chatContainer.style.display = "none";
        body.style.overflow = "auto";
        html.style.overflow = "auto";
    }
}
