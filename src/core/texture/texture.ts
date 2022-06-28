import { Duck } from '../..';
import TextureBase from './textureBase';
import Color from '../renderer/models/color';

/**
 * @class Texture
 * @classdesc Creates a DuckEngine Texture
 * @description The Texture Class. Stores images and colors in a class
 * @template type Texture type, 'image' | 'color' | 'either'
 * @extends TextureBase
 * @since 2.0.0
 */
export default class Texture<
	type extends Duck.Types.Texture.Type
> extends TextureBase<type> {
	/**
	 * @constructor Texture
	 * @description Creates a texture
	 * @param {Duck.Types.Texture.Type} type Texture type
	 * @param {HTMLImageElement | Color} texture Texture source
	 * @param {number} w Width of texture
	 * @param {number} h Height of texture
	 * @since 2.0.0
	 */
	constructor(
		type: Duck.Types.Texture.Type,
		texture: type extends 'image'
			? HTMLImageElement
			: type extends 'either'
			? Color | HTMLImageElement
			: Color,
		w: number,
		h: number
	) {
		if (type === 'image') {
			super('image', 'base', texture as HTMLImageElement, w, h);
		} else if (type === 'color') {
			super('color', 'base', texture as Color, w, h);
		} else {
			super('either', 'base', texture, w, h);
		}
	}
}
