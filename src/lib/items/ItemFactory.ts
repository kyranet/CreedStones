import { Game } from 'phaser';
import { IItemSerialized, Item } from './Item';

export class ItemFactory extends Map<string, typeof Item> {

	private game: Game;

	public setGame(game: Game) {
		this.game = game;
		return this;
	}

	public load(name: string, data: IItemSerialized) {
		const ctor = this.get(name);
		if (ctor) return new ctor(this.game, data.name).load(data);
		throw new Error(`The item ${name} is not registered into this factory.`);
	}

}
