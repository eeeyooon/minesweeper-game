import styled from 'styled-components';
import Cell from '../Cell';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Board() {
	const { rows, cols, board } = useSelector((state: RootState) => state.game);

	console.log(board);

	const createBoard = () => {
		const totalCells = rows * cols;
		const cells = [];

		for (let index = 0; index < totalCells; index++) {
			const row = index % cols;
			const col = Math.floor(index / cols);
			cells.push(<Cell key={`${row}-${col}`} row={row} col={col} />);
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
