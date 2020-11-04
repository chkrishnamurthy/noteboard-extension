document.querySelector("#text").addEventListener("keyup", function(e) {
    var text = document.querySelector("#text").value;
    chrome.storage.sync.set({ "text": text });
    count();
});
var textPlace = document.querySelector("#text");

(() => {
    chrome.storage.sync.get("text", function(data) {
        textPlace.value = data.text;
        if (data.text == undefined) {
            chrome.storage.sync.remove('text');
            clearText();
        }
        textPlace.focus();
        count();
    })
})()

document.querySelector("#button").addEventListener('click', erase);
document.querySelector("#undo").addEventListener('click', undo)

function erase() {
    chrome.storage.sync.remove('text');
    let erasedData = {
        title: "Notes Removed",
        message: "Sticky Notes has been deleted...!",
    }
    notify(erasedData);
    clearText();
    count();
    // chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    //     console.log(response.farewell);
    //   });
}

function clearText() {
    textPlace.value = "";
    textPlace.placeholder = "Enter something..."
}

function count(){
    chrome.storage.sync.get("text", function(data) {
        var count = document.querySelector("#countVisible");
        if(data.text === undefined){
            count.textContent = 0;
        }else{
            if(data.text.length == 8186){
                let notifyWarning = {
                    title: "Characters are Over",
                    message: "Unable save...!",
                }
                notify(notifyWarning);
            }
            count.textContent = data.text.length;
        }  
    })
}
function notify(notifMessage) {
    var notifOptions = {
        type: "basic",
        iconUrl: 'icons/48.png',
        title: notifMessage.title,
        message: notifMessage.message,
    };
    chrome.notifications.clear("limitNotif",function(data){
        chrome.notifications.create("limitNotif", notifOptions, function() {
            console.log("Created.")
        });
    })
}