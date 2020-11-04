var contextMenuItem = {
    "id": "updateSticky",
    "title": "Add to Notes",
    "type": "normal",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((clickData) => {
    if (clickData.menuItemId == "updateSticky") {
        let newText = clickData.selectionText;
        chrome.storage.sync.get("text", function(result) {
            console.log(result.text);
            var a;
            if(result.text == undefined){
                a = newText;
            }else{
                a  = result.text.concat(" " + newText);
            }
            chrome.storage.sync.set({ "text": a });
        })
    }


})

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(request.greeting);
//         console.log(sender);
//         console.log(sendResponse);
//         // if (request.greeting == "hello")
//         // sendResponse({farewell: "goodbye"});

        
//     });
