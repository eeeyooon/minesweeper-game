import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { customLevel, selectLevel } from '../../slices/gameSlice';
import { GAME_LEVEL } from '../../lib/constants';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Menu() {
	const dispatch = useDispatch();
	const [rows, setRows] = useState(0);
	const [cols, setCols] = useState(0);
	const [mines, setMines] = useState(0);
	const [info, setInfo] = useState(' ');

	const handleSelectLevel = (level: 'beginner' | 'intermediate' | 'expert') => {
		dispatch(selectLevel({ level }));
		setInfo(' ');
		setRows(0);
		setCols(0);
		setMines(0);
	};

	const handleCustomLevelStart = () => {
		if (rows > 100 || cols > 100) {
			setInfo('설정 가능한 가로, 세로는 최대 100 x 100입니다.');
		} else if (mines > Math.floor((rows * cols) / 3)) {
			setInfo('지뢰수는 격자칸 수의 1/3이하로 설정 가능합니다.');
		} else {
			setInfo(' ');
			dispatch(customLevel({ rows, cols, mineCount: mines }));
		}
	};

	return (
		<MenuWrapper>
			<SelectLevelWrapper>
				<span>Level</span>
				<SelectLevelBox>
					<LevelButton onClick={() => handleSelectLevel(GAME_LEVEL.BEGINNER)}>Beginner</LevelButton>
					<LevelButton onClick={() => handleSelectLevel(GAME_LEVEL.INTERMEDIATE)}>Intermediate</LevelButton>
					<LevelButton onClick={() => handleSelectLevel(GAME_LEVEL.EXPERT)}>Expert</LevelButton>
				</SelectLevelBox>
			</SelectLevelWrapper>
			<CustomLevelWrapper>
				BoardSize
				<SizeInput type="number" name="rowInput" value={rows} onChange={(e) => setRows(Number(e.target.value))} />
				x
				<SizeInput type="number" name="colInput" value={cols} onChange={(e) => setCols(Number(e.target.value))} />
				💣
				<MineInput type="number" name="mineInput" value={mines} onChange={(e) => setMines(Number(e.target.value))} />
			</CustomLevelWrapper>
			<CustomButton onClick={handleCustomLevelStart}>Custom</CustomButton>
			{info && <InfoMessage>{info}</InfoMessage>}
		</MenuWrapper>
	);
}

const MenuWrapper = styled.div`
	width: 355px;
	height: 200px;
	color: ${({ theme }) => theme.color.white};
	display: flex;
	flex-flow: column nowrap;
	border: 2px solid ${({ theme }) => theme.color.white};
	padding: 15px 10px;
	margin-top: 20px;
	margin-left: auto;
	margin-right: auto;
	text-align: center;
	justify-content: center;
	padding-top: 30px;
`;

const SelectLevelWrapper = styled.div`
	width: 330px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	span {
		font-size: 18px;
		font-weight: 600;
	}
`;

const SelectLevelBox = styled.div``;

const LevelButton = styled.button`
	border: 1px solid ${({ theme }) => theme.color.white};
	border-radius: 5px;
	padding: 5px;
	margin-left: 5px;
	font-size: 17px;
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
	text-align: center;
`;

const MineInput = styled.input`
	outline: none;
	width: 50px;
	border: none;
	height: 25px;
	border-radius: 5px;
	text-align: center;
`;

const CustomButton = styled.button`
	width: 75px;
	height: 25px;
	border-radius: 5px;
	border: 2px solid ${({ theme }) => theme.color.white};
	background-color: ${({ theme }) => theme.color.orange};
	color: ${({ theme }) => theme.color.white};
	font-size: 16px;
	margin: 0 auto;
	margin-top: 10px;
`;

const InfoMessage = styled.p`
	height: 15px;
	margin-top: 10px;
	font-size: 15px;
	color: ${({ theme }) => theme.color.selectedCell};
	font-weight: 600;
`;
