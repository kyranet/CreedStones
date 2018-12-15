import { Game } from 'phaser';
import { IItemSerialized, Item } from './Item';

export class ItemWeapon extends Item {
	public damage = 0;

	public constructor(public game: Game, public name: string) {
		super(game, name);
	}

	/**
	 * Set the damage for this weapon
	 * @param damage The damage this weapon deals
	 */
	public setDamage(damage: number) {
		this.damage = damage;
		return this;
	}

	public load(data: IItemWeaponSerialized) {
		return super.load(data).setDamage(data.damage);
	}

	public toJSON() {
		return {
			...super.toJSON(),
			damage: this.damage
		};
	}

}

Item.factory.add(ItemWeapon);

/**
 * The serialized item weapon data
 */
export interface IItemWeaponSerialized extends IItemSerialized {
	damage: number;
}
