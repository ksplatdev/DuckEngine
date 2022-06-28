import hexNumberToString from '../../../utils/hexNumberToString';

/**
 * @class Color
 * @classdesc Creates a DuckEngine Color
 * @description The Color Class. Hexadecimal or CanvasGradients are stored and managed here, as well as stroke info
 * @since 2.2.0
 */
export default class Color {
	/**
	 * @memberof Color
	 * @description The color itself, string, CanvasGradient, or CanvasPattern. If passed as number, it is converted into a hex color string
	 * @type string | CanvasGradient
	 * @since 2.2.0
	 */
	public value: string | CanvasGradient | CanvasPattern;

	/**
	 * @memberof Color
	 * @description Stroke color if passed, if originally a number hexadecimal color, it is converted to string, optional -> defaults: undefined
	 * @type string | undefined
	 * @default undefined
	 * @since 2.2.0
	 */
	public stroke?: string;

	/**
	 * @memberof Color
	 * @description Stroke width if passed, optional -> defaults: undefined
	 * @type number | undefined
	 * @since 2.2.0
	 */
	public strokeWidth?: number;

	/**
	 * @constructor Color
	 * @description Creates a Color instance
	 * @param {number | string | CanvasGradient | CanvasPattern} value Color value itself, number is converted to string later, hexadecimal, CanvasGradient, and CanvasPattern ONLY
	 * @since 2.2.0
	 */
	constructor(value: number | string | CanvasGradient | CanvasPattern);

	/**
	 * @constructor Color
	 * @description Creates a Color instance
	 * @param {number | string | CanvasGradient | CanvasPattern} value Color value itself, number is converted to string later, hexadecimal, CanvasGradient, and CanvasPattern ONLY
	 * @param {number | string} stroke Stroke color, if originally a number hexadecimal color, it is converted to string, hexadecimal ONLY
	 * @param {number} strokeWidth Stroke width, must be a number
	 * @since 2.2.0
	 */
	constructor(
		value: number | string | CanvasGradient | CanvasPattern,
		stroke: number | string,
		strokeWidth: number
	);

	/**
	 * @constructor Color
	 * @description Creates a Color instance
	 * @param {number | string | CanvasGradient | CanvasPattern} value Color value itself, number is converted to string later, hexadecimal, CanvasGradient, and CanvasPattern ONLY
	 * @param {number | string | undefined} [stroke=undefined] Stroke color if passed, if originally a number hexadecimal color, it is converted to string, hexadecimal ONLY
	 * @param {number | undefined} [strokeWidth=undefined] Stroke width if passed, must be a number
	 * @since 2.2.0
	 */
	constructor(
		value: number | string | CanvasGradient | CanvasPattern,
		stroke?: number | string,
		strokeWidth?: number
	) {
		// convert value so that the CanvasRenderer can skip this step
		typeof value === 'number' ? (value = hexNumberToString(value)) : value;
		typeof stroke === 'number'
			? (stroke = hexNumberToString(stroke))
			: stroke;

		this.value = value;
		this.stroke = stroke;
		this.strokeWidth = strokeWidth;
	}
}
