const SitemapGenerator = require('sitemap-generator');

// create generator
const generator = SitemapGenerator('http://www.growersadvantage.org', {
    stripQuerystring: false
});

// const crawler = generator.getCrawler()
// const sitemap = generator.getSitemap()

// // Add static URL on crawl init.
// crawler.on('crawlstart', () => {
//     sitemap.addURL('./server.js')
// })

// crawler.addFetchCondition((queueItem, referrerQueueItem, callback) => {
//     callback(null, !queueItem.path.match(/myregex/));
// });

// register event listeners
generator.on('done', () => {
    // sitemaps created
    console.log("hit")
});

// start the crawler
generator.start();