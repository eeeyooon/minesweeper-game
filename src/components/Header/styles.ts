import styled from 'styled-components';

export const GameHeader = styled.header`
	margin-top: 20px;
	color: ${({ theme }) => theme.color.white};
`;
export const GameTitle = styled.h1`
	text-align: center;
	font-size: 2.5rem;
	margin-bottom: 20px;
`;

export const GameStatus = styled.p`
	text-align: center;
	height: 10px;
	font-size: 20px;
	margin-bottom: 10px;
`;

export const HeaderMenu = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
`;

export const TimerBox = styled.div`
	width: 75px;
	text-align: center;
	font-size: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const ResetButton = styled.button`
	background-color: ${({ theme }) => theme.color.green};
	color: ${({ theme }) => theme.color.white};
	font-weight: 600;
	padding: 8px;
	border-radius: 5px;
	font-size: 18px;
`;

export const MineCount = styled.div`
	width: 75px;
	display: flex;
	font-size: 20px;
	justify-content: space-between;
	align-content: center;
`;
