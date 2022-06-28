import Debug from '../debug/debug';
import Game from '../game';
import Texture from '../texture/texture';
import Scene from '../scene';

import GameObject from './gameObject';
import Color from '../renderer/models/color';

/**
 * @class RoundRect
 * @classdesc Creates a DuckEngine GameObject
 * @description The RoundRect Class. Represents a smooth cornered rect
 * @since 1.0.0-beta
 */
export default class RoundRect extends GameObject<'color'> {
	/**
	 * @constructor RoundRect
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width of RoundRect
	 * @param {number} h Height of RoundRect
	 * @param {number} r Radius of RoundRect
	 * @param {Color} color Color of RoundRect
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0-beta
	 */
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		color: Color,
		game: Game,
		scene: Scene
	) {
		super(
			'roundrect',
			x,
			y,
			w,
			h,
			r,
			Texture.fromColor(color, w, h),
			game,
			scene
		);
	}

	/**
	 * @description Draws the roundrect.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.renderer.ctx) {
			this.game.renderer.drawRoundRect(
				this.position.x,
				this.position.y,
				this.w,
				this.h,
				this.r,
				this.texture.texture
			);
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined as Canvas is undefined.'
			);
		}
	}
}
