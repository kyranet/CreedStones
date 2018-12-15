export function chunk<T>(entries: T[], chunkSize: number): T[][] {
	const clone = entries.slice();
	const chunks = [];
	while (clone.length) chunks.push(clone.splice(0, chunkSize));
	return chunks;
}

export function readLine(text: Phaser.Text, cb: (text: string) => void, options?: PhaserReadLineOptions) {
	const content = [];
	const maximum = 'maximumLength' in options ? options.maximumLength : 100;

	const listener = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			document.removeEventListener('keydown', listener);
			cb(content.join(''));
			return;
		}

		if (event.key === 'Backspace') {
			if (content.length) content.pop();
		} else if (content.length <= maximum && /^[\(\)\[\]\w\d\-!?¡¿ ]$/.test(event.key)) {
			content.push(event.key);
		} else {
			return;
		}

		text.text = content.join('');
	};
	document.addEventListener('keydown', listener);
}

/**
 * The readline options
 */
export interface PhaserReadLineOptions {
	maximumLength?: number;
}
