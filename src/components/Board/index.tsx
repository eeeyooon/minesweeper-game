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
	const { rows, cols, board, gameStatus } = game;
	console.log(gameStatus);
	console.log(game);

	const handleCellClick = (row: number, col: number) => {
		dispatch(openCell({ row, col }));
	};

	const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
		e.preventDefault(); // 기본 오른쪽 클릭 메뉴 방지
		dispatch(toggleFlag({ row, col }));
	};

	const getCellText = (cellType: number) => {
		switch (cellType) {
			case CELL_TYPE.OPEN:
			case CELL_TYPE.NOTHING:
				return '';
			case CELL_TYPE.UNKNOWN:
				switch (gameStatus) {
					case GAME_STATUS.WIN:
						return '🎉';
					case GAME_STATUS.LOSE:
						return '💣';
					default:
						return '❓';
				}
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
		const totalCells = rows * cols;
		const cells = [];

		for (let i = 0; i < totalCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);
			cells.push(
				<Cell
					key={`${row}-${col}`}
					row={row}
					col={col}
					cellData={board[row][col]}
					cellText={getCellText(board[row][col])}
					onClick={() => handleCellClick(row, col)}
					onContextMenu={(e) => handleRightClick(e, row, col)}
				/>,
			);
		}

		return cells;
	};

	const boardWidth = rows * 44;
	const boardHeight = cols * 44;

	return (
		<BoardWrapper $boardWidth={boardWidth} $boardHeight={boardHeight}>
			{createBoard()}
		</BoardWrapper>
	);
}

const BoardWrapper = styled.div<{ $boardWidth: number; $boardHeight: number }>`
	background-color: ${({ theme }) => theme.color.background};
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	width: ${({ $boardWidth }) => `${$boardWidth}px`};
	height: ${({ $boardHeight }) => `${$boardHeight}px`};
	margin: 20px auto 10px auto;
`;
