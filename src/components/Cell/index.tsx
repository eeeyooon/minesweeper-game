import styled from 'styled-components';
import { CELL_TYPE } from '../../lib/constants';

type CellProps = {
	row: number;
	col: number;
	cellData: number;
	onClick: () => void;
};
export default function Cell({ row, col, cellData, onClick }: CellProps) {
	const getText = (data: number) => {
		switch (data) {
			case CELL_TYPE.MINE:
				return '지뢰';
			case CELL_TYPE.NOTHING:
				return '';
			case CELL_TYPE.OPEN:
				return '';
			default:
				return data;
		}
	};

	return <CellBox onClick={onClick}>{getText(cellData)}</CellBox>;
}

const CellBox = styled.div`
	width: 20px;
	height: 20px;
	background-color: ${({ theme }) => theme.color.cell};
	margin: 2px;
	line-height: 20px;
	color: ${({ theme }) => theme.color.black};
	text-align: center;
	font-size: 10px;
	cursor: pointer;
`;
