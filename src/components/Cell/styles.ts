import styled from 'styled-components';

export const CellBox = styled.div<{ $cellData: number }>`
	width: 40px;
	height: 40px;
	background-color: ${({ theme, $cellData }) => ($cellData >= 0 ? theme.color.selectedCell : theme.color.cell)};
	line-height: 40px;
	color: ${({ theme }) => theme.color.black};
	text-align: center;
	font-size: 20px;
	cursor: pointer;
`;
