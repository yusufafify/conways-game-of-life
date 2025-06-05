# Conway's Game of Life

![Conway's Game of Life](public/logo.png)

## Overview

Conway's Game of Life is an interactive web application that simulates John Conway's famous cellular automaton. This zero-player game evolves based on its initial state and a simple set of rules, creating fascinating emergent patterns and behaviors from simple local interactions.

The simulation runs on a grid where each cell can be either alive or dead. The state of each cell in the next generation is determined by its current state and the number of live neighbors according to specific rules.

## Live Demo

Visit the application at [conways-game-of-life-rust.vercel.app](https://conways-game-of-life-rust.vercel.app)

## Features

- **Interactive Grid**: Click on cells to toggle their state (alive/dead)
- **Playback Controls**: Start, pause, and reset the simulation
- **Speed Control**: Adjust simulation speed from slow to lightning-fast
- **Random Seeding**: Generate random initial patterns
- **Responsive Design**: Adapts to different screen sizes
- **Educational Content**: Learn about Conway's Game of Life, its rules, and its significance
- **Pattern Library**: Explore classic patterns like Blinkers, Gliders, and Gosper Glider Guns
- **Smooth Animations**: Enhanced user experience with GSAP animations

## Game Rules

1. Any live cell with fewer than two live neighbors dies (underpopulation)
2. Any live cell with two or three live neighbors survives
3. Any live cell with more than three live neighbors dies (overpopulation)
4. Any dead cell with exactly three live neighbors becomes alive (reproduction)

## Technologies

- **React 19**: Modern component-based UI library
- **TypeScript**: Type-safe JavaScript for robust code
- **Vite**: Fast, modern frontend build tool
- **React Router**: Client-side routing between landing page and simulation
- **TailwindCSS**: Utility-first CSS framework for responsive design
- **GSAP**: Professional animation library for smooth transitions and effects
- **Lucide React**: Beautiful, consistent SVG icons


## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yusufafify/conways-game-of-life.git
cd conways-game-of-life
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## How to Use

1. Navigate to the Simulation page
2. Click on cells to toggle them between alive (purple) and dead (dark)
3. Use the play button to start the simulation
4. Adjust the speed using the dropdown menu
5. Click 'seed' to generate a random pattern
6. Click 'clear' to reset the grid

## Educational Value

Conway's Game of Life demonstrates how complex patterns and behaviors can emerge from simple rules. It has applications in various fields including:

- Computer science (cellular automata)
- Mathematics (pattern formation)
- Biology (population dynamics)
- Artificial intelligence (emergent behavior)
- Physics (self-organizing systems)

## Acknowledgments

- John Horton Conway for inventing the Game of Life
- The React and TypeScript communities for their excellent tools
