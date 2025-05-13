import { COLS, ROWS } from "@/constants";

export const createEmptyGrid = ():number[][]=> {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};


export   const getGridSize=()=>{
  const size=Math.min(
    (window.innerWidth-32)/COLS,
    (window.innerHeight-200)/ROWS,
    100
  )  
  return size
  }