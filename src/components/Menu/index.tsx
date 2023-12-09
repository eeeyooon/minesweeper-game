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
	width: 350px;
	color: ${({ theme }) => theme.color.white};
	display: flex;
	flex-flow: column nowrap;
	border: 2px solid ${({ theme }) => theme.color.white};
	padding: 20px;
	margin-top: 20px;
`;

const SelectLevelWrapper = styled.div``;

const LevelButton = styled.button`
	border: 1px solid ${({ theme }) => theme.color.white};
	border-radius: 5px;
	padding: 5px;
	margin-right: 10px;
	font-size: 18px;
	background-color: ${({ theme }) => theme.color.orange};
	margin-bottom: 10px;
`;

const CustomLevelWrapper = styled.div`
	margin-top: 10px;
	font-size: 18px;
	font-weight: 600;
`;

const SizeInput = styled.input`
	width: 50px;
	height: 25px;
	margin-left: 5px;
	margin-right: 5px;
	border: none;
	border-radius: 5px;
	outline: none;
`;
