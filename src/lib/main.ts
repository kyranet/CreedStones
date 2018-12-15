import { BootState } from './states/BootState';
import { MenuState } from './states/MenuState';
import { PlayState } from './states/PlayState';
import { PreloaderState } from './states/PreloaderState';

window.onload = function onload() {
	const game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

	game.state.add('boot', BootState);
	game.state.add('preloader', PreloaderState);
	game.state.add('play', PlayState);
	game.state.add('menu', MenuState);

	game.state.start('boot');
};
