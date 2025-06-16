import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import GooglePassword from "./components/GooglePassword";
import Success from "./components/Success";
import "bulma/css/bulma.min.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/google-password" element={<GooglePassword />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
};

export default App;
