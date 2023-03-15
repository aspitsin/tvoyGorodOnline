import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DG from '2gis-maps';
import { useFormik } from "formik";
import * as yup from 'yup';
import { Stack, Box, Button } from '@mui/material';
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined';
import MapContext from '../components/MapContext';

export default ({ steps, handleBack, activeStep, setActiveStep }) => {
	const navigate = useNavigate();
	const { api, formAddEventData, setFormAddEventData, setAddEventMarker, setEventsList } = useContext(MapContext);
	const [map, setMap] = useState({})

	useEffect(() => {
		const map = DG.map('map-container', {
			fullscreenControl: false,
		});
		DG.control.location({ position: 'topleft', drawCircle: false }).addTo(map);
		setMap(map)
		return () => {
			map.remove()
		}
	}, [])

	let userObj = localStorage.getItem("user");
	userObj = JSON.parse(userObj);

	const validationSchema = yup.object({

	})

	const formik = useFormik({
		initialValues: {
			id: Date.now(),
			date: new Date().toLocaleString(),
			position: {
				latitude: '',
				longitude: '',
			},
			author: userObj._id,
		},
		validationSchema: validationSchema,
		onSubmit: values => {
			const positionEvent = map.getCenter();
			values.position.latitude = positionEvent.lat;
			values.position.longitude = positionEvent.lng;
			const dataEvent = { ...formAddEventData, ...values };
			console.log(dataEvent)
			setActiveStep(0)
			setAddEventMarker([positionEvent.lat, positionEvent.lng]);
			setFormAddEventData({});
			api.addEvent(dataEvent)
				.then(res => res.json())
				.then(data => {
					console.log(data)
				})
			navigate("/");
		}
	});

	return <Box component="form" onSubmit={formik.handleSubmit} >
		<Box sx={{
			position: 'relative', height: '450px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}>

			<Box id='map-container' sx={{ width: '100%', height: '100%' }}>
			</Box>
			<AddLocationOutlinedIcon fontSize="large" sx={{
				position: 'absolute',
				zIndex: "1"
			}} />
		</Box>
		<Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
			{activeStep !== 0 && (
				<Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
					Назад
				</Button>
			)}
			<Button type="submit"
				variant="contained"
				sx={{ mt: 3, ml: 1 }}
			>
				{activeStep === steps.length - 1 ? 'Выбрать место и опубликовать' : 'Далее'}
			</Button>
		</Stack>
	</Box>
}
