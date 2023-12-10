import styled from 'styled-components';

export const BoardWrapper = styled.div<{ $rows: number; $cols: number }>`
	background-color: ${({ theme }) => theme.color.background};
	display: grid;
	grid-template-columns: repeat(${({ $rows }) => $rows}, 40px);
	grid-template-rows: repeat(${({ $cols }) => $cols}, 40px);
	grid-gap: 2px;
	justify-content: center;
	margin: 20px auto 10px auto;
`;
