import { CellBox } from './styles';

type CellProps = {
	cellData: number;
	cellText: string;
	onClick: () => void;
	onContextMenu: (e: React.MouseEvent) => void;
};
export default function Cell({ cellData, cellText, onClick, onContextMenu }: CellProps) {
	return (
		<CellBox $cellData={cellData} onClick={onClick} onContextMenu={onContextMenu}>
			{cellText}
		</CellBox>
	);
}
