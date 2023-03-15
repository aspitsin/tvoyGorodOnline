import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { Container, Grid, Paper, Box, Stack, Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Image } from 'mui-image';
import Slider  from '../components/Slider'
import DG from '2gis-maps';

import MapContext from '../components/MapContext';

const EventPage = () => {
	const { id } = useParams();
	const { api } = useContext(MapContext);
	const [event, setEvent] = useState({});

	const [map, setMap] = useState({})


	useEffect(() => {
		api.showEventById(id)
			.then(res => res.json())
			.then(data => {
				setEvent(data);
				const map = DG.map('map-container', {
					fullscreenControl: false,
				});
				DG.control.location({ position: 'topleft', drawCircle: false }).addTo(map);
				map.panTo([data.position.latitude, data.position.longitude]).setZoom(18);
				DG.marker([data.position.latitude, data.position.longitude]).addTo(map);
				setMap(map)
				return () => {
					map.remove()
				}
			})
	}, []);


	console.log(event)
	return <Container maxWidth="md">
		<Typography variant="subtitle2" component={Link} to="/" sx={{ py: 2, textDecoration: "none", color: "grey" }}>На главную</Typography>
		<Typography variant='h4'>{event.name}</Typography>
		<Typography variant='subtitle2' noWrap color={grey[500]}>
			Тип события: {event.type}
		</Typography>
		<Typography variant='subtitle2' noWrap color={grey[500]}>
			{event.date}
		</Typography>
		<Grid container>
			<Grid item xs={12} md={12} >
				<Slider pictures={event.pictures}/>
			</Grid>
			<Grid item xs={12} md={12} sx={{ my: 2 }}>
				<Paper sx={{ p: 2 }}>
					<Typography>{event.description}</Typography>
				</Paper>
			</Grid>
		</Grid>
		<Box sx={{ height: '350px',mb: '50px' }}>
			<Box id='map-container' sx={{ width: '100%', height: '100%' }}>
			</Box>
		</Box>
	</Container>
}

export default EventPage