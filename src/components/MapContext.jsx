import { createContext } from "react";

export default createContext({
	user: {},
	setUser: () => { },
	api: {},
	setApi: () => { },
	mapInstance: null,
	setMapInstance: () => { },
	activeBar: false,
	setActiveBar: () => { },
	formAddEventData: {},
	setFormAddEventData: () => { },
	eventsList: [],
	setEventsList: () => { },
	addEventMarker: [],
	setAddEventMarker: () => { },
	eventListByType: [],
	SetEventListByType: () => { },
	zoomNumber: 0,
	setZoomNumber: () => { },
});
