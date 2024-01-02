// The "mean" is the "average" you're used to, where you add up all the numbers
//  * and then divide by the number of numbers.
export const calculateMean = (data: number[]): number => {
  const sum = data.reduce((acc, value) => acc + value, 0);
  return parseFloat((sum / data.length).toFixed(3));
};

// The "median" is the "middle" value in the list of numbers.
export const calculateMedian = (data: number[]): number => {
  const sortedData = data.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedData.length / 2);

  if (sortedData.length % 2 === 0) {
    return (sortedData[middle - 1] + sortedData[middle]) / 2;
  }

  return parseFloat(sortedData[middle].toFixed(3));
};

// The "mode" is the number that is repeated most often.
export const calculateMode = (data: number[]): number | number[] => {
    const frequencyMap: { [key: number]: number } = {};
  
    data.forEach((value) => {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });
  
    let mode: number[] = [];
    let maxFrequency = 0;
  
    for (const key in frequencyMap) {
      if (frequencyMap[key] > maxFrequency) {
        mode = [parseFloat(key)];
        maxFrequency = frequencyMap[key];
      } else if (frequencyMap[key] === maxFrequency) {
        mode.push(parseFloat(key));
      }
    }
   
    return mode.length > 1 ? mode : (mode.length === 1 ? mode[0] : 0);
  };
  
//  Calculate Gamma as per given instruction i.e Gamma = (Ash * Hue) / Magnesium
  export const calculateGamma = (Ash: number, Hue: number, Magnesium: number): number => {
    return parseFloat(((Ash * Hue) / Magnesium).toFixed(3));
  };
