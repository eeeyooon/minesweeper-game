import styled from 'styled-components';
import Cell from '../Cell';

export default function Board() {
	return (
		<BoardWrapper>
			<Cell />
		</BoardWrapper>
	);
}

const BoardWrapper = styled.div`
	margin-top: 20px;
	background-color: ${({ theme }) => theme.color.background};
`;
