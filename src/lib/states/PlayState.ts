import { GameManager } from '../structures/managers/GameManager';

export class PlayState extends Phaser.State {
	public gameManager = new GameManager(this.game);

	public create() {
		const logo = this.game.add.sprite(
			this.game.world.centerX, this.game.world.centerY, 'logo');
		logo.anchor.setTo(0.5, 0.5);
	}

}
