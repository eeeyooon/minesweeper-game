import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialBoard } from '../lib/game';
import { CELL_FLAG } from '../lib/constants';
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
			const { row, col } = action.payload;
			const cell = state.board[row][col];

			if (state.gameStatus === 'waiting') {
				state.gameStatus = 'playing';
			}

			if (cell === CELL_FLAG.OPEN || cell === CELL_FLAG.FLAG) {
				return;
			}

			// 셀이 지뢰인 경우
			if (cell === CELL_FLAG.MINE) {
				state.gameStatus = 'lose';
			} else if (cell !== CELL_FLAG.MINE) {
				// 지뢰가 아닌 경우
				const mineCount = findAroundMine(state.board, row, col);
				state.board[row][col] = mineCount > 0 ? mineCount : CELL_FLAG.OPEN;
				state.openCellCount += 1;

				// 승리 조건
				if (state.openCellCount === state.rows * state.cols - state.mineCount) {
					state.gameStatus = 'win';
				}
			}
		},
	},
});

export const { startGame, openCell } = gameSlice.actions;

export default gameSlice.reducer;
