import React, { useState, useContext } from 'react';
import { useFormik } from "formik";
import * as yup from 'yup';
import { Stack, Button, TextField, Typography } from '@mui/material';
import { red } from "@mui/material/colors";
import MapContext from './MapContext';

const AuthModalSingIn = ({ setOpenAuthModal, setActiveStep }) => {
	const [errorMessage, setErrorMessage] = useState('');
	const { api, setUser } = useContext(MapContext);

	const validationSchema = yup.object({
		email: yup.string('Введите почту').email('Неверный формат почты').required('Обязательно'),
		password: yup.string('Введите пароль').min(6, 'Длина пароля минимум 6 символов').required('Обязательно'),
	})

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: values => {
			console.log(values)
			api.signIn(values)
				.then(res => res.json())
				.then(data => {
					console.log(data)
					var size = Object.keys(data).length;
					if (size > 1) {
						localStorage.setItem("user", JSON.stringify(data.user));
						setUser(data.user)
						setOpenAuthModal(false)
					} else {
						setErrorMessage(`${data.message} 😑`);
					}
				})
		},
	});

	return <form onSubmit={formik.handleSubmit}>
		<Stack sx={{ gap: 1 }}>
			{errorMessage && <Typography variant="body1" color={red[400]}>{errorMessage}</Typography>}
			<TextField
				fullWidth
				id="email"
				name="email"
				label="Email"
				value={formik.values.email}
				onChange={formik.handleChange}
				error={formik.touched.email && Boolean(formik.errors.email)}
				helperText={formik.touched.email && formik.errors.email}
			/>
			<TextField
				fullWidth
				id="password"
				name="password"
				label="Пароль"
				type="password"
				value={formik.values.password}
				onChange={formik.handleChange}
				error={formik.touched.password && Boolean(formik.errors.password)}
				helperText={formik.touched.password && formik.errors.password}
			/>
			<Button sx={{ marginRight: 'auto' }} onClick={() => { setActiveStep(2) }}>Забыли пароль?</Button>
		</Stack>
		<Stack sx={{ gap: 1, mt: 1 }}>
			<Button color="primary" variant="contained" fullWidth type="submit">
				Войти
			</Button>
			<Button color="primary" variant="contained" fullWidth type="button" onClick={() => { setActiveStep(1) }}>
				Зарегестрироваться
			</Button>
		</Stack>
	</form>
}

export default AuthModalSingIn