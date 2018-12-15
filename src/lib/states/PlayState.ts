import { GameManager } from '../structures/managers/GameManager';

export class PlayState extends Phaser.State {
	public gameManager = new GameManager(this.game);

	public create() {
		const logo = this.game.add.sprite(
			this.game.world.centerX, this.game.world.centerY, 'logo');
		logo.anchor.setTo(0.5, 0.5);
		logo.scale.setTo(0.5, 0.5);

		// Prevent directions and space key events bubbling up to browser,
		// since these keys will make web page scroll which is not
		// expected.
		this.game.input.keyboard.addKeyCapture([
			Phaser.Keyboard.LEFT,
			Phaser.Keyboard.RIGHT,
			Phaser.Keyboard.UP,
			Phaser.Keyboard.DOWN,
			Phaser.Keyboard.SPACEBAR
		]);
	}

}
