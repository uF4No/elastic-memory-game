import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';

// All available chain logo images with their corresponding website URLs
const ALL_TILE_DATA = [
  {
    image: '/img/sophon.png',
    url: 'https://sophon.xyz'
  },
  {
    image: '/img/lens.png',
    url: 'https://lens.xyz'
  },
  {
    image: '/img/abstract.png',
    url: 'https://abs.xyz'
  },
  {
    image: '/img/treasure.png',
    url: 'https://treasure.lol'
  },
  {
    image: '/img/space-and-time.png',
    url: 'https://spaceandtime.io'
  },
  {
    image: '/img/cronos.png',
    url: 'https://cronos.org'
  },
  {
    image: '/img/era.png',
    url: 'https://docs.zksync.io'
  },
  {
    image: '/img/xsolla.png',
    url: 'https://xsolla.com'
  },
  {
    image: '/img/wonder.png',
    url: 'https://labs.wonder.fi/layer2'
  },
  {
    image: '/img/zkcandy.png',
    url: 'https://zkcandy.io'
  },
  {
    image: '/img/zero.png',
    url: 'https://zero.network'
  },
  {
    image: '/img/grvt.png',
    url: 'https://grvt.io'
  }
];

const GameBoard = ({ onGameComplete, onMovesUpdate }) => {
  const [tiles, setTiles] = useState([]);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedTileData, setSelectedTileData] = useState([]);

  // Function to randomly select 8 unique tiles from ALL_TILE_DATA
  const selectRandomTiles = useCallback(() => {
    const shuffled = [...ALL_TILE_DATA].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
  }, []);

  const initializeBoard = useCallback(() => {
    const selectedTiles = selectRandomTiles();
    setSelectedTileData(selectedTiles);
    
    const shuffledTiles = [...selectedTiles, ...selectedTiles]
      .map((data, index) => ({
        id: index,
        image: data.image,
        url: data.url,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    
    setTiles(shuffledTiles);
    setFlippedTiles([]);
    setMatchedPairs([]);
  }, [selectRandomTiles]);

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

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

        if (matchedPairs.length + 1 === selectedTileData.length) {
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

  // Expose initializeBoard to parent through ref
  useEffect(() => {
    if (window.gameBoard) {
      window.gameBoard.initializeBoard = initializeBoard;
    } else {
      window.gameBoard = { initializeBoard };
    }
    return () => {
      delete window.gameBoard;
    };
  }, [initializeBoard]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-2 sm:p-6 bg-white rounded-xl shadow-inner max-w-[600px] mx-auto">
      <div className="contents">
        {tiles.map((tile) => (
          <Tile
            key={tile.id}
            id={tile.id}
            image={tile.image}
            url={tile.url}
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
