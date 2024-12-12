import "./App.css";
import { Navbar } from "./Components";
import { RegistrationForm } from "./Screens";

function App() {
  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <RegistrationForm />
        {/* <HomeScreen /> */}
      </div>
    </>
  );
}

export default App;
