import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { Stack, Button, TextField, Typography } from '@mui/material';
import { red } from "@mui/material/colors";
import MapContext from './MapContext'

const AuthModalSignUp = ({ setOpenAuthModal, setActiveStep }) => {
	const [errorMessage, setErrorMessage] = useState('');
	const { api, setUser } = useContext(MapContext);

	const validationSchema = yup.object({
		email: yup.string('Введите почту').email('Неверный формат почты').required('Обязательно'),
		password: yup.string('Введите пароль').min(6, 'Длина пароля минимум 6 символов').required('Обязательно'),
		confirmPassword: yup.string()
			.required('Больше чем просто обязательно')
			.oneOf([yup.ref('password')], 'Пароли не совпадают'),
		question: yup.string('Контрольный вопрос').min(5, 'Длина вопроса минимум 6 символов').required('Обязательно'),
	})

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
			question: 'Имя матери',
			answer: '',
		},
		validationSchema: validationSchema,
		onSubmit: values => {
			api.signUp(values)
				.then(res => res.json())
				.then(data => {
					console.log(data);
					if (!data.err) {
						api.signIn(values)
							.then(res => res.json())
							.then(data => {
								localStorage.setItem("user", JSON.stringify(data.user));
								setUser(data.user)
							})
						setOpenAuthModal(false)
					} else {
						setErrorMessage(`${data.message} 😑`);
					}
				})
		},
	});

	return <form onSubmit={formik.handleSubmit}>
		<Stack sx={{ gap: 1, mt: 1 }}>
			{errorMessage && <Typography variant="body1" color={red[400]}>{errorMessage}</Typography>}
			<TextField
				fullWidth
				id="email"
				name="email"
				label="Почта"
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
			<TextField
				fullWidth
				id="confirmPassword"
				name="confirmPassword"
				label="Повторите пароль"
				type="password"
				value={formik.values.confirmPassword}
				onChange={formik.handleChange}
				error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
				helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
			/>
			<TextField
				fullWidth
				id="question"
				name="question"
				label="Контрольный вопрос"
				value={formik.values.question}
				onChange={formik.handleChange}
				error={formik.touched.question && Boolean(formik.errors.question)}
				helperText={formik.touched.question && formik.errors.question}
			/>
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
		</Stack>
		<Stack sx={{ gap: 1, mt: 1 }} >
			<Button color="primary" variant="contained" fullWidth type="submit" >
				Зарегистрироваться
			</Button>
			<Button color="primary" variant="contained" fullWidth type="button" onClick={() => { setActiveStep(0) }}>
				Войти
			</Button>
		</Stack>
	</form>
}

export default AuthModalSignUp