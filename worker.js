// const target_url = "https://bsky.app";

chrome.omnibox.onInputEntered.addListener(
    function (text, disposition) {
        // console.log(text);
        let url;
        if (d = get_date_search_string(text)) {
            url = "https://tokimeki.blue/search?q=" + encodeURIComponent("from:me " + d);
        }
        else {
            url = "https://tokimeki.blue/search?q=" + encodeURIComponent(text);
        }

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
    const bsky_url = location.href;
    // console.log(bsky_url);
    if (bsky_url.startsWith('https://bsky.app')) {
        // console.log("r2tokimeki");
        //TODO もっと上位(chrome拡張レイヤー)で処理する

        if (bsky_url.match(/https:\/\/bsky.app\/?$/)) {
            // そのままTOKIMEKIトップページへ
            location.href = 'https://tokimeki.blue';
        }
        else {
            // const a = /https:\/\/bsky.app\/(.*?)[\/\?]/.exec(bsky_url);
            const b = bsky_url.replace('https://bsky.app/', '');
            // console.log(b);
            switch (true) {
                case /^profile/.test(b):
                    // プロフィールページ・各投稿ページ・フィード
                case /^search/.test(b):
                    // 検索
                case /^notifications/.test(b):
                    // 通知
                    location.href = bsky_url.replace('https://bsky.app', 'https://tokimeki.blue');
                    break;
                case /^hashtag/.test(b):
                    // ハッシュタグ：TOKIMEKIは#付きの通常検索
                    location.href = bsky_url.replace('https://bsky.app/hashtag/', 'https://tokimeki.blue/search?q=%23');
                    break;
                case /^settings/.test(b):
                    // console.log("settings");
                    // 設定は除外
                default:
                    // lists, feedsは「カラムの追加と管理」に紐づけたいけどURLがないので無理
                    console.log("no link url: " + bsky_url);
                    break;
            }
        }
    }

    // location.href = "https://www.google.com";
}

const get_date_search_string = (yyyymmdd) => {
    console.log(yyyymmdd);
    if (r = yyyymmdd.match(/^(\d{4})(\d{2})(\d{2})$/)) {
        const d = new Date(r[1] + '/' + r[2] + '/' + r[3]);
        if (! isNaN(d)) {
            d.setHours(23);
            d.setMinutes(59);
            d.setSeconds(59);
            const end = "until:" + d.getUTCFullYear().toString().padStart(4, "0") + "-"
                + (d.getUTCMonth()+1).toString().padStart(2, "0") + "-"
                + d.getUTCDate().toString().padStart(2, "0") + "T"
                + d.getUTCHours().toString().padStart(2, "0") + ":"
                + d.getUTCMinutes().toString().padStart(2, "0") + ":"
                + d.getUTCSeconds().toString().padStart(2, "0") + "Z";

            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            const start = "since:" + d.getUTCFullYear().toString().padStart(4, "0") + "-"
                + (d.getUTCMonth()+1).toString().padStart(2, "0") + "-"
                + d.getUTCDate().toString().padStart(2, "0") + "T"
                + d.getUTCHours().toString().padStart(2, "0") + ":"
                + d.getUTCMinutes().toString().padStart(2, "0") + ":"
                + d.getUTCSeconds().toString().padStart(2, "0") + "Z";

            return start + " " + end;
        }
    }

    return null;
}
