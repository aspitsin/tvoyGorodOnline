import React, { useState, useContext } from 'react';
import { useFormik } from "formik";
import * as yup from 'yup';
import { Box, Stack, Button, TextField, Typography } from '@mui/material';
import MapContext from './MapContext';

const AuthModalRecoveryAnswer = ({ question, emailValue, setActiveStep }) => {
	const { api } = useContext(MapContext);

	const validationSchema = yup.object({
		email: yup.string('Введите почту').email('Неверный формат почты').required('Обязательно'),
		password: yup.string('Введите пароль').min(6, 'Длина пароля минимум 6 символов').required('Обязательно'),
	})

	const formik = useFormik({
		initialValues: {
			email: emailValue,
			answer: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: values => {
			console.log(values.email)
			api.recoveryPassAnswer(values)
				.then(res => res.json())
				.then(data => {
					setActiveStep(3);
				})
				.catch(error => console.log(error))
		},
	});

	return <Box >
		<form onSubmit={formik.handleSubmit}>

			<Stack sx={{ gap: 1 }}>
				{question && <Typography variant="body1"><b>Контрольный вопрос:</b> {question}</Typography>}
				{
					question &&
					<TextField
						fullWidth
						id="answer"
						name="answer"
						label="Ответ на вопрос"
						value={formik.values.answer}
						onChange={formik.handleChange}
						error={formik.touched.answer && Boolean(formik.errors.answer)}
						helperText={formik.touched.answer && formik.errors.answer}
					/>
				}
				{
					formik.values.answer &&
					<TextField
						fullWidth
						id="password"
						name="password"
						label="Новый пароль"
						type="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
				}
			</Stack>
			<Stack sx={{ gap: 1, mt: 1 }}>
				<Button color="primary" variant="contained" fullWidth type="submit">
					Отправить ответ
				</Button>
			</Stack>
		</form>
	</Box>
}

export default AuthModalRecoveryAnswer