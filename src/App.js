import { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard";

import blueCandy from'./images/blue.png'
import greenCandy from'./images/green.png'
import orangeCandy from'./images/orange.png'
import purpleCandy from'./images/purple.png'
import redCandy from'./images/red.png'

import yellowCandy from'./images/yellow.png'
import blankCandy from'./images/blank.png'


/* useState is a hook used to manage state in functional 
components, while useEffect is a hook used to manage side 
effects (like fetching data, setting up event listeners, 
or updating the DOM) in functional components.
*/

// Width and Color
const width = 8;
const candyColors = [blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy];

// Create Board with an Array using Const Expression instead of Function
const App = () => {
    // useState is a Hook that lets you add React state to function components
    const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
    const [squareBeingDragged, setSquareBeingDragged] = useState(null)
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
    const [scoreDisplay, setScoreDisplay] = useState(0)

    //Check for column of 4 using a loop           
    function checkForColumnOfFour() {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === blankCandy;

            if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 4)
                columnOfFour.forEach(square => currentColorArrangement[square] = blankCandy)
                return true
            }
        }
    }

    //Check for column of 3 using a loop
    const checkForColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blankCandy;

            if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                columnOfThree.forEach(square => currentColorArrangement[square] = blankCandy)
                return true
                
            }
        }
    };

    //Check for column of 3 using a loop
    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentColorArrangement[i];
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            const isBlank = currentColorArrangement[i] === blankCandy;

            if (notValid.includes(i)) continue

            if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 4)
                rowOfFour.forEach(square => currentColorArrangement[square] = blankCandy)
                return true
            }
        }
    };

    //Check for column of 3 using a loop
    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = currentColorArrangement[i];
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            const isBlank = currentColorArrangement[i] === blankCandy;

            if (notValid.includes(i)) continue

            if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor&& !isBlank)){
                setScoreDisplay((score) => score + 3)
                rowOfThree.forEach(square => currentColorArrangement[square] = blankCandy)
                return true
            }
        }
    };

    const moveIntoSquareBelow = () => {
        for (let i = 0; i < 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArrangement === blankCandy) {
                let randomNumber = Math.floor(Math.random() * candyColors.length)
                currentColorArrangement[i] = candyColors[randomNumber]
            }

            if ((currentColorArrangement[i + width]) === blankCandy) {
                currentColorArrangement[i + width] = currentColorArrangement[i]
                currentColorArrangement[i] = blankCandy
            }
        }
    };

    console.log(scoreDisplay)

    function dragStart(e) {
        console.log(e.target);
        // console.log('drag start', e.target);
        setSquareBeingDragged(e.target);
    }

    const dragDrop = (e) => {
        console.log(e.target)
       //  console.log('drag drop', e.target)
        setSquareBeingReplaced(e.target)
    };

    const dragEnd = () => {            
            // Use parse to make sure it returns a number
            const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
            const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))
           
            currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
            currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');

            const validMoves = [
                squareBeingDraggedId - 1,
                squareBeingDraggedId - width,
                squareBeingDraggedId + 1,
                squareBeingDraggedId + width
            ]
            const validMove = validMoves.includes(squareBeingReplacedId)

            const isAColumnOfFour = checkForColumnOfFour()
            const isARowOfFour = checkForRowOfFour()

            const isAColumnOfThree = checkForColumnOfThree()
            const isARowOfThree = checkForRowOfThree()

            if(squareBeingReplacedId && validMove && (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)){
                setSquareBeingDragged(null)
                setSquareBeingReplaced(null)
            } else {
                currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
                currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
                setCurrentColorArrangement([...currentColorArrangement])
            }                

        }
        
        // Create a board with an Array of 64 random colors
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

    // Runs a new interval every 100 milliseconds
    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            moveIntoSquareBelow();
            // ... Takes an Array and expands to individual elements
            setCurrentColorArrangement([...currentColorArrangement]);
        }, 100);

        return () => clearInterval(timer);
        // Dependancies
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement]);


    // Use map function to view the resuls
    return (
        <div className="App">
          <div className="game">
            {currentColorArrangement.map((candyColors, index: number) => (
              <img
                key={index}
                src={candyColors}
                alt={candyColors}
                data-id={index}
                draggable ={true}
                onDragStart={dragStart}
                onDragOver={(e:DragEvent<HTMLImageElement>) => e.preventDefault()}
                onDragEnter={(e:DragEvent<HTMLImageElement>) => e.preventDefault()}
                onDragLeave={(e:DragEvent<HTMLImageElement>) => e.preventDefault()}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
              />
            ))}
           </div>
          <ScoreBoard score={scoreDisplay}/>
        </div>
      );
    };
    export default App;