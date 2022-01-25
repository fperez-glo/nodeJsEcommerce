
const express = require(`express`);
const { Router } = express
const argsParser = require('minimist')
const router = new Router();


router.get('/:cant?',(req, res) => {
    let cant = req.query?.cant;

    if (!cant) {
        cant = 100000;
    };

    let calculo = 0;
    let nums = [];

    for (let i = 0; i < cant; i++) {
        calculo = Math.floor((Math.random() * (1000 - 1 + 1)) + 1);

        // const index = nums.indexOf(calculo)
        const index = nums.indexOf(nums.find(num => num.calculo === calculo));

        if (index !== -1) {
            nums[index].reps += 1
        } else {

            const number = {
                calculo, 
                reps: 1
            };
    
            nums.push(number);
        };
    };

    res.json({ PORT:  argsParser(process.argv.slice(2)).port || process.env.PORT || 8082 ,PROCESSID: process.pid ,nums });
})

module.exports = router