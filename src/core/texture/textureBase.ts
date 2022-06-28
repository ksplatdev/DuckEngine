import { Duck } from '../..';
import hexNumberToString from '../../utils/hexNumberToString';
import uniqueID from '../../utils/uniqueID';
import Vector2 from '../math/vector2';
import Color from '../renderer/models/color';

export default class TextureBase<type extends Duck.Types.Texture.Type> {
	/**
	 * @memberof TextureBase
	 * @description The unique identifier for the texture
	 * @type string
	 * @since 2.1.0
	 */
	public readonly id: string;

	/**
	 * @memberof TextureBase
	 * @description The type of texture source, 'image' | 'color' | 'either'
	 * @type Duck.Types.Texture.Type
	 * @since 2.1.0
	 */
	public readonly type: Duck.Types.Texture.Type;

	/**
	 * @memberof TextureBase
	 * @description The data type of texture, 'sheet' | 'base' | 'atlas' | 'list'
	 * @type Duck.Types.Texture.DataType
	 * @since 2.1.0
	 */
	public readonly dataType: Duck.Types.Texture.DataType;

	/**
	 * @memberof TextureBase
	 * @description The texture itself, can be an image or color
	 * @type HTMLImageElement | Color
	 * @since 2.1.0
	 */
	public texture: type extends 'image'
		? HTMLImageElement
		: type extends 'either'
		? Color | HTMLImageElement
		: Color;

	/**
	 * @memberof Texture
	 * @description The scale of the texture
	 * @type Vector2
	 * @since 2.1.0
	 */
	public scale: Vector2;

	/**
	 * @constructor Texture
	 * @description Creates an image texture
	 * @param {'image'} type Texture type
	 * @param {Duck.Types.Texture.DataType} dataType Texture DataType, ex: sheet, base, atlas
	 * @param {HTMLImageElement} texture Texture source
	 * @param {number} w Width of texture
	 * @param {number} h Height of texture
	 * @since 2.1.0
	 */
	constructor(
		type: 'image',
		dataType: Duck.Types.Texture.DataType,
		texture: HTMLImageElement,
		w: number,
		h: number
	);

	/**
	 * @constructor Texture
	 * @description Creates a color texture
	 * @param {'color'} type Texture type
	 * @param {Duck.Types.Texture.DataType} dataType Texture DataType, ex: sheet, base, atlas
	 * @param {Color} texture Texture source
	 * @param {number} w Width of texture
	 * @param {number} h Height of texture
	 * @since 2.1.0
	 */
	constructor(
		type: 'color',
		dataType: Duck.Types.Texture.DataType,
		texture: Color,
		w: number,
		h: number
	);

	/**
	 * @constructor Texture
	 * @description Creates a color or image texture
	 * @param {'either'} type Texture type
	 * @param {Duck.Types.Texture.DataType} dataType Texture DataType, ex: sheet, base, atlas
	 * @param {HTMLImageElement | Color | string} texture Texture source
	 * @param {number} w Width of texture
	 * @param {number} h Height of texture
	 * @since 2.1.0
	 */
	constructor(
		type: 'either',
		dataType: Duck.Types.Texture.DataType,
		texture: HTMLImageElement | Color | string,
		w: number,
		h: number
	);

	/**
	 * @constructor Texture
	 * @description Creates a texture
	 * @param {Duck.Types.Texture.Type} type Texture type
	 * @param {Duck.Types.Texture.DataType} dataType Texture DataType, ex: sheet, base, atlas
	 * @param {HTMLImageElement | Color} texture Texture source
	 * @param {number} w Width of texture
	 * @param {number} h Height of texture
	 * @since 2.1.0
	 */
	constructor(
		type: Duck.Types.Texture.Type,
		dataType: Duck.Types.Texture.DataType,
		texture: type extends 'image'
			? HTMLImageElement
			: type extends 'either'
			? Color | HTMLImageElement
			: Color,
		w: number,
		h: number
	) {
		this.id = uniqueID();
		this.type = type;
		this.dataType = dataType;

		this.texture = texture;
		this.scale = new Vector2(w, h);

		if (this.type === 'image') {
			(this.texture as HTMLImageElement).width = this.scale.x;
			(this.texture as HTMLImageElement).height = this.scale.y;
		}
	}

	/**
	 * @memberof Texture
	 * @description Sets the Texture Scale
	 * @param {Duck.Types.Misc.Scale} scale New scale of the texture
	 * @since 2.1.0
	 */
	public setScale(scale: Duck.Types.Misc.Scale) {
		this.scale = new Vector2(scale.width, scale.height);

		if (this.type === 'image') {
			(this.texture as HTMLImageElement).width = this.scale.x;
			(this.texture as HTMLImageElement).height = this.scale.y;
		}

		return this.scale;
	}

	/**
	 * @memberof Texture
	 * @description Sets the Texture Image Path if the type is image
	 * @param {string} imagePath New imagePath of the texture
	 * @since 2.1.0
	 */
	public setImagePath(imagePath: string) {
		if (this.type === 'image') {
			(this.texture as HTMLImageElement).src = imagePath;
		}
	}

	/**
	 * @memberof Texture
	 * @description Sets the Texture color if the type is color
	 * @param {string} color New color of the texture
	 * @since 2.1.0
	 */
	public setFillColor(color: string | number) {
		if (this.type === 'color') {
			typeof color === 'number'
				? (color = hexNumberToString(color))
				: color;
			(this.texture as Color).value = color;
		}
	}

	/**
	 * @memberof TextureBase
	 * @description Creates a new TextureBase instance from a color
	 * @param {Color} color Color
	 * @param {number} w Width
	 * @param {number} h Height
	 * @static
	 * @returns {TextureBase<'color'>}
	 * @since 2.1.0
	 */
	public static fromColor(color: Color, w: number, h: number) {
		return new TextureBase<'color'>('color', 'base', color, w, h);
	}

	/**
	 * @memberof TextureBase
	 * @description Creates a new TextureBase instance from an image path
	 * @param {string} imgpath Image path
	 * @param {number} w Width
	 * @param {number} h Height
	 * @static
	 * @returns {TextureBase<'image'>}
	 * @since 2.1.0
	 */
	public static fromTexture(imgpath: string, w: number, h: number) {
		const img = new Image(w, h);
		img.src = imgpath;

		return new TextureBase<'image'>('image', 'base', img, w, h);
	}

	/**
	 * @memberof TextureBase
	 * @description Creates a new TextureBase instance from a color or an image path
	 * @param {string | Color} fillColorOrIMGPath Color or Image path
	 * @param {number} w Width
	 * @param {number} h Height
	 * @static
	 * @returns {TextureBase<'either'>}
	 * @since 2.1.0
	 */
	public static fromEither(
		fillColorOrIMGPath: string | Color,
		w: number,
		h: number
	) {
		return new TextureBase<'either'>(
			'either',
			'base',
			fillColorOrIMGPath,
			w,
			h
		);
	}
}
