import styled from 'styled-components';

export default function Header() {
	return (
		<GameHeader>
			<GameTitle>Minesweeper</GameTitle>
			<HeaderMenu>
				<TimerBox>타이머</TimerBox>
				<ResetButton>Reset</ResetButton>
			</HeaderMenu>
		</GameHeader>
	);
}

const GameHeader = styled.header`
	margin-top: 20px;
	color: ${({ theme }) => theme.color.white};
`;
const GameTitle = styled.h1`
	text-align: center;
	font-size: 1.25rem;
	margin-bottom: 10px;
`;

const HeaderMenu = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
`;

const TimerBox = styled.div`
	width: 60px;
	border: 1px solid ${({ theme }) => theme.color.white};
	text-align: center;
	padding: 3px;
	font-size: 14px;
`;

const ResetButton = styled.button`
	background-color: ${({ theme }) => theme.color.green};
	padding: 5px;
	border-radius: 5px;
	font-size: 14px;
`;
