const http = require('http');
const fs = require('fs');
const port = 3289;

const requestHandler = (request, response) => {
    let filePath = "";
    switch (request.url) {
        case '/':
            filePath = "./index.html"
            break;

        case '/about':
            filePath = "./about.html"
            break;

        case '/product':
            filePath = "./product.html"
            break;

        case '/contact':
            filePath = "./contact.html"
            break;

        default:
            filePath = "./error.html"
    }
    let data = fs.readFileSync(filePath);
    response.end(data);
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        console.log('Server not started', err);
    }
    else {
        console.log('Server started');
    }
});                                                                                             