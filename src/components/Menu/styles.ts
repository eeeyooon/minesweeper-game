import styled from 'styled-components';

export const MenuWrapper = styled.div`
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

export const SelectLevelWrapper = styled.div`
	width: 330px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	span {
		font-size: 18px;
		font-weight: 600;
	}
`;

export const SelectLevelBox = styled.div``;

export const LevelButton = styled.button<{ $selected: boolean }>`
	border: 1px solid ${({ theme }) => theme.color.white};
	border-radius: 5px;
	padding: 5px;
	margin-left: 5px;
	font-size: 17px;
	background-color: ${({ $selected, theme }) => ($selected ? theme.color.green : theme.color.orange)};
	margin-bottom: 10px;
`;

export const CustomLevelWrapper = styled.div`
	margin-top: 10px;
	font-size: 18px;
	font-weight: 600;
`;

export const SizeInput = styled.input`
	width: 50px;
	height: 25px;
	margin-left: 5px;
	margin-right: 5px;
	border: none;
	border-radius: 5px;
	outline: none;
	text-align: center;
`;

export const MineInput = styled.input`
	outline: none;
	width: 50px;
	border: none;
	height: 25px;
	border-radius: 5px;
	text-align: center;
`;

export const CustomButton = styled.button`
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

export const InfoMessage = styled.p`
	height: 15px;
	margin-top: 10px;
	font-size: 15px;
	color: ${({ theme }) => theme.color.selectedCell};
	font-weight: 600;
`;
