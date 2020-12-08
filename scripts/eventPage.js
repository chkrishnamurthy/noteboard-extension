var contextMenuItem = {
  id: "updateSticky",
  title: "Add to Notes",
  type: "normal",
  contexts: ["selection"],
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == "updateSticky") {
    const newText = clickData.selectionText;
    chrome.storage.sync.get("text", function (result) {
      const a =
        result.text == undefined ? newText : result.text.concat(" " + newText);
      chrome.storage.sync.set({ text: a });
    });

    // const g = {
    //   url: chrome.extension.getURL("popup.html"),
    //   type: "popup",
    //   top: 100,
    //   left: 50,
    //   width: 730,
    //   height: 575,
    //   focused: true,
    //   state: "normal",
    // };
    // chrome.windows.create(g);
    // chrome.windows.create(createData);
  }
});
