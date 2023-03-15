import React, { useState, useContext } from 'react';
import { useFormik } from "formik";
import * as yup from 'yup';
import { Box, Stack, Button, TextField } from '@mui/material';
import MapContext from './MapContext';
import AuthModalRecoveryAnswer from './AuthModalRecoveryAnswer';

const AuthModalRecovery = ({ setActiveStep }) => {
    const [question, setQuestion] = useState();
    const { api  } = useContext(MapContext);

    const validationSchema = yup.object({
        email: yup.string('Введите почту').email('Неверный формат почты').required('Обязательно'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values.email)
            api.recoveryPass(values)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setQuestion(data.question)
                })
                .catch(error => console.log(error))
        },
    });

    return <>
        <Button sx={{ marginRight: 'auto' }} onClick={() => { setActiveStep(0) }}>Вернутся к началу</Button>
        <Stack sx={{ gap: 2, py: 2 }}>
            <Box>
                <form onSubmit={formik.handleSubmit}>
                    <Stack sx={{ gap: 1 }}>
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
                    </Stack>
                    <Stack sx={{ gap: 1, mt: 1 }}>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Сбросить пароль
                        </Button>
                    </Stack>
                </form>
            </Box>
            {question && <AuthModalRecoveryAnswer question={question} emailValue={formik.values.email} setActiveStep={setActiveStep}/>}
        </Stack>
    </>
}

export default AuthModalRecovery