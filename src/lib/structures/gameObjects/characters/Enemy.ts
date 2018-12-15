import { GameManager } from '../../managers/GameManager';
import { Route } from '../../misc/Route';
import { EnemyState } from '../../misc/types';
import { Character, ICharacterSerialized } from './Character';

export class Enemy extends Character {
	public route = new Route();
	protected pov = Math.PI * 0.85;
	protected isTarget = false;

	public constructor(gameManager: GameManager, x: number, y: number) {
		super(gameManager, x, y, 'enemy');
	}

	public setTarget(isTarget: boolean) {
		this.isTarget = isTarget;
		return this;
	}

	public setPov(pov: number) {
		this.pov = pov;
		return this;
	}

	public chase() {
		// TODO: How do we know the Player's position?
		// TODO: Implement actual logic
		this.setState(EnemyState.pursuit);

		// TODO: Implement method to reset pursuit to onRoute, including
		// the usage of Dijkstra's algorithm to go back to the previous route.
		// TODO: Add method to pinpoint positions to the route
	}

	public fromJSON(data: IEnemySerialized) {
		super.fromJSON(data);
		this.isTarget = data.isTarget;
		this.pov = data.pov;
		this.route.set(data.route);
		return this;
	}

	public toJSON(): IEnemySerialized {
		return {
			...super.toJSON(),
			isTarget: this.isTarget,
			pov: this.pov,
			route: this.route.toJSON()
		};
	}

}

Enemy.factory.add(Enemy);

/**
 * The serialized enemy data
 */
export interface IEnemySerialized extends ICharacterSerialized {
	isTarget: boolean;
	pov: number;
	route: [number, number][];
}
