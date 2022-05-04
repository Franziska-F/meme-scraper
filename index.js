import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

const getLinks = ($) => [
  ...new Set(
    $('img')
      .map((_, a) => $(a).attr('src'))
      .toArray(),
  ),
];

axios
  .get(url)
  .then(function (response) {
    const html = response.data;
    const $ = cheerio.load(html);
    const links = getLinks($);
    console.log(links);
  })
  .catch(console.error);
