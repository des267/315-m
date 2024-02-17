import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseTable from "./components/coursetable/coursetable.component";
import {useEffect, useState} from "react";
import {useQuery} from '@tanstack/react-query';
import axios from "axios";

function App() {
	const [activeStudent, setActiveStudent] = useState(1);

	return (
		<div className="App">
			<CourseTable courses={1}/>
		</div>
	);
}

export default App;
