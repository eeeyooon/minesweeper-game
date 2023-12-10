import Cell from '../Cell';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { openCell, toggleFlag } from '../../slices/gameSlice';
import { CELL_TYPE, GAME_STATUS } from '../../lib/constants';
import { BoardWrapper } from './styles';
import { useMemo } from 'react';

export default function Board() {
	const dispatch = useDispatch();
	const game = useSelector((state: RootState) => state.game);
	const { cols, rows, board, gameStatus, previousStates } = game;

	const handleLeftClick = (row: number, col: number) => {
		dispatch(openCell({ row, col }));
	};

	const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
		e.preventDefault();
		dispatch(toggleFlag({ row, col }));
	};

	const getCellText = (cellType: number, row: number, col: number) => {
		switch (cellType) {
			case CELL_TYPE.OPEN:
			case CELL_TYPE.NOTHING:
				return '';
			case CELL_TYPE.UNKNOWN:
				if (gameStatus === GAME_STATUS.LOSE && previousStates[row][col] === CELL_TYPE.MINE) {
					return '💣';
				}
				return '❓';
			case CELL_TYPE.FLAG:
				return '🚩';
			case CELL_TYPE.MINE_FLAG:
				switch (gameStatus) {
					case GAME_STATUS.WIN:
						return '🎉';
					case GAME_STATUS.LOSE:
						return '💣';
					default:
						return '🚩';
				}
			case CELL_TYPE.MINE:
				switch (gameStatus) {
					case GAME_STATUS.WIN:
						return '🎉';
					case GAME_STATUS.LOSE:
						return '💣';
					default:
						return '';
				}
			default:
				return cellType.toString();
		}
	};

	const createBoard = useMemo(() => {
		const totalCells = cols * rows;
		const cells = [];

		for (let i = 0; i < totalCells; i++) {
			const col = i % rows;
			const row = Math.floor(i / rows);
			cells.push(
				<Cell
					key={`${row}-${col}`}
					cellData={board[row][col]}
					cellText={getCellText(board[row][col], row, col)}
					onClick={() => handleLeftClick(row, col)}
					onContextMenu={(e) => handleRightClick(e, row, col)}
				/>,
			);
		}

		return cells;
	}, [cols, rows, board, gameStatus, previousStates]);

	return (
		<BoardWrapper $rows={rows} $cols={cols}>
			{createBoard}
		</BoardWrapper>
	);
}
