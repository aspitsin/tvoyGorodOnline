import React, { useState, useContext } from 'react';
import * as yup from 'yup';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import { TextField } from 'formik-mui';
import { Stack, Button, T } from '@mui/material';
import MapContext from '../components/MapContext';

export default ({ steps, handleNext, handleBack, activeStep}) => {
	const { formAddEventData, setFormAddEventData } = useContext(MapContext);
	const [picture, setPicture] = useState([]);

	const validationSchema = yup.object({
		pictures: yup.array().of(
			yup.string()
			.url('Неверный формат ссылки на фото')
			.required('Введите ссылку на фото'),
		)
	})

	const initialValues = {
		pictures: [''],
	};
	
	return <><Formik
		initialValues={initialValues}
		validationSchema={validationSchema}
		onSubmit={async (values) => {
			const dataEvent = { ...formAddEventData, ...values };
			console.log(dataEvent)
			setFormAddEventData(dataEvent);
			handleNext();
		}}
	>
		 {({ isValid, isSubmitting, values }) => (
		<Form>
			<FieldArray name='pictures'>
				{(fieldArrayProps) => {
					const { push, remove, form } = fieldArrayProps;
					const { values } = form;
					const { pictures } = values;
					return (
						<div>
							{console.log(values, pictures)}
							{pictures.map((pictures, index) => (
								<div key={index}>
									<Field name={`pictures[${index}]`}
            label="Введите ссылку на фото" component={TextField} style={{ width: '100%', paddingBottom: '10px' }} 
									/>
									{index > 0 && (
										<Button type='button' onClick={() => remove(index)}>
											Удалить фото
										</Button>
									)}
								</div>
							))}
							<Button type='button' onClick={() => push('')}>
								Еще фото
							</Button>
						</div>
					);
				}}
			</FieldArray>
			<Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
				{activeStep !== 0 && (
					<Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
						Назад
					</Button>
				)}
				<Button type="bottom"
					variant="contained"
					sx={{ mt: 3, ml: 1 }}
				>
					{activeStep === steps.length - 1 ? 'Опубликовать событие' : 'Загрузить фотографии'}
				</Button>
			</Stack>
		</Form>
		 )}
	</Formik>
	</>
}
