import styled from 'styled-components';

type CellProps = {
	row: number;
	col: number;
	cellData: number;
	cellText: string;
	onClick: () => void;
	onContextMenu: (e: React.MouseEvent) => void;
};
export default function Cell({ row, col, cellData, cellText, onClick, onContextMenu }: CellProps) {
	return (
		<CellBox $cellData={cellData} onClick={onClick} onContextMenu={onContextMenu}>
			{cellText}
		</CellBox>
	);
}

const CellBox = styled.div<{ $cellData: number }>`
	width: 40px;
	height: 40px;
	background-color: ${({ theme, $cellData }) => ($cellData >= 0 ? theme.color.selectedCell : theme.color.cell)};
	margin: 2px;
	line-height: 40px;
	color: ${({ theme }) => theme.color.black};
	text-align: center;
	font-size: 20px;
	cursor: pointer;
`;
