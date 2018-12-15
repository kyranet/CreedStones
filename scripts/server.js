// @ts-check
const { createServer, STATUS_CODES } = require('http');
const { extname } = require('path');
const { createReadStream } = require('fs');

const contentTypes = new Map()
	.set('.js', 'text/javascript')
	.set('.css', 'text/css')
	.set('.json', 'application/json')
	.set('.png', 'image/png')
	.set('.jpg', 'image/jpg')
	.set('.wav', 'audio/wav');

createServer((request, response) => {
	const filePath = request.url === '/' ? './dist/index.html' : `./dist${request.url}`;
	const contentType = contentTypes.get(extname(filePath)) || 'text/html';
	try {
		const stream = createReadStream(filePath);
		response.writeHead(200, { 'Content-Type': contentType });
		stream.pipe(response);
		stream.on('error', (error) => write(response, error.code == 'ENOENT' ? 404 : 500))
	} catch {
		write(response, 500);
	}
}).listen(3000, () => console.log(`Listening on https://localhost:3000`));

function write(response, code) {
	response.writeHead(code);
	response.end(STATUS_CODES[code], 'utf-8');
}
