const express = require(`express`);
const { Router } = express
const argsParser = require('minimist');
const { app } = require('firebase-admin');
const router = new Router();
const cpuQty = require('os').cpus().length;


router.get('/', (req, res) => {
    let info = [];

    const args = argsParser(process.argv.slice(2));

    // args.foreach(arg => console.log('argumento:', arg))

    const infoObjet = {
        entryArgs: args,
        SO: process.platform,
        nodeVersion: process.version,
        memoryRss: process.memoryUsage().rss,
        executePath: __dirname,
        processId: process.pid,
        proyectFolder: process.cwd(),
        cpuQty,
    };

    info.push(infoObjet);
    console.log('resuelve info!!');
    
    res.render('info',{ info });
})



router.get('/withConsole', (req, res) => {
    let info = [];

    const args = argsParser(process.argv.slice(2));

    // args.foreach(arg => console.log('argumento:', arg))

    const infoObjet = {
        entryArgs: args,
        SO: process.platform,
        nodeVersion: process.version,
        memoryRss: process.memoryUsage().rss,
        executePath: __dirname,
        processId: process.pid,
        proyectFolder: process.cwd(),
        cpuQty,
    };

    info.push(infoObjet);
    console.log('resuelve info!!');
    
    res.render('info',{ info });
})

router.get('/withoutConsole', (req, res) => {
    let info = [];

    const args = argsParser(process.argv.slice(2));

    // args.foreach(arg => console.log('argumento:', arg))

    const infoObjet = {
        entryArgs: args,
        SO: process.platform,
        nodeVersion: process.version,
        memoryRss: process.memoryUsage().rss,
        executePath: __dirname,
        processId: process.pid,
        proyectFolder: process.cwd(),
        cpuQty,
    };

    info.push(infoObjet);
    
    res.render('info',{ info });
})

module.exports = router