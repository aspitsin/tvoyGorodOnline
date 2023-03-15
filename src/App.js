import React, {useState, useEffect} from 'react';
import { Routes, Route } from "react-router-dom";

import Main from './pages/Main';
import AddEvent from './pages/AddEvent';
import Profile from './pages/Profile';
import EventPage from './pages/EventPage';

import { Api } from "./Api";
import MapContext from './components/MapContext';

const PATH = "/";

function App() {
	let usr = localStorage.getItem("user");
	if (usr) {
		usr = JSON.parse(usr);
	}
	const [user, setUser] = useState(usr);
	const [api, setApi] = useState(new Api());
	const [mapInstance, setMapInstance] = useState(null);
	const [activeBar, setActiveBar] = useState(false);
	const [formAddEventData, setFormAddEventData] = useState({});
	const [eventsList, setEventsList] = useState([]);
	const [eventListByType, SetEventListByType] = useState([]);
	const [addEventMarker, setAddEventMarker] = useState(null);
	const [zoomNumber, setZoomNumber] = useState(0);

	useEffect(() => {
		api.showEvent()
			.then(res => res.json())
			.then(data => {
				setEventsList(data);
				console.log(data)
			})
	}, [addEventMarker]);

	console.log(addEventMarker)

	return <>
		<MapContext.Provider value={{
				user,
				setUser,
				api,
				setApi,
				mapInstance,
				setMapInstance,
				activeBar,
				setActiveBar,
				formAddEventData,
				setFormAddEventData,
				eventsList,
				setEventsList,
				addEventMarker,
				setAddEventMarker,
				eventListByType, 
				SetEventListByType,
				zoomNumber,
				setZoomNumber,
				}}>
					<Routes>
						<Route path={"/"} element={<Main />}></Route>
                    	<Route path={"/addevent"} element={<AddEvent/>} ></Route>
						<Route path={"/profile"} element={<Profile/>}></Route>
						<Route path={"/eventpage/:id"} element={<EventPage/>}></Route>
                	</Routes>
		</MapContext.Provider>
	</>
}

export default App;
