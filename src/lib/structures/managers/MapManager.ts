import { chunk } from '../../util/util';

export class MapManager {
	private readonly map: number[] = [];

	public constructor(public game: Phaser.Game, private sizeX: number, private sizeY: number, map?: number[]) {
		// If a preset was given, load from this instead of setting all to zero
		if (map) this.load(this.sizeX, this.sizeY, map);
		else this.reset();
	}

	public get(x: number, y: number) {
		return this.has(x, y) ? this.map[x + (y * this.sizeX)] : null;
	}

	public has(x: number, y: number) {
		return x >= 0 && x < this.sizeX && y >= 0 && y < this.sizeY;
	}

	public set(x: number, y: number, value: number) {
		if (this.has(x, y)) this.map[x + (y * this.sizeX)] = value;
		return this;
	}

	public delete(x: number, y: number) {
		return this.set(x, y, null);
	}

	public reset() {
		for (let i = 0, square = this.sizeX * this.sizeY; i < square; i++) this.map[i] = 0;
	}

	public load(sizeX: number, sizeY: number, map: number[]) {
		if (map.length !== sizeX * sizeY) {
			throw new Error(`The preset length cannot fill this map, the sizes are not coherent. Expected ${this.sizeX * this.sizeY}, got ${map.length}`);
		}
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		for (let i = 0, square = sizeX * sizeY; i < square; i++) this.map[i] = map[i];
	}

	public unload() {
		this.map.length = 0;
		this.sizeX = 0;
		this.sizeY = 0;
	}

	public generate(tileSize: MapTileSize) {
		let data = '';
		for (const body of chunk(this.map, this.sizeX)) data += `${body.join(',')}\n`;
		this.game.cache.addTilemap('mapTilemap', null, data, Phaser.Tilemap.CSV);
		const map = this.game.add.tilemap('mapTilemap', tileSize.width, tileSize.heigth, this.sizeX, this.sizeY);
		map.addTilesetImage('mapTiles', 'mapTiles', tileSize.width, tileSize.heigth);
		map.createLayer(0);
	}

}

/**
 * The map tile sizes
 */
export interface MapTileSize {
	width: number;
	heigth: number;
}
