import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Stepper, Step, StepLabel, Paper } from "@mui/material";
import AddEventPageDisc from '../components/AddEventPageDisc';
import AddEventPagePhoto from '../components/AddEventPagePhoto';
import AddEventPageGeo from '../components/AddEventPageGeo';


export default () => {
	const steps = ['Описание события', 'Фотографии события', 'Место события'];
	const [activeStep, setActiveStep] = useState(0);
	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	function getStepContent(step) {
		switch (step) {
			case 0:
				return <AddEventPageDisc steps={steps} handleNext={handleNext} handleBack={handleBack} activeStep={activeStep} setActiveStep={setActiveStep} />;
			case 1:
				return <AddEventPagePhoto steps={steps} handleNext={handleNext} handleBack={handleBack} activeStep={activeStep} setActiveStep={setActiveStep} />;
			case 2:
				return <AddEventPageGeo steps={steps} handleNext={handleNext} handleBack={handleBack} activeStep={activeStep} setActiveStep={setActiveStep} />;
			default:
				throw new Error('Unknown step');
		}
	}

	return <Container maxWidth="md">
		<Typography variant="subtitle2" component={Link} to="/" sx={{ py: 2, textDecoration: "none", color: "grey" }}>На главную</Typography>
		<Typography variant="h4" component="h1" sx={{ py: 2 }}>Добавить событие</Typography>
		<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
			{steps.map((label) => (
				<Step key={label}>
					<StepLabel>{label}</StepLabel>
				</Step>
			))}
		</Stepper>
		<Paper sx={{ p: 4 }}>
			{getStepContent(activeStep)}
		</Paper>
	</Container>
}
