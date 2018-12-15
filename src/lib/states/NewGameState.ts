import { readLine } from '../util/util';
import { PlayState } from './PlayState';

export class NewGameState extends Phaser.State {

	public create() {
		const text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'Insert your name',
			{ font: '65px Arial', fill: '#CDCDCD', align: 'center' });
		text.anchor.set(0.5);
		readLine(this.game, { x: this.game.world.centerX, y: this.game.world.centerY }, (name) => {
			(this.game.state.states.play as PlayState).gameManager.playerName = name;
			text.destroy(true);
			this.game.state.start('play');
		});
	}

}
