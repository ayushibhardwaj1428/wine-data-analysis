import React from "react";
import WineAnalysis from "./components/wineAnalysis";
import wineData from "./wine-data.json";

const App: React.FC = () => {
  return (
    <div className="App">
      <WineAnalysis wineData={wineData} />
    </div>
  );
};

export default App;
