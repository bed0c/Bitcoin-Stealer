"use strict";

process.title = "Bitcoin Stealer by bed0c";

const CoinKey = require('coinkey');
const fs = require('fs');

let privateKeyHex, ck, addresses;
addresses = new Map();

const data = fs.readFileSync('./riches.txt');
data.toString().split("\n").forEach(address => addresses.set(address, true));

function generate() {
    
    let privateKeyHex = r(64);
    
    
    let ck = new CoinKey(Buffer.from(privateKeyHex, 'hex'));
    
    ck.compressed = false;
    //console.log(ck.publicAddress)
    
    
    
    if(addresses.has(ck.publicAddress)){
        console.log("");
        process.stdout.write('\x07');
        console.log("\x1b[32m%s\x1b[0m", ">> Success: " + ck.publicAddress);
        var successString = "Wallet: " + ck.publicAddress + "\n\nSeed: " + ck.privateWif;
            
         
        fs.writeFileSync('./Success.txt', successString, (err) => {
            if (err) throw err; 
        })
            
        
        process.exit();
    }
    
    ck = null;
    privateKeyHex = null;
}


function r(l) {
    let randomChars = 'ABCDEF0123456789';
    let result = '';
    for ( var i = 0; i < l; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

console.log("\x1b[32m%s\x1b[0m", ">> Program Started and is working silently (edit code if you want logs)"); 
while(true){
    generate();
    if (process.memoryUsage().heapUsed / 1000000 > 500) {
        global.gc();
    }
    //console.log("Heap used : ", process.memoryUsage().heapUsed / 1000000);
}
