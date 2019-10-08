const http = require('http');
const child_process = require('child_process');



http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/palin; charset=utf-8');
    if (req.url === '/?type=go') {
        const workerProcess = child_process.exec('git pull xxxx.git', function (error, stdout, stderr) {
            if (error) {
                console.log(error.stack);
                console.log('Error code: ' + error.code);
                console.log('Signal received: ' + error.signal);
            }
            res.write('输出: ' + stdout);
            res.write('错误: ' + stderr);
            res.end();
        });
    }
}).listen(4000, function () {
    console.log('Server running at http://127.0.0.1:4000/');
});





