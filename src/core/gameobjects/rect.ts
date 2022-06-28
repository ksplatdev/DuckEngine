import Game from '../game';
import Debug from '../debug/debug';
import GameObject from './gameObject';
import Texture from '../texture/texture';
import Scene from '../scene';
import Color from '../renderer/models/color';

/**
 * @class Rect
 * @classdesc Creates a DuckEngine Rect
 * @description The Rect Class. Represents a rectangle
 * @since 1.0.0-beta
 */
export default class Rect extends GameObject<'color'> {
	/**
	 * @constructor Rect
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width of Rect
	 * @param {number} h Height of Rect
	 * @param {Color} color Color of Rect
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0-beta
	 */
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		color: Color,
		game: Game,
		scene: Scene
	) {
		super(
			'rect',
			x,
			y,
			w,
			h,
			0,
			Texture.fromColor(color, w, h),
			game,
			scene
		);
	}

	/**
	 * @description Draws the rect.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.renderer.ctx) {
			this.game.renderer.drawRect(
				this.position.x,
				this.position.y,
				this.w,
				this.h,
				this.texture.texture
			);
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. HTMLCanvasElement is undefined.'
			);
		}
	}
}
