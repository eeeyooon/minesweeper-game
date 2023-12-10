import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { startGame } from '../../slices/gameSlice';
import { GAME_STATUS } from '../../lib/constants';
import { GameHeader, GameStatus, GameTitle, HeaderMenu, MineCount, ResetButton, TimerBox } from './styles';

export default function Header() {
	const dispatch = useDispatch();
	const [timer, setTimer] = useState(0);
	const { gameStatus, startTime, mineCount, allFlagCount, level } = useSelector((state: RootState) => state.game);

	useEffect(() => {
		if (gameStatus === GAME_STATUS.PLAYING && startTime) {
			const interval = setInterval(() => {
				setTimer(Math.floor((Date.now() - startTime) / 1000));
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [gameStatus, startTime]);

	useEffect(() => {
		setTimer(0);
	}, [level]);

	const handleReset = useCallback(() => {
		dispatch(startGame());
		setTimer(0);
	}, [dispatch]);

	return (
		<GameHeader>
			<GameTitle>Minesweeper</GameTitle>
			<GameStatus>
				{gameStatus === GAME_STATUS.WAITING
					? '😎 Ready'
					: gameStatus === GAME_STATUS.PLAYING
					  ? '🔥 Playing'
					  : gameStatus === GAME_STATUS.WIN
					    ? '😋 Win'
					    : '😅 Lose'}
			</GameStatus>
			<HeaderMenu>
				<TimerBox>
					<span>⏱</span> {timer}
				</TimerBox>
				<ResetButton onClick={handleReset}>Reset</ResetButton>
			</HeaderMenu>
			<MineCount>
				<span>💣</span> {gameStatus === GAME_STATUS.WAITING ? 0 : mineCount - allFlagCount}
			</MineCount>
		</GameHeader>
	);
}
