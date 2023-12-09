import styled from 'styled-components';

type CellProps = {
	row: number;
	col: number;
	cellData: number;
	cellText: string;
	onClick: () => void;
};
export default function Cell({ row, col, cellData, cellText, onClick }: CellProps) {
	return (
		<CellBox $cellData={cellData} onClick={onClick}>
			{cellText}
		</CellBox>
	);
}

const CellBox = styled.div<{ $cellData: number }>`
	width: 20px;
	height: 20px;
	background-color: ${({ theme, $cellData }) => ($cellData >= 0 ? theme.color.selectedCell : theme.color.cell)};
	margin: 2px;
	line-height: 20px;
	color: ${({ theme }) => theme.color.black};
	text-align: center;
	font-size: 10px;
	cursor: pointer;
`;
