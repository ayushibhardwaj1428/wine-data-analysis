import { useMemo } from "react";
import { calculateMean, calculateMedian, calculateMode } from "../util";
import { IAlcoholClass } from "./wineAnalysis";

const FlavonidsTable: React.FC<{ alcoholClasses: IAlcoholClass[] }> = ({
  alcoholClasses,
}) => {
  const columnContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const cellStyle: React.CSSProperties = {
    border: "1px solid #000",
    padding: "8px 12px",
    width: "90px",
    height: "80px",
    textAlign: "center",
    overflowY: "scroll"
  };

  const flavonidsHeaderText = [
    "Measure",
    "Flavanoids Mean",
    "Flavanoids Median",
    "Flavanoids Mode",
  ];

  const ColumnAlcoholData: JSX.Element[] = useMemo(() => {

    return alcoholClasses.map((alcoholClass: IAlcoholClass, index) => {
      const alcoholKey = Object.keys(alcoholClass)[0];

      let flavonidsMode = calculateMode(alcoholClass[alcoholKey].Flavanoids);

      return (
        <div style={columnContainerStyle} key={index}>
          <div style={cellStyle}>
            <h4>{`Class ${alcoholKey}`}</h4>
          </div>
          <div style={cellStyle}>
            <h4>{calculateMean(alcoholClass[alcoholKey].Flavanoids)}</h4>
          </div>
          <div style={cellStyle}>
            <h4>{calculateMedian(alcoholClass[alcoholKey].Flavanoids)}</h4>
          </div>
          <div style={cellStyle}>
            {typeof flavonidsMode === "number" ? (
              <h4> {flavonidsMode} </h4>
            ) : flavonidsMode.length > 0 ? (
              flavonidsMode.map((item, itemIndex) => (
                <h5 style={{ display: "inline-block" }} key={itemIndex}>
                  {item},
                </h5>
              ))
            ) : (
              0
            )}
          </div>
        </div>
      );
    });
    
  }, [alcoholClasses]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px auto",
      }}
    >
      <div style={columnContainerStyle}>
        {flavonidsHeaderText.map((text, index) => (
          <div key={index} style={cellStyle}>
            <h4>{text}</h4>
          </div>
        ))}
      </div>
      {ColumnAlcoholData}
    </div>
  );
};

export default FlavonidsTable;
