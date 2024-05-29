function assistant_widget(assistant_id) {
    const currentURL = window.location.hostname;
    if (document.cookie.includes(`assistant_widget=${currentURL}`)) {
        createAndAppendWidget(assistant_id);
    } else {
        fetch(`https://brainfab-assistant.bubbleapps.io/version=5pml/api/1.1/wf/widget_validator?assistant_id=${assistant_id}&url=${encodeURIComponent(currentURL)}`)
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
    newElement.innerHTML = `<style>#chat-widget{font-family:Verdana,Arial,Helvetica,sans-serif;background-color:#1a56db;position:fixed;bottom:20px;right:20px;width:60px;height:60px;padding:10px;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;text-align:center;font-size:13px}#chat-container{background-color:#fff;display:none;position:fixed;bottom:110px;right:20px;width:300px;height:600px;border:1px solid #ccc;border-radius:8px;overflow:hidden;padding:5px}#iframe-container{width:100%;height:100%}@media (max-width:765px){#chat-widget{padding:50px}}</style><body><div id="chat-widget" onclick="toggleChat()"><span>Brainfab Assistant</span></div><div id="chat-container"><div id="iframe-container"><iframe style="border:0px;height:100%" src="https://assistant.brainfab.com/version=5pml/widget-chat/${encodeURIComponent(assistant_id)}"></iframe></div></div>`;
    document.body.appendChild(newElement);
}

function toggleChat() {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.style.display = (chatContainer.style.display === "none" || chatContainer.style.display === "") ? "block" : "none";
}
