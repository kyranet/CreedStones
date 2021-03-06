import { GameManager } from '../managers/GameManager';

export class SpeechBubble extends Phaser.Sprite {

	private timer: Phaser.TimerEvent = null;

	public constructor(public gameManager: GameManager, x: number, y: number) {
		super(gameManager.game, x, y, 'speechBubble', 0);
		// Add the gameobject itself to the game
		this.game.add.existing(this);
		this.smoothed = false;

		this.animations.add('...', [0, 2, 3, 1], 2);
		this.animations.add('!', [4], 0);
		this.animations.add('?', [5], 0);
	}

	public hide() {
		this.renderable = false;
		return this;
	}

	public show() {
		this.renderable = true;
		return this;
	}

	public display(animation: '...' | '!' | '?') {
		this.animations.play(animation, animation === '...' ? 2 : 0, true);
		return this;
	}

	public fadeIn(delay: number) {
		if (delay <= 0) return this.hide();
		if (this.timer) this.game.time.events.remove(this.timer);
		this.timer = this.game.time.events.add(delay, () => {
			this.timer = null;
			this.hide();
		});
		return this;
	}

}
