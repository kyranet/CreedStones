import { BootState } from './states/BootState';
import { MenuState } from './states/MenuState';
import { PlayState } from './states/PlayState';
import { PreloaderState } from './states/PreloaderState';

window.onload = function onload() {
	const game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

	// Prevent directions and space key events bubbling up to browser,
	// since these keys will make web page scroll which is not
	// expected.
	game.input.keyboard.addKeyCapture([
		Phaser.Keyboard.LEFT,
		Phaser.Keyboard.RIGHT,
		Phaser.Keyboard.UP,
		Phaser.Keyboard.DOWN,
		Phaser.Keyboard.SPACEBAR
	]);

	game.state.add('boot', BootState);
	game.state.add('preloader', PreloaderState);
	game.state.add('play', PlayState);
	game.state.add('menu', MenuState);

	game.state.start('boot');
};
