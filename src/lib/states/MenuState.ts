import { PlayState } from './PlayState';

export class MenuState extends Phaser.State {

	public texts: Phaser.Text[] = [];
	public logo: Phaser.Sprite = null;

	public create() {
		this.game.stage.backgroundColor = '#2A1B19';
		this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 120, 'logo');
		this.logo.anchor.setTo(0.5, 0.5);
		this.logo.scale.setTo(0.5, 0.5);

		this.createButton('New Game', () => {
			this.game.state.start('newGame');
		});
		if (localStorage.getItem('level')) this.createButton('Continue', () => {
			(this.game.state.states.play as PlayState).gameManager.storageManager.load();
		});
	}

	public shutdown() {
		for (const text of this.texts) text.destroy(true);
		this.texts.length = 0;
		this.logo.destroy(true);
		super.shutdown();
	}

	private createButton(name: string, cb: Function) {
		const text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, name, { font: '65px Arial', fill: '#CDCDCD', align: 'center' });
		text.anchor.set(0.5);
		text.inputEnabled = true;
		text.events.onInputUp.add(cb, this);
		text.events.onInputDown.add(() => {
			text.fill = '#FF0044';
			text.events.onInputOver.removeAll();
			text.events.onInputOut.removeAll();
		});
		text.events.onInputOver.add(() => { text.fill = '#FFFFFF'; });
		text.events.onInputOut.add(() => { text.fill = '#EFEFEF'; });
		this.texts.push(text);
		text.alignTo(this.texts.length ? this.texts[this.texts.length - 1] : this.logo, Phaser.BOTTOM_CENTER, 16);
	}

}
