import React, { useContext, useState } from 'react';
import SidebarButton from './SidebarButton';
import { Box, Stack, Paper, Button, Typography, Grid } from '@mui/material';
import Card from './Card';
import SidebarTypeButton from './SidebarTypeButton';
import MapContext from './MapContext';


const Sidebar = ({ }) => {
	const { mapInstance, activeBar, eventsList, eventListByType, SetEventListByType } = useContext(MapContext);

	const setSelectedEvent = (eventId) => {
		console.log(eventId)
		eventsList.map((event) => {
			if (event.id == eventId) {
				console.log([event.position.latitude, event.position.longitude])
				mapInstance.panTo([event.position.latitude, event.position.longitude]).setZoom(18);
			}
		})
	};

	
	// let typeEvents = [];
	// const typeEventsObj = eventsList.reduce(function (result, item, index) {
	// 	result[item.type] = (result[item.type] || 0) + 1;
	// 	return result;
	// }, {});

	// typeEvents = Object.entries(typeEventsObj).map((e) => ({ [e[0]]: e[1] }));
	// console.log(typeEvents)


	return <>
		<Box sx={{ position: 'relative' }}>
			<Box width={!activeBar ? 0 : '250px'}
				sx={{
					display: {
						xs: 'none',
						md: 'none',
						lg: 'block',
					},
					borderTopRightRadius: '16px',
					height: '100vh',
					position: 'relative',
					transition: 'width .3s, transform 0.2s',
					zIndex: '9999'
				}}>
				<SidebarButton />
				<Stack
					direction="column" sx={{ overflow: 'auto' }}>
					<Paper >
						<Typography variant='h5' component="h2"
							sx={{ textAlign: 'center' }}>События в городе</Typography>
					</Paper>
					<SidebarTypeButton />
					{eventListByType.length == 0 && eventsList.map((event) =>
						<Card {...event} setSelectedEvent={setSelectedEvent} key={event.id}/>
					).reverse()}
					{eventListByType.length > 0 && eventListByType.map((event) =>
						<Card {...event} setSelectedEvent={setSelectedEvent} key={event.id}/>
					).reverse()}
				</Stack>
			</Box>
		</Box>
		<Box
			sx={{
				position: "absolute",
				zIndex: 1,
				left: 0,
				right: 0,
				bottom: 0,
				width: "100%",
				maxHeight: '45%',
				overflow: "auto",
				bgcolor: "white",
				borderTopRightRadius: '20px', borderTopLeftRadius: '20px',
				display: {
					xs: "block",
					md: "block",
					lg: "none",
				}
			}}
		>
			<SidebarTypeButton />
			<Grid container >
				{eventListByType.length == 0 && eventsList.map((event) => (
					<Grid item xs={6} md={6} key={event.id}>
						<Card {...event} setSelectedEvent={setSelectedEvent} />
					</Grid>
				))}
				{eventListByType.length > 0 && eventListByType.map((event) => (
					<Grid item xs={6} md={6} key={event.id}>
						<Card {...event} setSelectedEvent={setSelectedEvent} />
					</Grid>
				))}
			</Grid>
		</Box>


	</>
}

export default Sidebar