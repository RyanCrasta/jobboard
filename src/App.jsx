import { Provider, useSelector } from "react-redux";
import "./App.css";
import Filter from "./components/Filter";
import JobsSection from "./components/JobsSection";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <div id="appContainer">
        <Filter />
        <JobsSection />
      </div>
    </Provider>
  );
}

export default App;
