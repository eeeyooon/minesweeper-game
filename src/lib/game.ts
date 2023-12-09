import { CELL_TYPE } from './constants';

// 게임 보드 초기화 및 생성
export const initialBoard = (
	rows: number,
	cols: number,
	mineCount: number,
	firstClickRow?: number,
	firstClickCol?: number,
): number[][] => {
	const totalCells = rows * cols;
	const temporary: number[] = Array.from({ length: totalCells }, (_, i) => i);
	const mineLocation: number[] = [];
	const resultBoard: number[][] = Array.from({ length: rows }, () => Array(cols).fill(CELL_TYPE.NOTHING));

	// 첫 번째 클릭 위치가 전달 되면, 해당 위치엔 지뢰가 없도록 적용
	if (firstClickRow !== undefined && firstClickCol !== undefined) {
		const firstClickIndex = firstClickRow * cols + firstClickCol;
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
		const x = mineCell % cols;
		const y = Math.floor(mineCell / cols);
		resultBoard[y][x] = CELL_TYPE.MINE;
	}

	return resultBoard;
};
