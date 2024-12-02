console.log("Road to TOKIMEKI!");

const link_items = document.getElementsByTagName("a");
// console.log(link_items);
for (const link_item of link_items) {
    // console.log(link_item);
    // const url = link_item.getAttribute('href');
    const url = link_item.href;
    // console.log(url);
    if (url.startsWith('https://bsky.app')) {
        const tokimeki_url = url.replace('https://bsky.app', 'https://tokimeki.blue');
        // console.log(tokimeki_url);
        link_item.href = tokimeki_url;
        console.log(link_item.href);
    }
}

console.log("ext end");
