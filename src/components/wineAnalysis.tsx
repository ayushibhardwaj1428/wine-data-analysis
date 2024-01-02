import { useEffect, useState } from "react";
import { calculateGamma } from "../util";
import FlavonidsTable from "./FlavonidsTable";
import GammaTable from "./GammaTable";

interface IWineData {
  Alcohol: number;
  "Malic Acid": number;
  Ash: number | string;
  "Alcalinity of ash": number;
  Magnesium: number;
  "Total phenols": number;
  Flavanoids: number | string;
  "Nonflavanoid phenols": number | string;
  Proanthocyanins: string;
  "Color intensity": number | string;
  Hue: number;
  "OD280/OD315 of diluted wines": number | string;
  Unknown: number;
  [key: string]: any;
}

export interface IAlcoholClass {
  [key: string]: {
    Flavanoids: number[];
    gamma: number[];
  };
}

const WineAnalysis: React.FC<{ wineData: IWineData[] }> = ({ wineData }) => {
  const [alcoholClasses, setAlcoholClasses] = useState<IAlcoholClass[]>([]);

  useEffect(() => {
    if (wineData) {
      const uniqueAlcoholClasses: IAlcoholClass[] = [];

      wineData.forEach((item) => {
        const alcoholKey = String(item.Alcohol);

        if (
          !uniqueAlcoholClasses.find((alcoholClass) => alcoholClass[alcoholKey])
        ) {
          uniqueAlcoholClasses.push({
            [alcoholKey]: {
              Flavanoids: [],
              gamma: [],
            },
          });
        }

        uniqueAlcoholClasses.forEach((alcoholClass) => {
          if (alcoholClass[alcoholKey]) {
            alcoholClass[alcoholKey].Flavanoids.push(Number(item.Flavanoids));
            alcoholClass[alcoholKey].gamma.push(
              Number(
                calculateGamma(
                  Number(item.Ash),
                  Number(item.Hue),
                  Number(item.Magnesium)
                )
              )
            );
          }
        });
      });

      setAlcoholClasses(uniqueAlcoholClasses);
    }
  }, [wineData]);

  return (
    <div>
      <FlavonidsTable alcoholClasses={alcoholClasses} />
      <GammaTable alcoholClasses={alcoholClasses} />
    </div>
  );
};

export default WineAnalysis;
