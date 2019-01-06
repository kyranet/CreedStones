import { PathFinderPlugin } from '../plugins/PathFinderPlugin';
import { LOADING_POSITION, WIN_WIDTH } from '../util/constants';
import { GameState } from './GameState';

export class BootState extends GameState {

	private loadingBar: Phaser.Graphics = null;
	private onFileCompleteCallback: (progress: number) => void = null;
	private onLoadCompleteCallback: () => void = null;

	public preload() {
		this.loadingBar = this.game.add.graphics(LOADING_POSITION.x, LOADING_POSITION.y);
		this.loadingBar.beginFill(0xFFFFFF);

		this.game.load.onFileComplete.add(this.onFileCompleteCallback = (progress: number) => {
			this.loadingBar.drawRect(0, 0, (progress / 100) * WIN_WIDTH, 5);
		});

		this.game.load.onLoadComplete.add(this.onLoadCompleteCallback = () => {
			this.loadingBar.endFill();
		});

		this.game.load.spritesheet('player', 'images/player.png', 48, 96);
		this.game.load.spritesheet('enemy', 'images/enemy.png', 48, 96);
		this.game.load.spritesheet('enemyTarget', 'images/enemy-target.png', 48, 96);
<<<<<<< HEAD
		this.game.load.atlas('objects', 'images/objects.png', 'images/objects_atlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
=======
		this.game.load.spritesheet('objects', 'images/objects.png', 48, 48);
>>>>>>> parent of 2d778f1... assets: added atlas for objects
		this.game.load.tilemap('Level-0', 'json/Level-0.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('overworld', 'images/overworld.png');
		this.game.load.image('cave', 'images/cave.png');
		this.game.load.image('logo', 'images/StonesCreed.png');
	}

	public create() {
		this.game.pathFinder = this.game.plugins.add(PathFinderPlugin);
		this.game.state.start('menu');
	}

	public shutdown(game: Phaser.Game) {
		// Clean up event listeners and destroy the loading bar
		this.game.load.onFileComplete.remove(this.onFileCompleteCallback);
		this.game.load.onLoadComplete.remove(this.onLoadCompleteCallback);
		this.loadingBar.destroy(true);

		// Clean up the variables, and call the inherited shutdown
		this.onFileCompleteCallback = null;
		this.onLoadCompleteCallback = null;
		this.loadingBar = null;
		super.shutdown(game);
	}

}
