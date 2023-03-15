import React, { useContext, useEffect } from 'react';
import DG from '2gis-maps'
// import Menu from './Menu';
import { Box, CircularProgress  } from '@mui/material';
import CarCrashOutlinedIcon from '@mui/icons-material/CarCrashOutlined';
import dtpIcon from './icons/dtpIcon.png'
import MapContext from './MapContext';


export const MapWrapper = React.memo(
    () => {
        return <div id='map-container' style={{ width: '100%', height: '100%' }}></div>;
    },
    () => true,
);


// const MapWrapper = () => {
// 	const {mapInstance, setMapInstance, eventsList} = useContext(MapContext);

// 	// useEffect(() => {
// 	// 	const map = DG.map('map-container', {
// 	// 		center: [54.98, 82.89],
// 	// 		fullscreenControl: false,
// 	// 		zoomControl: false

// 	// 	});
// 	// 	DG.control.location({ position: 'topright', drawCircle: false }).addTo(map);
// 	// 	map.locate({ setView: true, watch: true })
// 	// 		.on('locationfound', function (e) {
// 	// 			DG.marker([e.latitude, e.longitude]).addTo(map);
// 	// 			localStorage.setItem('userGeo', [e.latitude, e.longitude])
// 	// 		})
// 	// 		.on('locationerror', function (e) {
// 	// 			DG.popup()
// 	// 				.setLatLng(map.getCenter())
// 	// 				.setContent('Доступ к определению местоположения отключён')
// 	// 				.openOn(map);
// 	// 		});
// 	// 		const dtpIcon = DG.icon({
// 	// 			iconUrl: 'http://tvoygorod.online/free-icon-triangle-3348224.png',
// 	// 			iconSize: [48, 48]
// 	// 		});
// 	// 	console.log(eventsList);
// 	// 	eventsList.forEach(event =>
// 	// 		DG.marker([event.position.latitude, event.position.longitude], {icon: dtpIcon}).bindPopup(`${event.name}`).addTo(map)
// 	// 	)
// 	// 	setMapInstance(map);
		
// 	// 	return () => {
// 	// 		map.remove()
// 	// 	}
		
// 	// }, [])

// 	console.log('re-render MapWrapper')

// 	return <Box id='map-container' sx={{ width: '100%', height: '100%', position: 'relative' }}>
// 		{/* <Menu /> */}
// 	</Box>;
// }

// export default MapWrapper