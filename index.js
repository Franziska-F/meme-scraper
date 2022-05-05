import fs from 'node:fs';

import axios from 'axios';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

const getLinks = ($) => [
  ...new Set(
    $('img')
      .map((_, a) => $(a).attr('src'))
      .toArray(),
  ),
];
// let x = function () {
//  for (let i = 0; i < 11; i++) {
// console.log(i);
// }
// };

let x = 0;
let y = 1;
const z = '0';

axios
  .get(url)
  .then(function (response) {
    const html = response.data;
    const $ = cheerio.load(html);
    const links = getLinks($).slice(0, 10);

    async function saveFile() {
      for (let i = 0; i < 11; i++) {
        const folder = './memes';

        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder);
        }

        const loadImages = await fetch(links[x++]);
        const arrayBuffer = await loadImages.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // const waitForImages = await loadImages.buffer();
        fs.writeFile(`./memes/${i < 9 ? z + y++ : 10}.jpg`, buffer, () => {
          console.log(i);
          console.log('Done!');
        });
      }
    }
    saveFile().catch(() => {});
  })
  .catch(() => {});

// const file = fs.createWriteStream(memes);

/* function saveImageToDisk(url, localPath) {var fullUrl = url;
var file = fs.createWriteStream(localPath);
var request = https.get(url, function(response) {
response.pipe(file);
});*/
