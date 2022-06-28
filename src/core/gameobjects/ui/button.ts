import { Duck } from '../../../index';
import Debug from '../../debug/debug';
import Game from '../../game';
import rectToRectIntersect from '../../physics/utils/rectToRectIntersect';
import Scene from '../../scene';
import Text from './text';
import Texture from '../../texture/texture';
import EVENTS from '../../events/events';
import UI from './ui';
import Color from '../../renderer/models/color';

/**
 * @class Button
 * @classdesc Creates a DuckEngine Button
 * @description The Button Class. Acts like a Button
 * @extends UI
 * @since 1.0.0
 */
export default class Button extends UI<'either'> {
	/**
	 * @memberof Button
	 * @description Shape of the button
	 * @type Duck.Types.UI.Button.Shape
	 * @since 1.0.0
	 */
	public shape: Duck.Types.UI.Button.Shape;

	/**
	 * @memberof Button
	 * @description Text of the button, Text instance
	 * @type Text
	 * @since 1.0.0
	 */
	public text: Text;

	/**
	 * @memberof Button
	 * @description Hovering state
	 * @type boolean
	 * @since 1.0.0
	 */
	public hovering: boolean;

	/**
	 * @constructor
	 * @description Creates a Button instance
	 * @param {Duck.Types.UI.Button.Shape} shape Shape of the button, 'rect', 'roundrect', or 'sprite'
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width
	 * @param {number} h Height
	 * @param {number} r Radius
	 * @param {string | Color} fillColorOrIMGPath Color or Image path of the button
	 * @param {Text} text Text instance to render on top of the button
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0
	 */
	constructor(
		shape: Duck.Types.UI.Button.Shape,
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		fillColorOrIMGPath: string | Color,
		text: Text,
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
			Texture.fromEither(fillColorOrIMGPath, w, h),
			game,
			scene
		);
		this.shape = shape;
		this.text = text;

		this.hovering = false;

		this.zIndex = Duck.Layers.Rendering.zIndex.button;

		if (this.game.canvas) {
			this.game.canvas.addEventListener('click', (e) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const rect = this.game.canvas!.getBoundingClientRect();
				const mousePos = {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				};

				const buttonPos = { x: this.position.x, y: this.position.y };

				if (this.scene.currentCamera) {
					const coords = this.scene.currentCamera.worldToScreen(
						this.position.x,
						this.position.y,
						this
					);
					buttonPos.x = coords.position.x;
					buttonPos.y = coords.position.y;
				}

				if (
					rectToRectIntersect(
						{
							position: buttonPos,
							w: this.w,
							h: this.h,
						},
						{
							position: { x: mousePos.x, y: mousePos.y },
							w: 1,
							h: 1,
						}
					) &&
					this.scene.visible
				) {
					this.game.eventEmitter.emit(EVENTS.BUTTON.CLICK, {
						x: mousePos.x,
						y: mousePos.y,
						type: EVENTS.BUTTON.CLICK,
					});
				}
			});

			// hover
			this.game.canvas.addEventListener('mousemove', (e) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const rect = this.game.canvas!.getBoundingClientRect();
				const mousePos = {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				};

				const buttonPos = { x: this.position.x, y: this.position.y };

				if (this.scene.currentCamera) {
					const coords = this.scene.currentCamera.worldToScreen(
						this.position.x,
						this.position.y,
						this
					);
					buttonPos.x = coords.position.x;
					buttonPos.y = coords.position.y;
				}

				if (
					rectToRectIntersect(
						{
							position: buttonPos,
							w: this.w,
							h: this.h,
						},
						{
							position: { x: mousePos.x, y: mousePos.y },
							w: 1,
							h: 1,
						}
					) &&
					this.scene.visible
				) {
					this.game.eventEmitter.emit(EVENTS.BUTTON.HOVER, {
						x: mousePos.x,
						y: mousePos.y,
						type: EVENTS.BUTTON.HOVER,
					});

					this.hovering = true;
				} else if (this.scene.visible) {
					this.game.eventEmitter.emit(EVENTS.BUTTON.NOTHOVER, {
						x: mousePos.x,
						y: mousePos.y,
						type: EVENTS.BUTTON.NOTHOVER,
					});

					this.hovering = false;
				}
			});
		} else {
			new Debug.Error(
				'Cannot add event listeners to canvas for mouseover and click for button. Canvas element is undefined or null.'
			);
		}
	}

	/**
	 * @description Draws the button.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.renderer.ctx) {
			switch (this.shape) {
				case 'rect':
					this.game.renderer.drawRect(
						this.position.x,
						this.position.y,
						this.w,
						this.h,
						this.texture.texture as unknown as Color
					);
					break;

				case 'roundrect':
					this.game.renderer.drawRoundRect(
						this.position.x,
						this.position.y,
						this.w,
						this.h,
						this.r,
						this.texture.texture as unknown as Color
					);
					break;

				case 'sprite':
					this.game.renderer.drawSprite(
						this.position.x,
						this.position.y,
						this.w,
						this.h,
						this.texture as unknown as Texture<'image'>
					);
					break;

				default:
					new Debug.Error(
						'Cannot draw button. Shape must be a rect, roundrect, or sprite.'
					);
					break;
			}
		}
	}

	/**
	 * @memberof Button
	 * @description Adds an event listener to the button
	 * @param {Duck.Types.UI.Button.ListenerType} type Listener Type, type of event
	 * @param {Duck.Types.UI.Button.ListenerFunc} func Callback function, called on event
	 * @since 1.0.0
	 */
	public on(
		type: Duck.Types.UI.Button.ListenerType,
		func: Duck.Types.UI.Button.ListenerFunc
	) {
		this.game.eventEmitter.on(`BUTTON_${type}`, func);
	}

	/**
	 * @memberof Button
	 * @description Removes an event listener from the button
	 * @param {Duck.Types.UI.Button.ListenerType} type Listener Type, type of event
	 * @since 1.0.0
	 */
	public off(type: Duck.Types.UI.Button.ListenerType) {
		this.game.eventEmitter.off(`BUTTON_${type}`);
	}
}
