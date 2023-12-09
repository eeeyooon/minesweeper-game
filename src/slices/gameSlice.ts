import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialBoard } from '../lib/game';
import { CELL_TYPE, GAME_STATUS } from '../lib/constants';
import { findAroundMine } from '../components/service/minesweeper';

interface GameState {
	board: number[][];
	rows: number;
	cols: number;
	gameStatus: 'waiting' | 'playing' | 'win' | 'lose';
	mineCount: number;
	flagCount: number;
	openCellCount: number;
	timer: number;
	level: 'beginner' | 'intermediate' | 'expert' | 'custom';
}

const initialState: GameState = {
	board: initialBoard(8, 8, 10) as number[][],
	rows: 8,
	cols: 8,
	gameStatus: 'waiting',
	mineCount: 10,
	flagCount: 0,
	openCellCount: 0,
	timer: 0,
	level: 'beginner',
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		startGame: (state): void => {
			state.board = initialBoard(state.rows, state.cols, state.mineCount);
			state.rows = 8;
			state.cols = 8;
			state.gameStatus = 'waiting';
			state.mineCount = 10;
			state.flagCount = 0;
			state.openCellCount = 0;
			state.timer = 0;
		},
		openCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
			const openCellRecursive = (row: number, col: number) => {
				if (row < 0 || row >= state.rows || col < 0 || col >= state.cols) {
					return;
				}

				const cell = state.board[row][col];
				if (cell !== CELL_TYPE.NOTHING && cell !== CELL_TYPE.MINE) {
					return;
				}

				if (cell === CELL_TYPE.MINE) {
					state.gameStatus = GAME_STATUS.LOSE;
					return;
				}

				const mineCount = findAroundMine(state.board, row, col);
				state.board[row][col] = mineCount > 0 ? mineCount : CELL_TYPE.OPEN;
				if (cell === CELL_TYPE.NOTHING) {
					state.openCellCount += 1; // 셀을 처음 열 때만 개수 증가
				}

				if (mineCount === 0) {
					// 주변에 지뢰가 없는 경우
					for (let y = row - 1; y <= row + 1; y++) {
						for (let x = col - 1; x <= col + 1; x++) {
							if (x === col && y === row) {
								continue; // 현재 셀은 건너뛰기
							}
							openCellRecursive(y, x); // 주변 셀 재귀적으로 열기
						}
					}
				}
			};

			openCellRecursive(action.payload.row, action.payload.col);

			// 승리 조건
			if (state.openCellCount === state.rows * state.cols - state.mineCount) {
				state.gameStatus = GAME_STATUS.WIN;
			}
		},
	},
});

export const { startGame, openCell } = gameSlice.actions;

export default gameSlice.reducer;
