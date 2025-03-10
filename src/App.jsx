import { useState, useCallback } from 'react';
import GameBoard from './components/GameBoard';

function App() {
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleGameComplete = useCallback(() => {
    setIsComplete(true);
  }, []);

  const handleRestart = () => {
    setMoves(0);
    setIsComplete(false);
  };

  const getShareText = () => {
    return encodeURIComponent(`🎮 I completed the ZKsync Memory Challenge in ${moves} moves! Can you beat my score?\n\nPlay now at: https://game.zksync.io`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] to-[#0C18EC] py-6 sm:py-12 px-3 sm:px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-center mb-8 sm:mb-12">
          <img 
            src="/img/elastic-hero.png" 
            alt="The Elastic Network" 
            className="h-20 sm:h-32 object-contain filter brightness-110"
          />
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-center text-white mb-6 sm:mb-8">
          ZKsync memory challenge
        </h1>
        <div className="text-center mb-6 sm:mb-8 px-2 sm:px-0">
          <p className="text-lg sm:text-xl text-[#FFFFFF] mb-4 sm:mb-6">
            <a href="https://www.zksync.io/" className="text-[#BFF351] hover:text-[#13D5D3] font-medium">
              ZKsync
            </a>{" "}
            is the Elastic Network, a cluster of interconnected blockchains with shared liquidity 
            and users powered by ZK Stack.
          </p>
          <p className="text-lg sm:text-xl text-[#13D5D3] mb-3 sm:mb-4">
            Find and match the logos of the different chains of the Elastic Network.
          </p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
            <div className="text-lg sm:text-xl font-semibold text-[#000000] text-center sm:text-left">
              Moves: {moves}
            </div>
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#1755F4] text-white rounded-lg font-semibold 
                       hover:bg-[#0C18EC] transform hover:scale-105 transition-all
                       shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              Restart Game
            </button>
          </div>

          <GameBoard
            onGameComplete={handleGameComplete}
            onMovesUpdate={setMoves}
          />

          {isComplete && (
            <div className="mt-6 sm:mt-8 text-center bg-[#BFF351]/10 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-inner">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1755F4] mb-2 sm:mb-3">
                🎉 Congratulations! 🎉
              </h2>
              <p className="text-base sm:text-lg text-[#0C18EC] mb-6 sm:mb-8">
                You completed the game in {moves} moves!
              </p>
              <a 
                href={`https://twitter.com/intent/tweet?text=${getShareText()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-lg 
                         font-bold hover:bg-zinc-800 transform hover:scale-105 transition-all
                         shadow-md hover:shadow-lg text-base sm:text-lg"
              >
                Share score on X
              </a>
              <p className="mt-4 text-base sm:text-lg text-[#0C18EC]">
                Ready to build on ZKsync?{" "}
                <a 
                  href="https://docs.zksync.io/"
                  className="text-[#1755F4] hover:text-[#0C18EC] font-semibold underline"
                >
                  Check out our docs →
                </a>
              </p>
            </div>
          )}
        </div>

        <footer className="mt-8 text-center text-white/80">
          <p className="text-sm sm:text-base">
            Built with ❤️ by ZKsync devs •{" "}
            <a 
              href="https://github.com/matter-labs/elastic-memory-game"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#BFF351] hover:text-[#13D5D3]"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App; 
