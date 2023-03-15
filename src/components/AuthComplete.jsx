import React from 'react';
import { Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AuthComplete = () => {
	return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
		<CheckCircleIcon color="success" fontSize="large" />
		<Typography variant='h6'>Пароль успешно измненен</Typography>
	</Box>
}

export default AuthComplete