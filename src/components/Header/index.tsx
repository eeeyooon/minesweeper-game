import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { startGame } from '../../slices/gameSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import React, { useState, useEffect } from 'react';
import { GAME_STATUS } from '../../lib/constants';

export default function Header() {
	const dispatch = useDispatch();
	const [timer, setTimer] = useState(0);
	const { gameStatus, startTime, mineCount, allFlagCount } = useSelector((state: RootState) => state.game);

	useEffect(() => {
		if (gameStatus === GAME_STATUS.PLAYING && startTime) {
			const interval = setInterval(() => {
				setTimer(Math.floor((Date.now() - startTime) / 1000));
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [gameStatus, startTime]);

	const handleReset = () => {
		dispatch(startGame());
		setTimer(0);
	};

	return (
		<GameHeader>
			<GameTitle>Minesweeper</GameTitle>
			<GameStatus>{gameStatus}</GameStatus>
			<HeaderMenu>
				<TimerBox>{timer}초</TimerBox>
				<ResetButton onClick={handleReset}>Reset</ResetButton>
			</HeaderMenu>
			<MineCount>💣 {gameStatus === GAME_STATUS.WAITING ? 0 : mineCount - allFlagCount}개</MineCount>
		</GameHeader>
	);
}

const GameHeader = styled.header`
	margin-top: 20px;
	color: ${({ theme }) => theme.color.white};
`;
const GameTitle = styled.h1`
	text-align: center;
	font-size: 2.5rem;
	margin-bottom: 10px;
`;

const GameStatus = styled.p`
	text-align: center;
	height: 10px;
	font-size: 20px;
`;

const HeaderMenu = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
`;

const TimerBox = styled.div`
	width: 60px;
	text-align: center;
	padding: 3px;
	font-size: 20px;
`;

const ResetButton = styled.button`
	background-color: ${({ theme }) => theme.color.green};
	color: ${({ theme }) => theme.color.white};
	font-weight: 600;
	padding: 8px;
	border-radius: 5px;
	font-size: 18px;
`;

const MineCount = styled.div``;
