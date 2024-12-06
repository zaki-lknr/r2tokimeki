// console.log("Road to TOKIMEKI!");

const link_items = document.getElementsByTagName("a");
for (const link_item of link_items) {
    const url = link_item.href;
    // console.log(url);
    if (url.startsWith('https://bsky.app')) {
        // const a = url.match(/https:\/\/bsky.app\/(.*)\//);
        const a = /https:\/\/bsky.app\/(.*?)[\/\?]/.exec(url);
        // console.log(a);
        if (a) {
            switch (a[1]) {
                case "profile":
                    // プロフィールページ・各投稿ページ・フィード
                case "search":
                    // 検索
                    link_item.href = url.replace('https://bsky.app', 'https://tokimeki.blue');
                    break;

                case "hashtag":
                    // ハッシュタグ：TOKIMEKIは#付きの通常検索
                    link_item.href = url.replace('https://bsky.app/hashtag/', 'https://tokimeki.blue/search?q=%23');
                    break;

                case "intent":
                    // 共有インテント
                    // 本家のインテントのパラメタはtextのみ。URLはテキスト末尾のスペース+https://の文字列から拾う
                    const b = /compose\?text=(.*)(?:%20|%0a|%0d|%09)(http.*)/i.exec(url);
                    let tkmk;
                    if (b) {
                        tkmk = 'text=' + b[1].replace(/(%20|%0a|%0d|%09)*$/i, "");
                        tkmk += '&url=' + b[2].trimEnd();
                    }
                    else {
                        // こっちには来ないと思うけど念のため(テキストのみ・リンクのみの共有インテント)
                        const s = url.replace(/https:\/\/bsky.app\/intent\/compose\?text=/, "");
                        if (s.startsWith('http')) {
                            tkmk = 'url=' + s;
                        }
                        else {
                            tkmk = 'text=' + s;
                        }
                    }
                    link_item.href = 'https://tokimeki.blue/shared?' + tkmk;
                    break;

                // case "messages":
                //     // DM (要らない気もする?)
                //     link_item.href = url.replace('https://bsky.app/messages', 'https://tokimeki.blue/chat');
                //     break;
                //// チャットのURLを直で開いてもデータがロードされないので機能オフ

                default:
                    break;
            }
        }
        else {
            // console.log("bsky.app top page or etc");
            // nop
        }
        // console.log("bluesky link: " + link_item.href);
    }
}
