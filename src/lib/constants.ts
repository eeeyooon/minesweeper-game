export const CELL_TYPE = {
	OPEN: 0,
	NOTHING: -1,
	FLAG: -2,
	MINE: -3,
	MINE_FLAG: -4,
	UNKNOWN: -5,
} as const;

export const GAME_STATUS = {
	WIN: 'win',
	LOSE: 'lose',
	PLAYING: 'playing',
	WAITING: 'waiting',
} as const;

export const GAME_LEVEL = {
	BEGINNER: 'beginner',
	INTERMEDIATE: 'intermediate',
	EXPERT: 'expert',
	CUSTOM: 'custom',
} as const;
