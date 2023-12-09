import { CELL_TYPE } from '../../lib/constants';

export const findAroundMine = (board: number[][], row: number, col: number): number => {
	let mineCount = 0;
	for (let y = row - 1; y <= row + 1; y++) {
		for (let x = col - 1; x <= col + 1; x++) {
			if (x === col && y === row) continue;
			if (x >= 0 && x < board[0].length && y >= 0 && y < board.length) {
				if (board[y][x] === CELL_TYPE.MINE || board[y][x] === CELL_TYPE.MINE_FLAG) {
					mineCount++;
				}
			}
		}
	}
	return mineCount;
};
