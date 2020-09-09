const sanitizerHtml = require('sanitize-html');
const cheerio = require('cheerio');

const allowedTags = ['b', 'strong', 'i', 'em', 'u', 'ins', 's', 'strike', 'del', 'a', 'code', 'pre'];

module.exports = function sanitize(input) {
    const dom = cheerio.load(input);

    //preserve line breaks
    dom('br').replaceWith('\n');
    dom('p').each((index, element) => {
        const domElement = dom(element);
        domElement.append('\n');
    })
    input = dom.html();

    //sanitize unwanted tags
    const options = {
        allowedTags,
        allowedAttributes: {
            'a': [ 'href' ],
        },
    };
    return sanitizerHtml(input, options);
}