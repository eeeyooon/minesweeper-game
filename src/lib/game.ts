import { CELL_TYPE } from './constants';

// 게임 보드 초기화 및 생성
export const initialBoard = (
	cols: number,
	rows: number,
	mineCount: number,
	firstClickRow?: number,
	firstClickCol?: number,
): number[][] => {
	const totalCells = cols * rows;
	const temporary: number[] = Array.from({ length: totalCells }, (_, i) => i);
	const mineLocation: number[] = [];
	const resultBoard: number[][] = Array.from({ length: cols }, () => Array(rows).fill(CELL_TYPE.NOTHING));

	// 첫 번째 클릭 위치가 전달 되면, 해당 위치엔 지뢰가 없도록 적용
	if (firstClickRow !== undefined && firstClickCol !== undefined) {
		const firstClickIndex = firstClickRow * rows + firstClickCol;
		temporary.splice(firstClickIndex, 1);
		resultBoard[firstClickRow][firstClickCol] = CELL_TYPE.NOTHING;
	}

	// 지뢰 위치 랜덤 선택
	while (mineLocation.length < mineCount) {
		const randomIndex = Math.floor(Math.random() * temporary.length);
		const chosenLocation = temporary.splice(randomIndex, 1)[0];
		mineLocation.push(chosenLocation);
	}

	// 지뢰 배치
	for (const mineCell of mineLocation) {
		const x = mineCell % rows;
		const y = Math.floor(mineCell / rows);
		resultBoard[y][x] = CELL_TYPE.MINE;
	}

	return resultBoard;
};
