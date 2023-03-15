import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import MapContext from './MapContext';

const SidebarTypeButton = () => {
	const {eventsList, SetEventListByType, mapInstance, setZoomNumber, zoomNumber} = useContext(MapContext);
	

	const sortEvents = (type) => {
		let data = [...eventsList].reverse();
		switch (type) {
			case 0:
				console.log(0)
				break;
			case 1:
				data = data.filter(d => d.type.includes("DTP")).reverse();
				console.log(1)
				break;
			case 2:
				data = data.filter(d => d.type.includes("ADM")).reverse();
				console.log(2)
				break;
			case 3:
				data = data.filter(d => d.type.includes("INT")).reverse();
				console.log(3)
				break;
		}
		SetEventListByType(data);
		setZoomNumber(mapInstance.getZoom())
	}

	return <Box sx={{ display: 'flex', gap: 1, my: 2, overflow: 'auto', '&::-webkit-scrollbar':  'none' }} >
		<Button
			variant="outlined"
			sx={{ borderRadius: '20px' }}
			onClick={() => sortEvents(0)}
		>
			ВСЕ
		</Button>
		<Button
			variant="outlined"
			sx={{ borderRadius: '20px' }}
			onClick={() => sortEvents(1)}
		>
			ДТП
		</Button>
		<Button
			variant="outlined"
			sx={{ borderRadius: '20px' }}
			onClick={() => sortEvents(2)}
		>
			АДМ
		</Button>
		<Button
			variant="outlined"
			sx={{ borderRadius: '20px' }}
			onClick={() => sortEvents(3)}
		>
			ИНТ
		</Button>
	</Box>
}

export default SidebarTypeButton