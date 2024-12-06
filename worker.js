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
    console.log(location.href);
    if (location.href.startsWith('https://bsky.app')) {
        console.log("r2tokimeki");
        const bsky_url = location.href;
        //TODO もっと上位(chrome拡張レイヤー)で処理する
        const a = /https:\/\/bsky.app\/(.*?)[\/\?]/.exec(bsky_url);
        switch (a[1]) {
            case "profile":
                // プロフィールページ・各投稿ページ・フィード
            case "search":
                // 検索
                location.href = bsky_url.replace('https://bsky.app', 'https://tokimeki.blue');
                break;
        }
    }

    // location.href = "https://www.google.com";
}
