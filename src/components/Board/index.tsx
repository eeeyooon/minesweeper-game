import styled from 'styled-components';
import Cell from '../Cell';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { openCell } from '../../slices/gameSlice';

export default function Board() {
	const dispatch = useDispatch();
	const game = useSelector((state: RootState) => state.game);
	const { rows, cols, board, gameStatus } = game;
	console.log(gameStatus);
	console.log(game);

	const handleCellClick = (row: number, col: number) => {
		dispatch(openCell({ row, col }));
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
					onClick={() => handleCellClick(row, col)}
				/>,
			);
		}

		return cells;
	};

	const boardWidth = rows * 24;
	const boardHeight = cols * 24;

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
