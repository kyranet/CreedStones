import { State } from 'phaser';

export class BootState extends State {
	public preload() {
		// load here assets required for the loading screen
		this.game.load.image('preloader_bar', 'images/preloader_bar.png');
	}

	public create() {
		this.game.state.start('preloader');
	}
}
