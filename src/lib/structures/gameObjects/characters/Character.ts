import { IInventorySerialized, Inventory } from '../../common/Inventory';
import { Item } from '../../items/Item';
import { ItemWeapon } from '../../items/ItemWeapon';
import { GameManager } from '../../managers/GameManager';
import { CharacterState, Direction } from '../../misc/types';
import { GameObject, IGameObjectSerialized } from '../GameObject';

export class Character extends GameObject {
	public walkSpeed = 0;
	public runSpeed = 0;
	public state: number = CharacterState.stand;
	public direction = Direction.down;
	public inventory = new Inventory();
	public strength = 0;

	public constructor(gameManager: GameManager, x: number, y: number, key?: string, frame?: string) {
		super(gameManager, x, y, key, frame);
		this.game.physics.enable(this);
	}

	public get damageStrength() {
		const item = this.inventory.active;
		return item instanceof ItemWeapon ? item.damage : this.strength;
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
		character.damage(this.damageStrength);
	}

	/**
	 * Kill overload to set the character's state
	 */
	public kill() {
		this.setState(CharacterState.dead);
		return super.kill();
	}

	/**
	 * Sets the state of this character to walk
	 */
	public walk() {
		this.setState(CharacterState.walk);
		switch (this.direction) {
			case Direction.down: this.setVelocity(0, this.walkSpeed); break;
			case Direction.up: this.setVelocity(0, -this.walkSpeed); break;
			case Direction.left: this.setVelocity(-this.walkSpeed, 0); break;
			default: this.setVelocity(this.walkSpeed, 0);
		}
	}

	/**
	 * Sets the state of this character to run
	 */
	public run() {
		this.setState(CharacterState.run);
		switch (this.direction) {
			case Direction.down: this.setVelocity(0, this.runSpeed); break;
			case Direction.up: this.setVelocity(0, -this.runSpeed); break;
			case Direction.left: this.setVelocity(-this.runSpeed, 0); break;
			default: this.setVelocity(this.runSpeed, 0);
		}
	}

	/**
	 * Sets the state of this character to stand, changing
	 */
	public stand() {
		this.setState(CharacterState.stand);
		this.setVelocity(0, 0);
	}

	/**
	 * Change the direction for this character
	 * @param direction The new direction
	 */
	public changeDirection(direction: Direction) {
		this.direction = direction;
	}

	public fromJSON(data: ICharacterSerialized) {
		super.fromJSON(data);
		this.direction = data.direction;
		this.runSpeed = data.runSpeed;
		this.walkSpeed = data.walkSpeed;
		this.inventory.clear();
		this.inventory.active = new Item(this.game, data.inventory.active);
		for (const entry of data.inventory.items) this.inventory.set(entry.name, new Item(this.game, entry.name));
		this.setStrength(data.strength);
		return this;
	}

	public toJSON(): ICharacterSerialized {
		return {
			...super.toJSON(),
			direction: this.direction,
			inventory: this.inventory.toJSON(),
			runSpeed: this.runSpeed,
			strength: this.strength,
			walkSpeed: this.walkSpeed,
		};
	}

}

Character.factory.add(Character);

/**
 * The serialized character data
 */
export interface ICharacterSerialized extends IGameObjectSerialized {
	direction: number;
	inventory: IInventorySerialized;
	runSpeed: number;
	strength: number;
	walkSpeed: number;
}
