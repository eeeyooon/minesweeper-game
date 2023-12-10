import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialBoard } from '../lib/game';
import { CELL_TYPE, GAME_STATUS } from '../lib/constants';
import { findAroundMine } from '../components/service/minesweeper';

interface GameState {
	board: number[][];
	previousStates: number[][];
	rows: number;
	cols: number;
	gameStatus: 'waiting' | 'playing' | 'win' | 'lose';
	mineCount: number;
	allFlagCount: number;
	mineFlagCount: number;
	openCellCount: number;
	startTime: number;
	level: 'beginner' | 'intermediate' | 'expert' | 'custom';
}

const initialState: GameState = {
	board: initialBoard(8, 8, 10) as number[][],
	previousStates: Array.from({ length: 8 }, () => Array(8).fill(CELL_TYPE.NOTHING)),
	rows: 8,
	cols: 8,
	gameStatus: 'waiting',
	mineCount: 10,
	allFlagCount: 0,
	mineFlagCount: 0,
	openCellCount: 0,
	startTime: 0,
	level: 'beginner',
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		startGame: (state): void => {
			state.board = initialBoard(state.rows, state.cols, state.mineCount);
			state.previousStates = Array.from({ length: state.rows }, () => Array(state.cols).fill(CELL_TYPE.NOTHING));
			state.rows = 8;
			state.cols = 8;
			state.gameStatus = 'waiting';
			state.mineCount = 10;
			state.allFlagCount = 0;
			state.mineFlagCount = 0;
			state.openCellCount = 0;
			state.startTime = Date.now();
		},
		openCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
			const { row, col } = action.payload;
			if (state.gameStatus === GAME_STATUS.LOSE || state.gameStatus === GAME_STATUS.WIN) {
				return;
			}

			if (state.gameStatus === GAME_STATUS.WAITING) {
				state.board = initialBoard(state.rows, state.cols, state.mineCount, row, col);
				state.gameStatus = GAME_STATUS.PLAYING;
				state.startTime = Date.now();
			}

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

				const mineCount = findAroundMine(state.board, state.previousStates, row, col);
				if (state.board[row][col] === CELL_TYPE.NOTHING) {
					state.board[row][col] = mineCount > 0 ? mineCount : CELL_TYPE.OPEN;
					state.openCellCount++;
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

			openCellRecursive(row, col);

			// 승리 조건
			const isWin =
				state.openCellCount === state.rows * state.cols - state.mineCount &&
				!state.board.some((row) => row.some((cell) => cell === CELL_TYPE.UNKNOWN));

			if (isWin) {
				state.gameStatus = GAME_STATUS.WIN;
			}
		},
		toggleFlag: (state, action: PayloadAction<{ row: number; col: number }>) => {
			const { row, col } = action.payload;
			const cell = state.board[row][col];

			switch (cell) {
				case CELL_TYPE.MINE:
					state.previousStates[row][col] = cell;
					state.board[row][col] = CELL_TYPE.MINE_FLAG;
					state.allFlagCount += 1;
					state.mineFlagCount += 1;
					break;
				case CELL_TYPE.MINE_FLAG:
					state.board[row][col] = CELL_TYPE.UNKNOWN;
					state.allFlagCount -= 1;
					state.mineFlagCount -= 1;
					break;
				case CELL_TYPE.NOTHING:
					state.previousStates[row][col] = cell;
					state.board[row][col] = CELL_TYPE.FLAG;
					state.allFlagCount += 1;
					break;
				case CELL_TYPE.FLAG:
					state.board[row][col] = CELL_TYPE.UNKNOWN;
					state.allFlagCount -= 1;
					break;
				case CELL_TYPE.UNKNOWN:
					state.board[row][col] = state.previousStates[row][col];
					break;
				default:
					break;
			}

			// 승리 조건
			if (state.mineFlagCount === state.mineCount) {
				state.gameStatus = GAME_STATUS.WIN;
			}
		},
	},
});

export const { startGame, openCell, toggleFlag } = gameSlice.actions;

export default gameSlice.reducer;
