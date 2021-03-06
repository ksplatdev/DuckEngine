import { Duck } from '../../index';

export default function rgbToRGBA(
	color: string,
	alpha: Duck.Types.Helper.AlphaRange
) {
	let new_col = '';
	new_col = color.replace(/rgb/i, 'rgba');
	new_col = new_col.replace(/\)/i, `,${alpha})`);
	return new_col;
}
