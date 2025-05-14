import { useCallback, useEffect, useRef, useState } from "react";
import { createEmptyGrid, getGridSize } from "@/utils/utils";
import { twMerge } from "tailwind-merge";
import { COLS, DIRECTIONS, ROWS } from "@/constants";
import PlayPauseButton from "./PlayPauseButton";
import Button from "./Button";
import Select from "./Select";
const GameOfLifeSimulation = () => {
  //setting the grid.
  //if the Cell is alive its gonna have 1 in it and if its dead its gonna have 0 in it
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [cellSize, setCellSize] = useState(getGridSize());
  const speedRef = useRef(speed);
  const playingRef = useRef(isPlaying);
  playingRef.current = isPlaying;
  speedRef.current = speed;
  useEffect(() => {
    const handleResize = () => {
      setCellSize(getGridSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const runGameOfLife = useCallback(() => {
    if (!playingRef.current) return;

    setGrid((currentGrid) => {
      const newGrid = currentGrid.map((arr) => [...arr]);
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          let liveNeighbors = 0;
          DIRECTIONS.forEach(([xDirection, yDirection]) => {
            const neighborRow = row + xDirection;
            const neighborCol = col + yDirection;
            if (
              neighborRow >= 0 &&
              neighborRow < ROWS &&
              neighborCol >= 0 &&
              neighborCol < COLS
            ) {
              liveNeighbors += currentGrid[neighborRow][neighborCol] ? 1 : 0;
            }
          });
          if (liveNeighbors < 2 || liveNeighbors > 3) {
            newGrid[row][col] = 0;
          } else if (currentGrid[row][col] === 0 && liveNeighbors === 3) {
            newGrid[row][col] = 1;
          }
        }
      }
      return newGrid;
    });

    setTimeout(runGameOfLife, speedRef.current);
  }, [playingRef, setGrid]);

  const handleIsMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleIsMouseUp = () => {
    setIsMouseDown(false);
  };

  const toggleCellState = (rowToToggle: number, colToToggle: number) => {
    const newGrid = grid.map((row, rowIdx) =>
      row.map((cell, colIdx) =>
        rowIdx === rowToToggle && colIdx === colToToggle ? (cell ? 0 : 1) : cell
      )
    );
    setGrid(newGrid);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isMouseDown) {
      //toggle the cell state
      toggleCellState(row, col);
    }
  };
  return (
    <div className="h-screen w-screen flex items-center p-4  flex-col gap-4 relative ">
      <div className="flex gap-4 items-center">
        <PlayPauseButton
          onClick={() => {
            setIsPlaying(!isPlaying);
            if (!isPlaying) {
              playingRef.current = true;
              //run simulation
              runGameOfLife();
            }
          }}
          isPlaying={isPlaying}
        />
        <Button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < ROWS; i++) {
              rows.push(
                Array.from(Array(COLS), () => (Math.random() > 0.75 ? 1 : 0))
              );
            }
            setGrid(rows);
          }}
        >
          seed
        </Button>
        <Button
          onClick={() => {
            setIsPlaying(false);
            setGrid(createEmptyGrid());
          }}
        >
          clear
        </Button>
        <Select
          label="Speed selector"
          value={speed}
          onChange={(val) => setSpeed(Number(val))}
          options={[
            { value: 1000, label: "Slow" },
            { value: 500, label: "Medium" },
            { value: 100, label: "Fast" },
            { value: 50, label: "Lightning" },
          ]}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS},${cellSize}px)`,
          gridTemplateRows: `repeat(${ROWS},${cellSize}px)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((_col, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={twMerge(
                "border border-[#9050e9] aspect-square w-full h-full",
                grid[rowIndex][colIndex] ? "bg-[#ad7bee]" : "bg-[#240643]"
              )}
              onMouseDown={handleIsMouseDown}
              onMouseUp={handleIsMouseUp}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onClick={() => toggleCellState(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameOfLifeSimulation;
