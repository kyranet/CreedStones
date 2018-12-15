import { GameManager } from '../../managers/GameManager';
import { Direction, HidingType, PlayerState } from '../../misc/types';
import { HidingSpot, IHidingSpotSerialized } from '../hidingSpots/HidingSpot';
import { Character, ICharacterSerialized } from './Character';

export class Player extends Character {

	public hidingSpot: HidingSpot = null;
	public money = 0;
	private readonly directions = {
		down: false,
		left: false,
		right: false,
		up: false
	};

	public constructor(gameManager: GameManager, x: number, y: number) {
		super(gameManager, x, y, 'player');
		this.game.camera.follow(this);
	}

	public update() {
		this.directions.down = this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN);
		this.directions.left = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
		this.directions.right = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
		this.directions.up = this.game.input.keyboard.isDown(Phaser.Keyboard.UP);
		const running = this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT);

		if (this.directions.down !== this.directions.up) {
			this.direction = this.directions.down ? Direction.down : Direction.up;
			if (running) this.run();
			else this.walk();
		} else if (this.directions.left !== this.directions.right) {
			this.direction = this.directions.left ? Direction.left : Direction.right;
			if (running) this.run();
			else this.walk();
		} else {
			this.stand();
		}
	}

	/**
	 * Hides the player, changing the state and setting the hiding spot
	 * @param hidingSpot The hiding spot
	 */
	public hide(hidingSpot: HidingSpot) {
		if (hidingSpot.hidingType !== HidingType.none) {
			this.setState(PlayerState.hidden);
			this.hidingSpot = hidingSpot;
		}
		return this;
	}

	/**
	 * Reveals the player, leaving the hiding place if there was any
	 */
	public reveal() {
		if (this.hidingSpot) {
			this.setState(this.health ? PlayerState.stand : PlayerState.dead);
			this.hidingSpot = null;
		}
		return this;
	}

	public fromJSON(data: IPlayerSerialized) {
		super.fromJSON(data);
		this.money = data.money;
		return this;
	}

	public toJSON(): IPlayerSerialized {
		return {
			...super.toJSON(),
			hidingSpot: this.hidingSpot.toJSON(),
			money: this.money
		};
	}

}

Player.factory.add(Player);

/**
 * The serialized player data
 */
export interface IPlayerSerialized extends ICharacterSerialized {
	hidingSpot: IHidingSpotSerialized;
	money: number;
}
