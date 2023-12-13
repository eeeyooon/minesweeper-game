import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { customLevel, selectLevel } from '../../slices/gameSlice';
import { GAME_LEVEL } from '../../lib/constants';
import {
	CustomButton,
	CustomLevelWrapper,
	InfoMessage,
	LevelButton,
	MenuWrapper,
	MineInput,
	SelectLevelBox,
	SelectLevelWrapper,
	SizeInput,
} from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Menu() {
	const dispatch = useDispatch();
	const gameLevel = useSelector((state: RootState) => state.game.level);
	const [rows, setRows] = useState(0);
	const [cols, setCols] = useState(0);
	const [mines, setMines] = useState(0);
	const [info, setInfo] = useState(' ');
	const [selectedLevel, setSelectedLevel] = useState('beginner');

	const handleSelectLevel = (level: 'beginner' | 'intermediate' | 'expert') => {
		dispatch(selectLevel({ level }));
		setInfo(' ');
		setRows(0);
		setCols(0);
		setMines(0);
	};

	useEffect(() => {
		setSelectedLevel(gameLevel);
	}, [gameLevel]);

	const handleCustomLevelStart = () => {
		if (rows > 100 || cols > 100) {
			setInfo('설정 가능한 가로, 세로는 최대 100 x 100입니다.');
		} else if (mines > Math.floor((rows * cols) / 3)) {
			setInfo('지뢰 수는 격자칸 수의 1/3이하로 설정 가능합니다.');
		} else {
			setInfo(' ');
			dispatch(customLevel({ rows, cols, mineCount: mines }));
			setSelectedLevel('');
		}
	};

	return (
		<MenuWrapper>
			<SelectLevelWrapper>
				<span>Level</span>
				<SelectLevelBox>
					<LevelButton
						onClick={() => handleSelectLevel(GAME_LEVEL.BEGINNER)}
						$selected={selectedLevel === GAME_LEVEL.BEGINNER}
					>
						Beginner
					</LevelButton>
					<LevelButton
						onClick={() => handleSelectLevel(GAME_LEVEL.INTERMEDIATE)}
						$selected={selectedLevel === GAME_LEVEL.INTERMEDIATE}
					>
						Intermediate
					</LevelButton>
					<LevelButton
						onClick={() => handleSelectLevel(GAME_LEVEL.EXPERT)}
						$selected={selectedLevel === GAME_LEVEL.EXPERT}
					>
						Expert
					</LevelButton>
				</SelectLevelBox>
			</SelectLevelWrapper>
			<CustomLevelWrapper>
				BoardSize
				<SizeInput
					type="number"
					name="rowInput"
					aria-label="행의 크기 입력"
					value={rows}
					onChange={(e) => setRows(Number(e.target.value))}
				/>
				x
				<SizeInput
					type="number"
					name="colInput"
					aria-label="열의 크기 입력"
					value={cols}
					onChange={(e) => setCols(Number(e.target.value))}
				/>
				💣
				<MineInput
					type="number"
					name="mineInput"
					value={mines}
					aria-label="지뢰의 개수 입력"
					onChange={(e) => setMines(Number(e.target.value))}
				/>
			</CustomLevelWrapper>
			<CustomButton onClick={handleCustomLevelStart}>Custom</CustomButton>
			{info && <InfoMessage>{info}</InfoMessage>}
		</MenuWrapper>
	);
}
