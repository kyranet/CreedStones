import { Game } from 'phaser';
import { ItemFactory } from './ItemFactory';

export class Item {

	public type = 'item';

	public constructor(public game: Game, public name: string) { }

	public setName(name: string) {
		this.name = name;
		return this;
	}

	public setType(type: string) {
		this.type = type;
		return this;
	}

	public load(data: IItemSerialized) {
		return this
			.setName(data.name)
			.setType(data.type);
	}

	public toJSON(): IItemSerialized {
		return {
			name: this.name,
			type: this.type
		};
	}

	public static factory = new ItemFactory();

}

Item.factory.set('item', Item);

/**
 * The serialized item data
 */
export interface IItemSerialized {
	name: string;
	type: string;
}
