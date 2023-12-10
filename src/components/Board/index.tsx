import styled from 'styled-components';
import Cell from '../Cell';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { openCell, toggleFlag } from '../../slices/gameSlice';
import { CELL_TYPE, GAME_STATUS } from '../../lib/constants';

export default function Board() {
	const dispatch = useDispatch();
	const game = useSelector((state: RootState) => state.game);
	const { cols, rows, board, gameStatus, previousStates } = game;
	console.log(game);

	const handleCellClick = (row: number, col: number) => {
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

	const createBoard = () => {
		const totalCells = cols * rows;
		const cells = [];

		for (let i = 0; i < totalCells; i++) {
			const col = i % rows;
			const row = Math.floor(i / rows);
			cells.push(
				<Cell
					key={`${row}-${col}`}
					row={row}
					col={col}
					cellData={board[row][col]}
					cellText={getCellText(board[row][col], row, col)}
					onClick={() => handleCellClick(row, col)}
					onContextMenu={(e) => handleRightClick(e, row, col)}
				/>,
			);
		}

		return cells;
	};

	return (
		<BoardWrapper $rows={rows} $cols={cols}>
			{createBoard()}
		</BoardWrapper>
	);
}

const BoardWrapper = styled.div<{ $rows: number; $cols: number }>`
	background-color: ${({ theme }) => theme.color.background};
	display: grid;
	grid-template-columns: repeat(${({ $rows }) => $rows}, 40px);
	grid-template-rows: repeat(${({ $cols }) => $cols}, 40px);
	grid-gap: 2px; // 셀 사이의 간격을 추가
	justify-content: center;
	margin: 20px auto 10px auto;
`;
