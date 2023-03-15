import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Image } from 'mui-image';
import { grey } from '@mui/material/colors';
import { Container, Grid, Paper, Box, Stack, Button, Typography } from '@mui/material';

import MapContext from '../components/MapContext';


const Profile = () => {
	const { api, eventsList, setEventsList } = useContext(MapContext)

	const deleteEvent = (id) => {
		console.log(id)
		api.deleteEvent(id)
			.then(res => res.json())
			.then(data => {
				console.log(data)
			})
	}

	useEffect(() => {
		api.showEvent()
			.then(res => res.json())
			.then(data => {
				setEventsList(data);
				console.log(data)
			})
	}, [deleteEvent]);

	return <Container maxWidth="md">
		<Typography variant="subtitle2" component={Link} to="/" sx={{ py: 2, textDecoration: "none", color: "grey" }}>На главную</Typography>
		<Typography variant='h4'>История добавления событий</Typography>
		<Grid container >
		{
			eventsList.map((event) => (
					<Grid item xs={6} md={6} >
						<Paper
							key={event.id}
							sx={{
								minHeight: {
									sx: "160px"
								}, m: 1
							}}
						>
							<Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }} id={event.id}>
								<Box>
									<Image src={event.pictures[0]} height="200px" />
								</Box>
								<Box sx={{ height: '80px' }}>
									<Typography >
										{event.name}
									</Typography>
									<Typography variant='subtitle2' noWrap color={grey[500]}>
										Тип события: {event.type}
									</Typography>
									<Typography variant='subtitle2' noWrap color={grey[500]}>
										{event.date}
									</Typography>
									<Typography variant='subtitle1' noWrap>
										{event.discripton}
									</Typography>
								</Box>
							</Box>
							<Button id={event.id} onClick={(e) => deleteEvent(e.target.id)}>Удалить</Button>	
						</Paper>
					</Grid>
			))
		}
		</Grid>
	</Container>
}

export default Profile