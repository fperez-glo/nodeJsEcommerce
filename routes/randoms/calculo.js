const calcular = (cant) => {
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

    return nums;
};

process.on('message', ({message, cant}) => {
    if (message === 'start') {
        console.log('cant!!!!!:', cant);
        const calculo = calcular(cant);
        process.send(calculo);
    } else {
        console.log('Error al ejecutar la funcion');
    };
});