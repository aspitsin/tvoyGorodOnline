import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import AuthModalSingIn from './AuthModalSingIn';
import AuthModalSignUp from './AuthModalSignUp';
import AuthModalRecovery from './AuthModalRecovery';
import AuthComplete from './AuthComplete';

import { Modal } from '@mui/material';

const AuthModal = ({ openAuthModal, setOpenAuthModal }) => {
	const [activeStep, setActiveStep] = useState(0);

	const handleClose = () => {
		setOpenAuthModal(false);
		setActiveStep(0);
	};

	function getStepContent(step) {
		switch (step) {
			case 0:
				return <AuthModalSingIn setOpenAuthModal={setOpenAuthModal} setActiveStep={setActiveStep} />;
			case 1:
				return <AuthModalSignUp setOpenAuthModal={setOpenAuthModal} setActiveStep={setActiveStep} />;
			case 2:
				return <AuthModalRecovery setActiveStep={setActiveStep} />;
			case 3:
				return <AuthComplete setActiveStep={setActiveStep} />;
			default:
				throw new Error('Unknown step');
		}
	}
	return <Modal
		open={openAuthModal}
		onClose={handleClose}
	>
		<Box component={Paper} sx={{
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: {
				md: '400px',
				xs: '270px',
			},
			bgcolor: 'background.paper',
			boxShadow: 24,
			p: 4,
		}}>
			{getStepContent(activeStep)}
		</Box>
	</Modal>
}

export default AuthModal