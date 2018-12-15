import { WIN_HEIGHT, WIN_WIDTH } from './constants';

export function chunk<T>(entries: T[], chunkSize: number): T[][] {
	const clone = entries.slice();
	const chunks = [];
	while (clone.length) chunks.push(clone.splice(0, chunkSize));
	return chunks;
}

export function readLine(game: Phaser.Game, coordinates: Coordinates, cb: (text: string) => void) {
	const bmd = game.make.bitmapData(WIN_WIDTH, WIN_HEIGHT);
	bmd.context.font = '64px Arial';
	bmd.context.fillStyle = '#FFFFFF';
	bmd.context.textAlign = 'center';
	bmd.addToWorld();

	const text = [];

	const listener = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			document.removeEventListener('keydown', listener);
			bmd.destroy();
			cb(text.join(''));
			return;
		}

		if (event.key === 'Backspace') {
			if (text.length) text.pop();
		} else if (/^[a-zA-Z0-9]$/.test(event.key)) {
			text.push(event.key);
		} else {
			return;
		}

		// Clear the bitmap data
		bmd.cls();
		bmd.context.fillText(text.join(''), coordinates.x, coordinates.y);
	};
	document.addEventListener('keydown', listener);
}

/**
 * The coordinates interface
 */
export interface Coordinates {
	x: number;
	y: number;
}
