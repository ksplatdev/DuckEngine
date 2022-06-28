import { Duck } from '../../..';
import Debug from '../../debug/debug';
import Game from '../../game';
import Texture from '../../texture/texture';
import Scene from '../../scene';
import UI from './ui';
import Color from '../../renderer/models/color';

export default class Panel extends UI<'either'> {
	constructor(
		shape: Duck.Types.Collider.ShapeString,
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		textureKeyOrColor: string | Color,
		game: Game,
		scene: Scene
	) {
		super(
			shape,
			x,
			y,
			w,
			h,
			r,
			scene.loader.textureStack.find((t) => t.key === textureKeyOrColor)
				?.value || Texture.fromEither(textureKeyOrColor, w, h),
			game,
			scene
		);
	}

	public _draw() {
		if (this.game.renderer.ctx) {
			switch (this.shape) {
				case 'circle':
					if (this.texture.texture instanceof Color) {
						this.game.renderer.drawCircle(
							this.position.x,
							this.position.y,
							this.r,
							this.texture.texture
						);
					}
					break;

				case 'rect':
					if (this.texture.texture instanceof Color) {
						this.game.renderer.drawRect(
							this.position.x,
							this.position.y,
							this.w,
							this.h,
							this.texture.texture
						);
					}
					break;

				case 'roundrect':
					if (this.texture.texture instanceof Color) {
						this.game.renderer.drawRoundRect(
							this.position.x,
							this.position.y,
							this.w,
							this.h,
							this.r,
							this.texture.texture
						);
					}
					break;

				case 'sprite':
					if (this.texture.texture instanceof HTMLImageElement) {
						this.game.renderer.drawSprite(
							this.position.x,
							this.position.y,
							this.w,
							this.h,
							this.texture as unknown as Texture<'image'>
						);
					}
					break;

				default:
					break;
			}
		} else {
			new Debug.Error(
				'Cannot draw panel. CanvasRenderingContext2D is undefined'
			);
		}
	}
}
