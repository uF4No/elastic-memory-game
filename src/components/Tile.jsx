import PropTypes from 'prop-types';

const Tile = ({ id, image, isFlipped, isMatched, onClick }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full aspect-square cursor-pointer perspective-1000"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front face */}
        <div
          className={`absolute w-full h-full backface-hidden bg-white rounded-lg 
                     border-2 border-indigo-500 shadow-lg flex items-center justify-center 
                     transform transition-opacity duration-500 ${
                       isFlipped ? 'opacity-0' : 'opacity-100'
                     }`}
        >
          <span className="text-2xl sm:text-4xl text-indigo-500 font-bold">?</span>
        </div>
        
        {/* Back face */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-lg 
                     border-2 border-indigo-500 shadow-lg overflow-hidden 
                     transform rotate-y-180 transition-opacity duration-500
                     bg-white ${
                       isFlipped ? 'opacity-100' : 'opacity-0'
                     }`}
        >
          <div className="w-full h-full p-2 sm:p-4 flex items-center justify-center">
            <img
              src={image}
              alt="chain logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Tile.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  isMatched: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tile; 
