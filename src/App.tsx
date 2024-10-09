import React from "react";
import "./App.css";
import Stories from "./components/stories/Stories";

function App() {
	return (
		<div className="App">
			<h1>Hacker news</h1>
			<Stories />
		</div>
	);
}

export default App;
