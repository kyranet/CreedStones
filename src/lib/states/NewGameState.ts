import { readLine } from '../util/util';
import { PlayState } from './PlayState';

export class NewGameState extends Phaser.State {

	public create() {
		const titleText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 65, 'Insert your name',
			{ font: '65px Arial', fill: '#CDCDCD', align: 'center' });
		titleText.anchor.setTo(0.5, 0.5);

		const inputText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '',
			{ font: '65px Arial', fill: '#CDCDCD', align: 'center' });
		inputText.anchor.setTo(0.5, 0.5);
		inputText.alignTo(titleText, Phaser.BOTTOM_CENTER, 0, 25);

		readLine(inputText, (name) => {
			(this.game.state.states.play as PlayState).gameManager.playerName = name;
			titleText.destroy(true);
			inputText.destroy(true);
			this.game.state.start('play');
		}, { maximumLength: 20 });
	}

}
