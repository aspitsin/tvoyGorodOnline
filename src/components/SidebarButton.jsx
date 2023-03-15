import React, { useContext } from 'react';
import { Box, Fab } from '@mui/material';

import MapContext from './MapContext';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SidebarButton = () => {
	const { activeBar, setActiveBar } = useContext(MapContext);

	return <Box left={!activeBar ? '10px' : '250px'} position={!activeBar ? 'absolute' : 'fixed' } color="inherit"
		sx={{
			display: {
				xs: 'none',
				md: 'none',
				lg: 'flex',
			},
			
			top: '10px',
			zIndex: '9999',
			transition: 'left .3s, transform 0.2s',
		}}>
		{activeBar &&
			<Fab onClick={() => { setActiveBar(prev => !prev) }}>
				<ArrowBackIosNewIcon  />
			</Fab>}
		{!activeBar &&
			<Fab onClick={() => { setActiveBar(prev => !prev) }} >
				<ArrowForwardIosIcon />
			</Fab>}
	</Box>
}

export default SidebarButton