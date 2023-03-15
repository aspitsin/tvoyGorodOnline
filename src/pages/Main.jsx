import React, {useState, useContext} from 'react';
import Mapgl from '../components/Mapgl';
import Sidebar from '../components/Sidebar';

import MapContext from '../components/MapContext';

const Main = () => {
	const { eventsList } = useContext(MapContext);
	const [eventTarget, setEventTarget] = useState();
	return <>
		<Sidebar setEventTarget={setEventTarget}/>
		<Mapgl eventTarget={eventTarget}/>
	</>
}

export default Main