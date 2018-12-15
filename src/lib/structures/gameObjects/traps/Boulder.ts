import { GameManager } from '../../managers/GameManager';
import { BoulderState, Direction } from '../../misc/types';
import { Trap } from './Trap';

export class Boulder extends Trap {

	protected state = BoulderState.stop;
	protected direction = Direction.down;
	protected speed = 0;

	public constructor(gameManager: GameManager, x: number, y: number) {
		super(gameManager, x, y, 'boulder');
	}

	/**
	 * Change the boulder's current velocity and status to the current direction
	 */
	public move() {
		this.state = BoulderState.move;
		switch (this.direction) {
			case Direction.down:
				this.body.velocity.x = 0;
				this.body.velocity.y = this.speed;
				break;
			case Direction.up:
				this.body.velocity.x = 0;
				this.body.velocity.y = -this.speed;
				break;
			case Direction.left:
				this.body.velocity.x = -this.speed;
				this.body.velocity.y = 0;
				break;
			default:
				this.body.velocity.x = this.speed;
				this.body.velocity.y = 0;
		}
	}

	/**
	 * Change the boulder's current velocity and status to zero
	 */
	public stop() {
		this.state = BoulderState.stop;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	}

	/**
	 * Change the moving direction for this boulder
	 * @param direction The new direction
	 */
	public setDirection(direction: Direction) {
		this.direction = direction;
		return this;
	}

	/**
	 * Change the speed for this boulder
	 * @param speed The new speed
	 */
	public setSpeed(speed: number) {
		this.speed = speed;
		return this;
	}

}

Boulder.factory.add(Boulder);
