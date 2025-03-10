import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';

// Using local chain logo images
const TILE_IMAGES = [
  '/img/sophon.png',
  '/img/lens-chain.png',
  '/img/abstract.png',
  '/img/treasure.png',
  '/img/space-and-time.png',
  '/img/cronos.png',
  '/img/era.png',
  '/img/xsolla.png',
];

const GameBoard = ({ onGameComplete, onMovesUpdate }) => {
  const [tiles, setTiles] = useState([]);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const shuffledTiles = [...TILE_IMAGES, ...TILE_IMAGES]
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    setTiles(shuffledTiles);
    setFlippedTiles([]);
    setMatchedPairs([]);
  };

  const handleTileClick = (id) => {
    if (flippedTiles.length === 2) return;

    const newTiles = tiles.map((tile) =>
      tile.id === id ? { ...tile, isFlipped: true } : tile
    );
    setTiles(newTiles);

    const newFlippedTiles = [...flippedTiles, id];
    setFlippedTiles(newFlippedTiles);

    if (newFlippedTiles.length === 2) {
      const [firstId, secondId] = newFlippedTiles;
      const firstTile = tiles.find((tile) => tile.id === firstId);
      const secondTile = tiles.find((tile) => tile.id === secondId);

      if (firstTile.image === secondTile.image) {
        setMatchedPairs([...matchedPairs, firstTile.image]);
        setFlippedTiles([]);
        onMovesUpdate((prev) => prev + 1);

        if (matchedPairs.length + 1 === TILE_IMAGES.length) {
          onGameComplete();
        }
      } else {
        setTimeout(() => {
          setTiles(
            tiles.map((tile) =>
              tile.id === firstId || tile.id === secondId
                ? { ...tile, isFlipped: false }
                : tile
            )
          );
          setFlippedTiles([]);
        }, 1000);
        onMovesUpdate((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-2 sm:p-6 bg-white rounded-xl shadow-inner max-w-[600px] mx-auto">
      <div className="contents">
        {tiles.map((tile) => (
          <Tile
            key={tile.id}
            id={tile.id}
            image={tile.image}
            isFlipped={tile.isFlipped || matchedPairs.includes(tile.image)}
            isMatched={matchedPairs.includes(tile.image)}
            onClick={handleTileClick}
          />
        ))}
      </div>
    </div>
  );
};

GameBoard.propTypes = {
  onGameComplete: PropTypes.func.isRequired,
  onMovesUpdate: PropTypes.func.isRequired,
};

export default GameBoard; 
