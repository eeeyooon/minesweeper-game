import styled from 'styled-components';

export default function Menu() {
	return (
		<MenuWrapper>
			<SelectLevelWrapper>
				<LevelButton>Beginner</LevelButton>
				<LevelButton>Intermediate</LevelButton>
				<LevelButton>Expert</LevelButton>
			</SelectLevelWrapper>
			<CustomLevelWrapper>
				size
				<SizeInput type="number" name="rowInput" />
				x
				<SizeInput type="number" name="colInput" />
			</CustomLevelWrapper>
		</MenuWrapper>
	);
}

const MenuWrapper = styled.div`
	width: 250px;
	color: ${({ theme }) => theme.color.white};
	display: flex;
	flex-flow: column nowrap;
	border: 1px solid ${({ theme }) => theme.color.white};
	padding: 10px;
	margin-top: 10px;
`;

const SelectLevelWrapper = styled.div``;

const LevelButton = styled.button`
	border: 1px solid ${({ theme }) => theme.color.white};
	border-radius: 5px;
	padding: 5px;
	margin-right: 3px;
	background-color: ${({ theme }) => theme.color.orange};
`;

const CustomLevelWrapper = styled.div`
	margin-top: 10px;
`;

const SizeInput = styled.input`
	width: 50px;
	border: none;
	border-radius: 5px;
`;
