
$( document ).ready(function() {
    const Storage = chrome.storage.sync;
    const Notification = chrome.notifications;

    
    const textPlace = $("#notes")[0];

    $("#notes").keyup(function(e) {
        const text = $("#notes").val();
        Storage.set({ "text": text });
        count();
    });
    
    
    (() => {
        Storage.get("text", function(data) {
            textPlace.value = data.text;
            if (data.text == undefined) {
                Storage.remove('text');
                clearText();
            }
            textPlace.focus();
            count();
        })
    })()
    
     const erase = ()=>{
        Storage.remove('text');
        let erasedData = {
            title: "Notes Removed",
            message: "Sticky Notes has been deleted...!",
        }
        notify(erasedData);
        clearText();
        count();
     }
     const clearText = () =>{  textPlace.value = "";textPlace.placeholder = "Enter something..."}
    
    
    const count= () =>{
        Storage.get("text", function(data) {
           const count =  $("#countVisible")[0];
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


    const notify = (notifMessage)=>{
        const notifOptions = {
            type: "basic",
            iconUrl: 'icons/48.png',
            title: notifMessage.title,
            message: notifMessage.message,
        };
        Notification.clear("limitNotif",function(data){
            Notification.create("limitNotif", notifOptions, function() {
                
            });
        })
    }
    
    
    $("#button").click(erase);


})
