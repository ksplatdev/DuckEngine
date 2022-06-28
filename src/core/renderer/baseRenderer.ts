import Game from '../game';
import TextureBase from '../texture/textureBase';
import { BlendModes } from './canvas/const/blendModes';
import Color from './models/color';

export default abstract class BaseRenderer {
	public game: Game;

	constructor(game: Game) {
		this.game = game;
	}

	abstract clearFrame(): void;
	abstract drawRect(
		x: number,
		y: number,
		w: number,
		h: number,
		color: Color
	): void;
	abstract drawCircle(x: number, y: number, r: number, color: Color): void;
	abstract drawRoundRect(
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		color: Color
	): void;
	abstract drawSprite(
		x: number,
		y: number,
		w: number,
		h: number,
		texture: TextureBase<'image'>,
		frameWidth?: number,
		frameHeight?: number,
		currentRow?: number,
		currentCol?: number
	): void;
	abstract save(): void;
	abstract restore(): void;
	abstract scale(x: number, y: number): void;
	abstract translate(x: number, y: number): void;
	abstract transform(
		a: number,
		b: number,
		c: number,
		d: number,
		e: number,
		f: number
	): void;
	abstract setFont(font: string): void;
	abstract measureText(font: string, text: string): void;
	abstract drawText(
		text: string,
		x: number,
		y: number,
		maxWidth?: number
	): void;
	abstract strokeText(
		text: string,
		x: number,
		y: number,
		maxWidth?: number
	): void;
	abstract setFillColor(color: Color): void;
	abstract setStrokeColor(color: Color): void;
	abstract setLineWidth(width: number): void;
	abstract setBlendMode(blendMode: keyof typeof BlendModes): void;
}
