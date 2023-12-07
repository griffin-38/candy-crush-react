import { useEffect, useState } from "react";

// Width and Color
const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

// Create Board with an Array using Const Expression instead of Function
const App = () => {
  // useState is a Hook that lets you add React state to function components
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  // Array of 64 random colors
  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      // Get a random color - using floor to make sure they are rounded numbers
      const randomNumberFrom0to5 = Math.floor(
        Math.random() * candyColors.length
      );
      const randomColor = candyColors[randomNumberFrom0to5];
      // Push our the color
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
    // Validate random color view in Dev tools
    // console.log(randomColorArrangement)
  };

  // useEffect stops endless loop
  useEffect(() => {
    createBoard();
  }, []);

  console.log(currentColorArrangement);

  return (
    <div className="App">
      <div className="game">
        {currentColorArrangement.map((candyColors, index:number ) => (
            <img 
            key={index} 
            style={{ backgroundColor: candyColors }} 
            />
        ))}
      </div>
    </div>
  );
};
export default App;
