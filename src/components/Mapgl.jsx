import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MapWrapper } from './MapWrapper';
import MapContext from './MapContext';
import { Box, Button } from '@mui/material';
import Menu from './Menu';
import DG from '2gis-maps';

import dtpIcon from './icons/dtpIcon.png'
import admIcon from './icons/admIcon.png'
import intIcon from './icons/intIcon.png'

const Map = () => {
	const navigate = useNavigate();
	const { setMapInstance, eventsList, addEventMarker, eventListByType, zoomNumber } = useContext(MapContext);

	const dtpIconLogo = DG.icon({
		iconUrl: dtpIcon,
		iconSize: [42, 42]
	});

	const admIconLogo = DG.icon({
		iconUrl: admIcon,
		iconSize: [42, 42]
	});

	const intIconLogo = DG.icon({
		iconUrl: intIcon,
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

		const addEventMarkerOnMap = (event) => {
			
			function redirect(id) {
				navigate(`/eventPage/${id}`);
			}
			const popUpTemplate = function (logo) {
				return DG.marker([event.position.latitude, event.position.longitude], { icon: logo }).bindPopup(`<div style="width:200px"><img src="${event.pictures[0]}"  height="100px"/><p>${event.name}</p><button class="linkToEventPage" >Подробнее</button></div>`)
					.on("click", (a) => {
						let popUp = a.target.getPopup()
						popUp.getElement().querySelector(".linkToEventPage").addEventListener("click", e => {
							redirect(event.id)
						});
					})
					.addTo(map)
			}

			switch (event.type) {
				case 'DTP':
					return popUpTemplate(dtpIconLogo)
				case 'ADM':
					return popUpTemplate(admIconLogo)
				case 'INT':
					return popUpTemplate(intIconLogo)
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