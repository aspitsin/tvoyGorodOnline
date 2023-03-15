import React, { useContext, useEffect } from 'react';
import { MapWrapper } from './MapWrapper';
import MapContext from './MapContext';
import { Box } from '@mui/material';
import Menu from './Menu';
import DG from '2gis-maps'

const Map = () => {
	const { setMapInstance, eventsList, addEventMarker, eventListByType, zoomNumber } = useContext(MapContext);

	const dtpIcon = DG.icon({
		iconUrl: 'http://tvoygorod.online/dtpIcon.png',
		iconSize: [42, 42]
	});

	const admIcon = DG.icon({
		iconUrl: 'http://tvoygorod.online/admIcon.png',
		iconSize: [42, 42]
	});

	const intIcon = DG.icon({
		iconUrl: 'http://tvoygorod.online/intIcon.png',
		iconSize: [42, 42]
	});

	useEffect(() => {
		let map;
		let userGeo;
		if (localStorage.getItem('userGeo')) {
			userGeo = JSON.parse(localStorage.userGeo);
		}

		console.log(userGeo);
		map = DG.map('map-container', {
			fullscreenControl: false,
			zoomControl: false

		});
		DG.control.location({ position: 'topright', drawCircle: false }).addTo(map);
		if (!userGeo) {
			map.locate({ setView: true, watch: true })
				.on('locationfound', function (e) {
					DG.marker([e.latitude, e.longitude]).addTo(map);
					localStorage.setItem('userGeo', JSON.stringify({ latitude: e.latitude, longitude: e.longitude }))
				})
				.on('locationerror', function (e) {
					DG.popup()
						.setLatLng(map.getCenter())
						.setContent('Доступ к определению местоположения отключён')
						.openOn(map);
				});
		} else {
			map.panTo([userGeo.latitude, userGeo.longitude]).setZoom(zoomNumber ? zoomNumber : 13);
			DG.marker([userGeo.latitude, userGeo.longitude]).addTo(map);
		}
		
		if (addEventMarker) {
			DG.marker([addEventMarker[0], addEventMarker[1]]).addTo(map);
			map.panTo([addEventMarker[0], addEventMarker[1]]).setZoom(18);
		}

		const addEventMarkerOnMap = (event) =>{
			switch (event.type) {
				case 'DTP':
					return DG.marker([event.position.latitude, event.position.longitude], { icon: dtpIcon }).bindPopup(`<div style="width:200px"><img src="${event.pictures[0]}"  height="100px"/><p>${event.name}</p><a href="/eventpage/${event.id}">Подробнее</a></div>`).addTo(map)
				case 'ADM':
					return DG.marker([event.position.latitude, event.position.longitude], { icon: admIcon }).bindPopup(`<div style="width:200px"><img src="${event.pictures[0]}"  height="100px"/><p>${event.name}</p><a href="/eventpage/${event.id}">Подробнее</a></div>`).addTo(map)
				case 'INT':
					return DG.marker([event.position.latitude, event.position.longitude], { icon: intIcon }).bindPopup(`<div style="width:200px"><img src="${event.pictures[0]}"  height="100px"/><p>${event.name}</p><a href="/eventpage/${event.id}">Подробнее</a></div>`).addTo(map)
			}
		}

		if (eventListByType.length > 0) {
			eventListByType.forEach(event =>
				addEventMarkerOnMap(event)
			)
		} else {
			eventsList.forEach(event => 
				addEventMarkerOnMap(event)
			)
		}
		setMapInstance(map);

		return () => {
			map.remove();
		}
	}, [eventsList, addEventMarker, eventListByType])

	console.log('re-render MapGl')
	return <Box sx={{
		position: 'fixed',
		left: '0px',
		top: '0px',
		right: '0px',
		bottom: '0px',
		zIndex: 0,
		transition: 'left .3s, transform 0.2s'
	}}>
		<MapWrapper />
		<Menu />
	</Box>
}

export default Map