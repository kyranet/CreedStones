const { watch, statSync } = require('fs');
const { execSync } = require('child_process');
const { join } = require('path');

const libPath = join(__dirname, '..', 'src', 'lib');
const ansiCursorUp = '\u001b[1A\u001b[K'

// Not available in Linux
watch(libPath, { recursive: true }, (event, filename) => {
	console.log('Watch:', event, filename);
	if (statSync(join(libPath, filename)).isFile) {
		execSync('yarn bundle', (error) => error && console.error(error));
		console.log(`${ansiCursorUp}Watch: Successfully compiled.`);
	}
});
