//const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
//npm init -y
//npm i request

const request = require("request");
const cheerio = require("cheerio");
//home page
function processScorecard(url){
    request(url,cb);
}

function cb(err,request,html){
    if(err){
        console.log(err);
    } else {
       // console.log(html);
        extractMatchDeatails(html);
    }
}

function extractMatchDeatails(html){
    //venue date opponent result runs balls four sixes sr
    //ipl
    //team-> player 
    //run balls fours sixes venue oppent venue date
    //venue date -> .event .description
    //result  -> .match-header.status-text
    let $ = cheerio.load(html);
    let descElem = $(".event .description");
    let result = $(".match-header .status-text");
    let stringArr = descElem.text().split(",");
    let venue = stringArr[1].trim();
    let date = stringArr[2].trim();
     result = result.text();
let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
let htmlString = "";
for(let i=0;i<innings.length;i++){
    //htmlString += $(innings[i]).html();
//team opponent
let teamName = $(innings[i]).find("h5").text();
teamName = teamName.split("INNINGS")[0].trim();
let opponentIndex = i == 0 ? 1 :0;
let opponentName = $(innings[opponentIndex]).find("h5").text();
opponentName = opponentName.split("INNINGS")[0].trim();
//console.log(`${venue} | ${date} | ${teamName} | ${opponentIndex} | ${result}`);
let cInning = $(innings[i]);
console.log(`${venue} | ${date} | ${teamName} | ${opponentIndex} | ${result}`);
let allRows = cInning.find(".table.batsman tbody tr");
for(let j=0;j<allRows.length;j++){
let allCols = $(allRows[j]).find("td");
let isWorthy = $(allCols[0]).hasClass("batsman-cell");
if(isWorthy == true){
    let playerName = $(allCols[0]).text().trim();
    let runs = $(allCols[2]).text().trim();
    let balls = $(allCols[3]).text().trim();
    let sixes = $(allCols[6]).text().trim();
    let fours = $(allCols[5]).text().trim();
    let sr = $(allCols[7]).text().trim();
    console.log(`${playerName} | ${runs} | ${balls} | ${fours} | ${sixes} | ${sr}`);

    }
}

}
   // console.log(htmlString);
}

module.exports = {
    ps: processScorecard
}