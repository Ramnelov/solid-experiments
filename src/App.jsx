import { Router, Route } from "@solidjs/router";
import HomeView from "./views/HomeView";
import DroneView from "./views/DroneView";
import MapView from "./views/MapView";
import LoginComponent from "./components/LoginComponent";


const App = () => {
  

  return (
    <>
      <h1>Solid experimentos</h1>
      <Router>
        <Route path="/" component={HomeView} />
        <Route path="/map" component={MapView} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/:id" component={DroneView} />
      </Router>
    </>
  );
};

export default App;