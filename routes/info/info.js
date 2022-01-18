const express = require(`express`);
const { Router } = express
const argsParser = require('minimist')

const router = new Router();



router.get('/',(req, res) => {
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
    };

    info.push(infoObjet)
    console.log('resuelve info!!')
    res.render('info',{ info });
})

module.exports = router