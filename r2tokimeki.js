// console.log("Road to TOKIMEKI!");

const link_items = document.getElementsByTagName("a");
for (const link_item of link_items) {
    const url = link_item.href;
    // console.log(url);
    if (url.startsWith('https://bsky.app')) {
        // const a = url.match(/https:\/\/bsky.app\/(.*)\//);
        const a = /https:\/\/bsky.app\/(.*?)[\/\?]/.exec(url);
        // console.log(a);
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

            // case "messages":
            //     // DM (要らない気もする?)
            //     link_item.href = url.replace('https://bsky.app/messages', 'https://tokimeki.blue/chat');
            //     break;
            //// チャットのURLを直で開いてもデータがロードされないので機能オフ

            default:
                break;
        }
        // console.log("bluesky link: " + link_item.href);
    }
}
