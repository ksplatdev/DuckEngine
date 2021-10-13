import Debug from '../debug/debug';
import Game from '../game';
import GameObject from '../gameobjects/gameObject';

export default class CanvasModulate extends GameObject {
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		fillColor: string,
		game: Game
	) {
		super('rect', x, y, w, h, 0, fillColor, game);

		this.zIndex = 1;
	}

	public _draw() {
		if (this.game.ctx) {
			this.game.ctx.fillStyle = this.fillColor;
			this.game.ctx.fillRect(
				this.position.x,
				this.position.y,
				this.w,
				this.h
			);
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. HTMLCanvasElement is undefined.'
			);
		}
	}
}
