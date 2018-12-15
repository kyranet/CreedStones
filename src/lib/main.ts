import { Game } from 'phaser';
import { BootState } from './states/BootState';
import { PlayState } from './states/PlayState';
import { PreloaderState } from './states/PreloaderState';

window.onload = function onload() {
	const game = new Game(800, 600, Phaser.AUTO, 'game');

	game.state.add('boot', BootState);
	game.state.add('preloader', PreloaderState);
	game.state.add('play', PlayState);

	game.state.start('boot');
};
