const express = require(`express`);
const { Router } = express


const router = new Router();



router.get('/',(req, res) => {
    const info = {
        SO: process.platform,
        nodeVersion: process.version,
        memUsage: process.memoryUsage().rss,
        workingPath: process.cwd(),
        processId: process.pid,
        
    }

    res.json({info})
})

module.exports = router