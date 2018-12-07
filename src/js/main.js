'use strict';

const PlayScene = require('./play_scene.js');

const BootScene = {
	preload() {
		// load here assets required for the loading screen
		this.game.load.image('preloader_bar', 'images/preloader_bar.png');
	},

	create() {
		this.game.state.start('preloader');
	}
};

const PreloaderScene = {
	preload() {
		this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
		this.loadingBar.anchor.setTo(0, 0.5);
		this.load.setPreloadSprite(this.loadingBar);

		// TODO: load here the assets for the game
		this.game.load.image('logo', 'images/phaser.png');
	},

	create() {
		this.game.state.start('play');
	}
};

window.onload = function onload() {
	const game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

	game.state.add('boot', BootScene);
	game.state.add('preloader', PreloaderScene);
	game.state.add('play', PlayScene);

	game.state.start('boot');
};
