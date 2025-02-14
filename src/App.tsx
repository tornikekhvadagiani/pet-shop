import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
