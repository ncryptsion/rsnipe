(async()=>{
    "use strict";

    // Dependencies
    const chalk = require("chalk").default
    const ky = require("ky").default

    // Functions
    const log = (message)=>{console.log(`[${chalk.redBright("RSNIPE")}] ${message}`)}

    // Main
    log("Extracting \"all\" Roblox employees.")
    const response = await ky.get("https://roblox.fandom.com/wiki/List_of_Roblox_employees", {
        headers: {
            referer: "https://roblox.fandom.com/",
            "user-agent": "https://roblox.fandom.com/"
        }
    }).text()
    const staffWithInfo = response.match(/\/wiki\/Player\:\w+/g)
    log(`${staffWithInfo.length} staff's within the fandom found.`)

    for( const staff of staffWithInfo ){
        try{
            var staffInfo = await ky.get(`https://roblox.fandom.com${staff}`, {
                headers: {
                    referer: "https://roblox.fandom.com/",
                    "user-agent": "https://roblox.fandom.com/"
                }
            }).text()
            staffInfo = staffInfo.replace("https://twitter.com/getfandom", "").replace("https://x.com/RBXWiki", "")

            log(`${staff.replace("/wiki/Player:", "")} -> ${(staffInfo.match("https://x.com") || staffInfo.match("twitter.com") ? "MATCH" : "NO MATCH")}`)
        }catch{}
    }

    log("Finished.")
})()