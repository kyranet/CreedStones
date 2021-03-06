import { GameManager } from '../../managers/GameManager';
import { CharacterState, Direction } from '../../misc/types';
import { GameObject, IGameObjectSerialized } from '../GameObject';

export class Character extends GameObject {

	public walkSpeed = 0;
	public runSpeed = 0;
	public state: number = CharacterState.stand;
	public direction = Direction.down;
	public strength = 0;
	public attackCooldown = 500;
	protected attackRefresh = 0;

	public constructor(gameManager: GameManager, x: number, y: number, key?: string, frame?: number) {
		super(gameManager, x, y, key, frame);
		this.body.setSize(this.width * 0.9, this.height * 0.3, (this.width * 0.1) / 2, this.height * 0.6);

		this.animations.add('stand.down', [0]);
		this.animations.add('move.down', [1, 2, 3, 4]);
		this.animations.add('kill.down', [5, 6, 7]);
		this.animations.add('dead.down', [8, 9, 10]);
		this.animations.add('stand.right', [11]);
		this.animations.add('move.right', [12, 13, 14, 15]);
		this.animations.add('kill.right', [16, 17, 18]);
		this.animations.add('dead.right', [19, 20, 21]);
		this.animations.add('stand.up', [22]);
		this.animations.add('move.up', [23, 24, 25, 26]);
		this.animations.add('kill.up', [27, 28, 29]);
		this.animations.add('dead.up', [30, 31, 32]);
		this.animations.add('stand.left', [33]);
		this.animations.add('move.left', [34, 35, 36, 37]);
		this.animations.add('kill.left', [38, 39, 40]);
		this.animations.add('dead.left', [41, 42, 43]);
	}

	public setStrength(strength: number) {
		this.strength = strength;
		return this;
	}

	public setState(state: number) {
		this.state = state;
		return this;
	}

	/**
	 * Try to attack a character
	 * @param character The character this one is attempting to attack
	 */
	public attack(character: Character) {
		const now = Date.now();
		if (now < this.attackRefresh) return this;
		this.attackRefresh = Date.now() + this.attackCooldown;
		character.damage(this.strength);
		this.animations.play(`kill.${Direction[this.direction]}`, (1000 / this.attackCooldown) * 3);
		return this;
	}

	/**
	 * Kill overload to set the character's state
	 */
	public kill() {
		this.setVelocity(0, 0);
		this.setState(CharacterState.dying);
		this.animations.play(`dead.${Direction[this.direction]}`, 1.5);
		this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
			this.setState(CharacterState.dead);
			super.kill();
		});
		return this;
	}

	/**
	 * Sets the state of this character to walk
	 */
	public walk() {
		this.animations.play(`move.${Direction[this.direction]}`, 5);
		this.updateVelocity(this.walkSpeed);
		return this;
	}

	/**
	 * Sets the state of this character to run
	 */
	public run() {
		this.animations.play(`move.${Direction[this.direction]}`, 8);
		this.updateVelocity(this.runSpeed);
		return this;
	}

	/**
	 * Sets the state of this character to stand, changing
	 */
	public stand() {
		this.animations.play(`stand.${Direction[this.direction]}`, 0);
		this.animations.stop();
		this.setVelocity(0, 0);
		return this;
	}

	/**
	 * Change the direction for this character
	 * @param direction The new direction
	 */
	public setDirection(direction: Direction) {
		this.direction = direction;
		return this;
	}

	public relativeAngleTo(gameObject: GameObject) {
		const absoluteAngle = this.angleTo(gameObject);
		const relativeAngle = this.relativeAngle;
		return absoluteAngle - relativeAngle;
	}

	public fromJSON(data: ICharacterSerialized) {
		super.fromJSON(data);
		this.direction = data.direction;
		this.runSpeed = data.runSpeed;
		this.walkSpeed = data.walkSpeed;
		this.setStrength(data.strength);
		return this;
	}

	public toJSON(): ICharacterSerialized {
		return {
			...super.toJSON(),
			direction: this.direction,
			runSpeed: this.runSpeed,
			strength: this.strength,
			type: 'Character',
			walkSpeed: this.walkSpeed,
		};
	}

	protected triggerWalk() {
		this.updateVelocity(this.walkSpeed);
	}

	protected updateVelocity(speed: number) {
		switch (this.direction) {
			case Direction.down: this.setVelocity(0, speed); break;
			case Direction.up: this.setVelocity(0, -speed); break;
			case Direction.left: this.setVelocity(-speed, 0); break;
			default: this.setVelocity(speed, 0);
		}
	}

	protected get relativeAngle() {
		switch (this.direction) {
			case Direction.down: return Phaser.Math.HALF_PI;
			case Direction.left: return Math.PI;
			case Direction.right: return 0;
			case Direction.up: return -Phaser.Math.HALF_PI;
		}
	}

}

/**
 * The serialized character data
 */
export interface ICharacterSerialized extends IGameObjectSerialized {
	direction: number;
	runSpeed: number;
	strength: number;
	walkSpeed: number;
}
