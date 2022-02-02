const autocannon = require('autocannon');
const { PassThrough } = require('stream');

const run = (uri) => {
    const buffer = [];

    const outputStream = new PassThrough();

    const instance = autocannon({
        url: uri, //uri a testear
        connections: 100, //100 conexiones concurrentes
        duration: 20 //segundos
    });

    autocannon.track(instance, { outputStream });

    outputStream.on('data', (data) => {
        buffer.push(data);
    });

    instance.on('done', () => {
        process.stdout.write(Buffer.concat(buffer));
    });
};

console.log('Running all benchmarks in parallei...');

run("http://localhost:8080/info/withoutConsole");
run("http://localhost:8080/info/withConsole");