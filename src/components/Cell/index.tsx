import styled from 'styled-components';

type CellProps = {
	row: number;
	col: number;
};
export default function Cell({ row, col }: CellProps) {
	return <CellBox></CellBox>;
}

const CellBox = styled.div`
	width: 20px;
	height: 20px;
	background-color: ${({ theme }) => theme.color.cell};
	margin: 2px;
	line-height: 20px;
	color: ${({ theme }) => theme.color.white};
	text-align: center;
	font-size: 10px;
`;
