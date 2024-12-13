import "./App.css";
import { Navbar } from "./Components";
import { HomeScreen, RegistrationForm } from "./Screens";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Navbar />
      <div className="homeContainer">
        <RegistrationForm />
        <HomeScreen />

        <Router>
          <div>
            <Routes>
              <Route path="/" element={<RegistrationForm />} />
              <Route path="/product" element={<HomeScreen />} />
            </Routes>
          </div>
        </Router>
      </div> */}
      <Router>
        <Navbar />
        <div className="homeContainer">
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/products" element={<HomeScreen />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
