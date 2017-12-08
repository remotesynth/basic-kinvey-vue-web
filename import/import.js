var request = require("request"),
    cheerio = require("cheerio"),
    fs = require('fs');

/* scrapped this one because it didn't have much data on the initial page
request("https://www.zeldadungeon.net/breath-of-the-wild-walkthrough/shrine-locations/", function(error, response, body) {
    var shrines,
        $shrineLocations,
        shrineLocation,
        $shrineRegions,
        shrineRegion,
        $;
    if (!error) {
        $ = cheerio.load(body);
        $shrineRegions = $("H3").toArray();
        $shrineRegions.forEach(function (shrineRegion) {
            console.log("REGION");
            console.log(shrineRegion.children[0].children[0].data);
        });
        $shrineLocations = $("h3").nextAll("ul").children().toArray();
        //console.log($shrineLocations);
        $shrineLocations.forEach(function (shrineLocation) {
            console.log("SHRINE");
            console.log(shrineLocation.children[0].children[0].data);
            console.log(shrineLocation.parent.prev.prev.children[0].children[0].data);
        })
    }
    else {
        console.log("Error: " + error);
    }
})
*/


// note that this content is being scraped for demo purposes only and belongs to NintendoLife
request("http://www.nintendolife.com/news/2017/03/guide_the_legend_of_zelda_breath_of_the_wild_all_shrine_locations_walkthrough_and_map", function(error, response, body) {
    var shrines,
        $shrineLocations,
        shrineLocation,
        $shrineRegions,
        shrineRegion,
        allRegions = [],
        shrineDetails,
        thisShrine = {},
        allShrines = [],
        $,
        re = /"/gi;
    if (!error) {
        $ = cheerio.load(body);
        $shrineRegions = $("H3").toArray();
        //console.log($shrineRegions);

        $shrineRegions.forEach(function (shrineRegion) {
            // console.log("REGION");
            // console.log(shrineRegion.children[0].data.replace(' Shrine Map',''));
            allRegions.push({name: shrineRegion.children[0].data.replace(' Shrine Map','')});
        });
        
        $shrineLocations = $("h3").nextAll("ol").children().toArray();
        $shrineLocations.forEach(function (shrineLocation) {
            // console.log("SHRINE");
            thisShrine = {};
            try {
                // console.log(shrineLocation.children[0].children[0].data);
                thisShrine.name = shrineLocation.children[0].children[0].data;
                // console.log(shrineLocation.parent.prev.prev.prev.prev.children[0].data.replace(' Shrine Map',''));
                thisShrine.region = shrineLocation.parent.prev.prev.prev.prev.children[0].data.replace(' Shrine Map','');
                shrineDetails = shrineLocation.children[1].data.replace("–","-").split("- ");
                if ((shrineDetails.length > 2) && shrineDetails[1].indexOf(".") == -1)  {
                    // console.log(shrineDetails[1].replace(re,''));
                    thisShrine.challenge = shrineDetails[1].replace(re,'').trim();
                    // console.log(shrineDetails[2]);
                    thisShrine.details = shrineDetails[2];
                }
                else {
                    // console.log(shrineDetails[1]);
                    thisShrine.details = shrineDetails[1];
                }
                allShrines.push(thisShrine);
            }
            catch (e) {
                // do nothing
            }
        })
    }
    else {
        console.log("Error: " + error);
    }
    //console.log(allShrines);
    writeData(allRegions,allShrines);
})

function writeData(regionArr,shrineArr) {
    fs.writeFileSync("regions.json", JSON.stringify(regionArr));
    fs.writeFileSync("shrines.json", JSON.stringify(shrineArr));
}