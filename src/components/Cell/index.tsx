import React from 'react';
import { CellBox } from './styles';

type CellProps = {
	cellData: number;
	cellText: string;
	onClick: () => void;
	onContextMenu: (e: React.MouseEvent) => void;
};

const Cell = React.memo(({ cellData, cellText, onClick, onContextMenu }: CellProps) => {
	return (
		<CellBox $cellData={cellData} onClick={onClick} onContextMenu={onContextMenu}>
			{cellText}
		</CellBox>
	);
});

Cell.displayName = 'Cell';
export default Cell;
