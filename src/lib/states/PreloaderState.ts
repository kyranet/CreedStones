import { Sprite, State } from 'phaser';

export class PreloaderState extends State {

	private loadingBar: Sprite;

	public preload() {
		this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
		this.loadingBar.anchor.setTo(0, 0.5);
		this.load.setPreloadSprite(this.loadingBar);

		// TODO: load here the assets for the game
		this.game.load.image('logo', 'images/phaser.png');
	}

	public create() {
		this.game.state.start('play');
	}
}
