/* eslint-disable @typescript-eslint/no-non-null-assertion */
import EVENTS from '../../events/events';
import Game from '../../game';
import TextureBase from '../../texture/textureBase';
import TextureSheet from '../../texture/textureSheet';
import BaseRenderer from '../baseRenderer';
import Color from '../models/color';
import { BlendModes } from './const/blendModes';
import RendererPipeline from './pipeline/rendererPipeline';

/**
 * @class CanvasRenderer
 * @classdesc Creates a DuckEngine CanvasRenderer
 * @description The CanvasRenderer Class. Renders everything using the RendererPipeline to pool what to draw
 * @since 2.1.0
 */
export default class CanvasRenderer extends BaseRenderer {
	/**
	 * @memberof CanvasRenderer
	 * @description The Canvas rendering context
	 * @type CanvasRenderingContext2D
	 * @since 2.1.0
	 */
	public ctx: CanvasRenderingContext2D;

	/**
	 * @memberof CanvasRenderer
	 * @description The RenderingPipeline, handles and manages what needs to be drawn and updated
	 * @type RendererPipeline
	 * @since 2.1.0
	 */
	public pipeline: RendererPipeline;

	/**
	 * @constructor CanvasRenderer
	 * @description Creates a CanvasRenderer instance
	 * @param {Game} game Game instance
	 * @param {number} [poolingInterval= 1000 / game.fps] How often the does the RendererPipeline pool visible scenes and renderables
	 * @since 2.1.0
	 */
	constructor(game: Game, poolingInterval = 1000 / game.fps) {
		super(game);

		this.ctx = this.game.canvas.getContext(
			'2d'
		) as CanvasRenderingContext2D;

		this.pipeline = new RendererPipeline(this.game, poolingInterval);
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Gets the poolStack from the pipeline and ticks, updates, and renders the scene and renderables
	 * @param {number} deltaTime Time passed since last frame
	 * @since 2.1.0
	 */
	public render(deltaTime: number) {
		this.pipeline.poolStack.forEach((pool) => {
			if (pool.scene.currentCamera) {
				pool.scene.currentCamera.begin();
			}

			pool.scene.__tick();
			pool.scene.update(deltaTime);

			pool.renderables.forEach((r) => {
				r._draw();
			});

			if (pool.scene.currentCamera) {
				pool.scene.currentCamera.end();
			}
		});
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Calls this.ctx.save
	 * @since 2.1.0
	 */
	public save() {
		this.ctx.save();
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Calls this.ctx.restore
	 * @since 2.1.0
	 */
	public restore() {
		this.ctx.restore();
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Calls this.ctx.translate
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @since 2.1.0
	 */
	public translate(x: number, y: number) {
		this.ctx.translate(x, y);
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Transforms the canvas using this.ctx.transform
	 * @param {number} a
	 * @param {number} b
	 * @param {number} c
	 * @param {number} d
	 * @param {number} e
	 * @param {number} f
	 * @since 2.1.0
	 */
	public transform(
		a: number,
		b: number,
		c: number,
		d: number,
		e: number,
		f: number
	) {
		this.ctx.transform(a, b, c, d, e, f);
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Scales the canvas using this.ctx.scale
	 * @param {number} x X scale
	 * @param {number} y Y scale
	 * @since 2.1.0
	 */
	public scale(x: number, y: number) {
		this.ctx.scale(x, y);
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Sets the font using this.ctx.font =
	 * @param {string} font Font to set to
	 * @since 2.1.0
	 */
	public setFont(font: string) {
		this.ctx.font = font;
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Measures the text using the font
	 * @param {string} font Font to set to
	 * @param {string} text Text measure
	 * @returns {TextMetrics}
	 * @since 2.1.0
	 */
	public measureText(font: string, text: string) {
		this.setFont(font);
		return this.ctx.measureText(text);
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Sets the fillStyle using this.ctx.fillStyle =
	 * @param {Color} color Color to set to
	 * @since 2.1.0
	 */
	public setFillColor(color: Color) {
		this.ctx.fillStyle = color.value;
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Sets the strokeStyle using this.ctx.fillStyle =
	 * @param {Color} color Color to set to
	 * @since 2.1.0
	 */
	public setStrokeColor(color: Color) {
		this.ctx.strokeStyle = color.value;
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Sets the lineWidth using this.ctx.lineWidth =
	 * @param {number} width Width to set as
	 * @since 2.1.0
	 */
	public setLineWidth(width: number) {
		this.ctx.lineWidth = width;
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Draws text to the screen, must set font with this.setFont first and color with this.setFillColor
	 * @param {string} text Text to draw
	 * @param {number} x X Position
	 * @param {number} y Y Position
	 * @param {number} [maxWidth] Max width of text, optional
	 * @since 2.1.0
	 */
	public drawText(text: string, x: number, y: number, maxWidth?: number) {
		this.ctx.fillText(text, x, y, maxWidth);
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Strokes text to the screen, must set font with this.setFont first and color with this.setStrokeColor
	 * @param {string} text Text to draw
	 * @param {number} x X Position
	 * @param {number} y Y Position
	 * @param {number} [maxWidth] Max width of text, optional
	 * @since 2.1.0
	 */
	public strokeText(text: string, x: number, y: number, maxWidth?: number) {
		this.ctx.strokeText(text, x, y, maxWidth);
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Clears the screen
	 * @since 2.1.0
	 */
	public clearFrame() {
		this.ctx.clearRect(
			0,
			0,
			this.game.canvas.width,
			this.game.canvas.height
		);
		this.game.eventEmitter.emit(EVENTS.RENDERER.CLEAR_FRAME);
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Clears an area
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width of area to clear
	 * @param {number} h Height of area to clear
	 * @since 2.1.0
	 */
	public clearRect(x: number, y: number, w: number, h: number) {
		this.ctx.clearRect(x, y, w, h);
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Fills a rectangle
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width of rect
	 * @param {number} h Height of rect
	 * @param {Color} color Color to fill rect with
	 * @since 2.1.0
	 */
	public drawRect(x: number, y: number, w: number, h: number, color: Color) {
		this.setFillColor(color);
		this.ctx.fillRect(x, y, w, h);
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Fills a circle
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} r Radius of circle
	 * @param {Color} color Color to fill circle with
	 * @since 2.1.0
	 */
	public drawCircle(x: number, y: number, r: number, color: Color) {
		this.setFillColor(color);
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
		this.setFillColor(color);
		this.ctx.fill();
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Fills a roundRect
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width of roundRect
	 * @param {number} h Height of roundRect
	 * @param {number} r Radius of roundRect
	 * @param {Color} color Color to fill roundRect with
	 * @since 2.1.0
	 */
	public drawRoundRect(
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		color: Color
	) {
		if (w < 2 * r) r = w / 2;
		if (h < 2 * r) r = h / 2;
		this.setFillColor(color);
		this.ctx.beginPath();
		this.ctx.moveTo(x + r, y);
		this.ctx.arcTo(x + w, y, x + w, y + h, r);
		this.ctx.arcTo(x + w, y + h, x, y + h, r);
		this.ctx.arcTo(x, y + h, x, y, r);
		this.ctx.arcTo(x, y, x + w, y, r);
		this.ctx.closePath();
		this.ctx.fill();
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Draws a sprite
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width of roundRect
	 * @param {number} h Height of roundRect
	 * @param {TextureBase<'image'>} texture Texture to use for the Sprite
	 * @param {number} [currentRow] The default row to use for the texture, for spritesheets
	 * @param {number} [currentCol] The default column to use for the texture, for spritesheets
	 * @since 2.1.0
	 */
	public drawSprite(
		x: number,
		y: number,
		w: number,
		h: number,
		texture: TextureBase<'image'>,
		currentRow?: number,
		currentCol?: number
	) {
		if (texture instanceof TextureSheet) {
			// spritesheet
			this.ctx.drawImage(
				texture.texture, // image
				(currentCol! - 1) * texture.frameWidth!, // source x
				(currentRow! - 1) * texture.frameHeight!, // source y
				texture.frameWidth!, // source width
				texture.frameHeight!, // source height
				x, // target x
				y, // target y
				texture.frameWidth!, // target width
				texture.frameHeight! // target height
			);
		} else {
			// normal sprite
			this.ctx.drawImage(texture.texture, x, y, w, h);
		}
	}

	/**
	 * @memberof CanvasRenderer
	 * @description Sets the blend mode / globalCompositionOperation
	 * @param {keyof typeof BlendModes} blendMode Blend Mode
	 * @since 2.1.0
	 */
	public setBlendMode(blendMode: keyof typeof BlendModes) {
		this.ctx.globalCompositeOperation = blendMode;
	}
}
