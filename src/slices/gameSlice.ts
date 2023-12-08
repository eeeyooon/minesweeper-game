import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialBoard } from '../lib/game';

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
	},
});

export const { startGame } = gameSlice.actions;

export default gameSlice.reducer;
