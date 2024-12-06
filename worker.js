const target_url = "https://bsky.app";

chrome.omnibox.onInputEntered.addListener(
    function (text, disposition) {
        const url = "https://tokimeki.blue/search?q=" + encodeURIComponent(text);

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
            chrome.tabs.update(tabs[0].id, { url: url });
        });
    }
)

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: road2tokimeki,
    });
});

const road2tokimeki = () => {
    // console.log("road2tokimeki");
    // console.log(target_url); // NG (letでも変わらず)
    // window.open("https://www.google.com"); // 別タブ
    location.href = "https://www.google.com";
}
