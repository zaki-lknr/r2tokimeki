chrome.omnibox.onInputEntered.addListener(
    function (text, disposition) {
        const url = "https://tokimeki.blue/search?q=" + encodeURIComponent(text);

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
            chrome.tabs.update(tabs[0].id, { url: url });
        });
    }
)
