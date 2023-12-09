import { CELL_TYPE } from '../../lib/constants';

export const findAroundMine = (board: number[][], row: number, col: number): number => {
	let mineCount = 0;

	// 주변 탐색
	for (let y = row - 1; y <= row + 1; y++) {
		for (let x = col - 1; x <= col + 1; x++) {
			// 현재 셀은 제외
			if (x === col && y === row) {
				continue;
			}

			// 보드 범위 안에 있는지 확인
			if (x >= 0 && x < board[0].length && y >= 0 && y < board.length) {
				// 해당 셀이 지뢰인 경우 카운트 증가
				if (board[y][x] === CELL_TYPE.MINE) {
					mineCount++;
				}
			}
		}
	}

	return mineCount;
};
