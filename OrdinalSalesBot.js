//Ordinal Sales Bot for Ordinals Wallet marketplace. Can be changed to any marketplace.
//Commented out code (lines 66-87) will save the latest processed sale to a json and check that prior to logging to ensure it doesn't repeat itself.

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

let collectionLowercase;

async function getOW() {
    const url = 'https://ordinalswallet.com/activity';
    const marketplace = 'Ordinals Wallet'
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const inscriptionLink = $('a.InscriptionActivityRow_link__Uk59o:first').attr("href");
        const splitLink = inscriptionLink.split("/");
        const id = splitLink[splitLink.length - 1].substring(0);
        const collection = $('p.InscriptionCardSmall_title__cU5q9.text-md.bold:first').text();
        const inscription = $('div.InscriptionCardSmall_subtitle__gpP8w.text-xs.semibold:first').text();
        const idMatches = inscription.match(/#(\d+)w*/g);
        const idNumbers = idMatches.map(match => match.replace("#", "").replace("Inscription", "")); 
        const salePrice = $('span.text-sm.regular:first').text();
        let collectionName = $('div.GradientText_root__mVkmV.InscriptionActivityRow_collectionName__4dNmQ.text-sm:first').text();
        const collectionNameLink = $('').attr("href")
        collectionName = `[${collectionName}]${collectionNameLink})`
        const url5 = `${collectionNameLink}`
        const response2 = await axios.get(url5);
        const $2 = cheerio.load(response2.data);
        let variable = $2(`div.CollectionStat_value__wetim.text-sm.semibold:first`).text()
        floorPrice = variable
        
        return {
            inscriptionLink,
            collection,
            id,
            idNumbers,
            salePrice,
            marketplace,
            collectionName,
            collectionLowercase,
            floorPrice
        };           
    } catch (error) {
        console.log(error);
    }
}

/*async function sendLatestOWSale() {
    const { inscriptionLink, id, collection, salePrice, idNumbers, marketplace, collectionName } = await getOW();
    const floorPrice = await getPrice(collectionLowercase)
    const lastProcessed = JSON.parse(
        fs.readFileSync("lastProcessed.json", "utf8")
      );
    if (
        lastProcessed.id === id &&
        lastProcessed.collection === collection &&
        lastProcessed.salePrice === salePrice
    ) {
        return;
    }    
      fs.writeFile("lastProcessed.json", JSON.stringify({id, collection, salePrice}), (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });   
}

setInterval(() => {
    sendLatestOWSale()
}, 10000);*/
