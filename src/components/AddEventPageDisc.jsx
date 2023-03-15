import React, { useContext } from 'react';
import { useFormik } from "formik";
import * as yup from 'yup';
import { Stack, TextField, Box, MenuItem, Button } from '@mui/material'

import MapContext from '../components/MapContext';

export default ({ steps, handleNext, handleBack, activeStep, setActiveStep }) => {
	const { formAddEventData, setFormAddEventData } = useContext(MapContext);

	const validationSchema = yup.object({
		name: yup.string().min(6, 'Длина названия минимум 6 символов').required('Обязательно'),
		type: yup.string().required('Обязательно'),
		description: yup.string().min(6, 'Длина описания минимум 6 символов').required('Обязательно'),
	})

	const formik = useFormik({
		initialValues: {
			name: formAddEventData.name ? formAddEventData.name : '',
			type: formAddEventData.type ? formAddEventData.type : '',
			description: formAddEventData.description ? formAddEventData.description : '',
		},
		validationSchema: validationSchema,
		onSubmit: values => {
			const dataEvent = { ...formAddEventData, ...values };
			setFormAddEventData(dataEvent);
			handleNext();
		}
	});

	return <Box component="form" onSubmit={formik.handleSubmit} >
		<Stack spacing={1}>
			<TextField
				id="name"
				name="name"
				label="Название события"
				value={formik.values.name}
				onChange={formik.handleChange}
				error={formik.touched.name && Boolean(formik.errors.name)}
				helperText={formik.touched.name && formik.errors.name}
			/>
			<TextField
				select
				id="type"
				name="type"
				label="Тип события"
				value={formik.values.type}
				onChange={formik.handleChange}
			>
				<MenuItem value={'DTP'}>ДТП</MenuItem>
				<MenuItem value={'ADM'}>Административное</MenuItem>
				<MenuItem value={'INT'}>Интересное</MenuItem>
			</TextField>
			<TextField
				id="description"
				name="description"
				label="Описание"
				value={formik.values.description}
				multiline
				minRows={4}
				onChange={formik.handleChange}
				error={formik.touched.description && Boolean(formik.errors.description)}
				helperText={formik.touched.description && formik.errors.description}
			/>
		</Stack>
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
				{activeStep === steps.length - 1 ? 'Опубликовать событие' : 'Далее'}
			</Button>
		</Stack>
	</Box>
}
