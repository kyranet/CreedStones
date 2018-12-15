import { State } from 'phaser';

export class PlayState extends State {
	public create() {
		const logo = this.game.add.sprite(
			this.game.world.centerX, this.game.world.centerY, 'logo');
		logo.anchor.setTo(0.5, 0.5);
	}

}
