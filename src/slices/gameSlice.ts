import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialBoard } from '../lib/initialBoard';
import { CELL_TYPE, GAME_LEVEL, GAME_STATUS } from '../lib/constants';
import { findAroundMine } from '../lib/findAroundMine';

interface GameState {
	board: number[][];
	previousStates: number[][];
	cols: number;
	rows: number;
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
	cols: 8,
	rows: 8,
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
			if (state.level === GAME_LEVEL.CUSTOM) {
				state.board = initialBoard(state.cols, state.rows, state.mineCount);
				state.previousStates = Array.from({ length: state.cols }, () => Array(state.rows).fill(CELL_TYPE.NOTHING));
			} else {
				switch (state.level) {
					case GAME_LEVEL.BEGINNER:
						state.rows = 8;
						state.cols = 8;
						state.mineCount = 10;
						break;
					case GAME_LEVEL.INTERMEDIATE:
						state.rows = 16;
						state.cols = 16;
						state.mineCount = 40;
						break;
					case GAME_LEVEL.EXPERT:
						state.rows = 32;
						state.cols = 16;
						state.mineCount = 100;
						break;
				}
				state.board = initialBoard(state.cols, state.rows, state.mineCount);
				state.previousStates = Array.from({ length: state.cols }, () => Array(state.rows).fill(CELL_TYPE.NOTHING));
			}
			state.gameStatus = 'waiting';
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
				state.board = initialBoard(state.cols, state.rows, state.mineCount, row, col);
				state.gameStatus = GAME_STATUS.PLAYING;
				state.startTime = Date.now();
			}

			const openCellRecursive = (row: number, col: number) => {
				if (row < 0 || row >= state.cols || col < 0 || col >= state.rows) {
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

			// 승리조건
			const isWin =
				state.openCellCount === state.cols * state.rows - state.mineCount &&
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
			if (
				state.openCellCount === state.cols * state.rows - state.mineCount &&
				state.mineFlagCount === state.mineCount
			) {
				state.gameStatus = GAME_STATUS.WIN;
			}
		},
		selectLevel: (state, action: PayloadAction<{ level: 'beginner' | 'intermediate' | 'expert' }>) => {
			const { level } = action.payload;

			switch (level) {
				case GAME_LEVEL.BEGINNER:
					state.rows = 8;
					state.cols = 8;
					state.mineCount = 10;
					state.level = GAME_LEVEL.BEGINNER;
					break;
				case GAME_LEVEL.INTERMEDIATE:
					state.rows = 16;
					state.cols = 16;
					state.mineCount = 40;
					state.level = GAME_LEVEL.INTERMEDIATE;
					break;
				case GAME_LEVEL.EXPERT:
					state.rows = 32;
					state.cols = 16;
					state.mineCount = 100;
					state.level = GAME_LEVEL.EXPERT;
					break;
				default:
					break;
			}

			state.board = initialBoard(state.cols, state.rows, state.mineCount);
			state.previousStates = Array.from({ length: state.cols }, () => Array(state.rows).fill(CELL_TYPE.NOTHING));
			state.gameStatus = GAME_STATUS.WAITING;
			state.allFlagCount = 0;
			state.mineFlagCount = 0;
			state.openCellCount = 0;
			state.startTime = 0;
		},
		customLevel: (state, action: PayloadAction<{ rows: number; cols: number; mineCount: number }>) => {
			const { rows, cols, mineCount } = action.payload;
			state.level = 'custom';
			state.rows = rows;
			state.cols = cols;
			state.mineCount = mineCount;
			state.board = initialBoard(cols, rows, mineCount);
			state.previousStates = Array.from({ length: cols }, () => Array(rows).fill(CELL_TYPE.NOTHING));
			state.gameStatus = 'waiting';
			state.allFlagCount = 0;
			state.mineFlagCount = 0;
			state.openCellCount = 0;
			state.startTime = 0;
		},
	},
});

export const { startGame, openCell, toggleFlag, selectLevel, customLevel } = gameSlice.actions;

export default gameSlice.reducer;
