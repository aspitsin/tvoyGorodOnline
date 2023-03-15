import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Box, Typography, Button } from '@mui/material'
import { grey } from '@mui/material/colors';
import { Image } from 'mui-image';


const Card = ({ id, name, pictures, type, date, discripton, setSelectedEvent }) => {
    return <Paper
        key={id}
        sx={{
            minHeight: {
                sx: "160px"
            }, m: 1
        }}
    >
        <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }} id={id}>
            <Box>
                <Image src={pictures[0]} height="200px" />
            </Box>
            <Box sx={{height: '80px'}}>
                <Typography >
                    {name}
                </Typography>
                <Typography variant='subtitle2' noWrap color={grey[500]}>
                    Тип события: {type}
                </Typography>
                <Typography variant='subtitle2' noWrap color={grey[500]}>
                    {date}
                </Typography>
                <Typography variant='subtitle1' noWrap>
                    {discripton}
                </Typography>
            </Box>

        </Box>
        <Button id={id} onClick={(e) => setSelectedEvent(e.target.id)}>На карте</Button>
        <Button component={Link} to={`/eventpage/${id}`} id={id} >Подробнее</Button>
    </Paper>
}

export default Card