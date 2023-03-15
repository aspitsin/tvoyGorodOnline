import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import AuthModal from './AuthModal';
import { Box, Fab, Slide, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import MapContext from './MapContext';

const Menu = () => {
	const { user, setUser } = useContext(MapContext);
	const [openAuthModal, setOpenAuthModal] = useState(false);

	const openMenuAuthModal = () => setOpenAuthModal(true);
	const [checked, setChecked] = useState(false);

	const openMenu = () => {
		setChecked(!checked);
	};
	const logout = () => {
		localStorage.removeItem("user");
		setUser(null);
		setChecked(!checked);
	}

	return <>
		<Box sx={{ position: 'fixed', top: '10px', right: '50px', zIndex: '9999', '& > :not(style)': { m: 0.5 } }}>
			<Stack direction="row">
				<Slide direction="left" in={checked}>
					<Box sx={{ '& > :not(style)': { mr: 1 } }}>

						<Fab color="primary" component={Link} to="/addevent">
							<AddIcon sx={{ color: "white" }} />
						</Fab>
						<Fab color="primary" component={Link} to="/profile">
							<SettingsOutlinedIcon sx={{ color: "white" }} />
						</Fab>
						<Fab color="primary"  onClick={logout}>
							<LogoutIcon sx={{ color: "white" }} />
						</Fab>
					</Box>
				</Slide>
				{user &&
					<Fab onClick={openMenu}>
						{
							!checked &&
							<MenuIcon />
						}
						{
							checked &&
							<CloseIcon />
						}
					</Fab>
				}
				{!user &&
					<Fab onClick={openMenuAuthModal}>
						<LoginOutlinedIcon />
					</Fab>}
			</Stack>
		</Box>
		<AuthModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} />
	</>
}

export default Menu