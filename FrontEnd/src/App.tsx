import router from "./router/routes";
import { RouterProvider } from "react-router-dom";

const App = () => {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
