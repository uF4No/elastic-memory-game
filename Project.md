# Build a Memory Matching Game with React

## **Project Overview**
I need you to build a **Memory Matching Game** using **React**. This is a client-side game with no backend for now. The game consists of a **4x4 grid (16 tiles, 8 pairs)** where the player must find all matching pairs.

## **Game Rules**
- The board starts with **16 face-down tiles**.
- Clicking a tile reveals its content (image or icon).
- The player can select **two tiles per turn**:
  - If they match, they remain face-up.
  - If they don’t match, they flip back after a short delay.
- The game ends when **all pairs are found**.

## **Technical Requirements**
### **1. Tech Stack**
- **React (Vite or Create React App)**
- **CSS (or Tailwind for styling)**
- **React State Management** (`useState`, `useEffect`)

### **2. Component Breakdown**
#### **App.jsx (Main Component)**
- Manages game state (moves, game completion).
- Displays a "Restart" button.

#### **GameBoard.jsx (Core Logic)**
- Initializes the shuffled tile pairs.
- Tracks selected tiles and compares them.
- Manages tile flipping logic.

#### **Tile.jsx (Single Tile Component)**
- Displays either a hidden or revealed image.
- Handles click interactions.

### **3. Game Logic**
- **Shuffle the tiles** at the start.
- **Track flipped tiles** using `useState`.
- **Handle tile clicks**:
  - Compare two selected tiles.
  - Match → Keep flipped.
  - No match → Reset after a delay.
- **Track moves and completion**.
- **Restart button** resets the game.

## **Additional Notes**
- Use **functional components** and **React Hooks**.
- The UI should be **responsive**.
- Feel free to use placeholder images/icons.

## **Deliverables**
- A **working React project** with:
  - Functional game mechanics.
  - Clean and modular code.
  - Basic styling (CSS or Tailwind).
