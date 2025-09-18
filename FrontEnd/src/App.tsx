import { RouterProvider } from "react-router-dom";

import router from "./router/routes";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
