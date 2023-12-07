import styled from 'styled-components';

export default function Cell() {
	return (
		<CellWrapper>
			<CellBox></CellBox>
			<CellBox></CellBox>
			<SelectedCellBox>2</SelectedCellBox>
			<SelectedCellBox>3</SelectedCellBox>
			<CellBox></CellBox>
		</CellWrapper>
	);
}

const CellWrapper = styled.div``;
const CellBox = styled.div`
	width: 20px;
	height: 20px;
	background-color: ${({ theme }) => theme.color.cell};
	margin: 2px;
`;

const SelectedCellBox = styled.div`
	width: 20px;
	height: 20px;
	line-height: 20px;
	background-color: ${({ theme }) => theme.color.selectedCell};
	color: ${({ theme }) => theme.color.white};
	margin: 2px;
	text-align: center;
`;
