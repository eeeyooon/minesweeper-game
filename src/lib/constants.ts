export const CELL_TYPE = {
	OPEN: 0,
	NOTHING: -1,
	FLAG: -2,
	MINE: -3,
	MINE_FLAG: -4,
} as const;

export const GAME_STATUS = {
	WIN: 'win',
	LOSE: 'lose',
} as const;
