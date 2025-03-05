
import { useState, useEffect } from "react";
import { useShake, simulateShake } from "@/hooks/useShake";
import { getRandomBeer } from "@/data/beers";
import { BeerCard } from "@/components/BeerCard";
import { BeerDetail } from "@/components/BeerDetail";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Smartphone, RefreshCw } from "lucide-react";

export const ShakeDetector = () => {
  const [selectedBeer, setSelectedBeer] = useState(getRandomBeer());
  const [showDetail, setShowDetail] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const isMobile = useIsMobile();
  
  const handleShake = () => {
    setShowCard(false);
    
    // Wait for the exit animation to complete
    setTimeout(() => {
      setSelectedBeer(getRandomBeer());
      setShowCard(true);
    }, 500);
  };
  
  // Use our shake hook
  const { isShaking } = useShake({
    onShake: handleShake,
  });
  
  useEffect(() => {
    // Show the card with a delay for initial animation
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleCardClick = () => {
    setShowDetail(true);
  };
  
  const handleDetailClose = () => {
    setShowDetail(false);
  };
  
  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[85vh] px-4">
      {/* Instructions */}
      <div className={`mb-8 text-center transition-all duration-500 ${showCard ? 'opacity-100' : 'opacity-0 transform translate-y-4'}`}>
        <h2 className="text-2xl font-semibold mb-2">Discover Craft Beer</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          {isMobile 
            ? "Shake your device to discover a new craft beer!" 
            : "Click the button below to discover a new craft beer!"}
        </p>
      </div>
      
      {/* Beer Card */}
      <div 
        className="relative w-full max-w-sm mx-auto cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
        onClick={handleCardClick}
      >
        <BeerCard beer={selectedBeer} isShowing={showCard} />
        
        {isShaking && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center animate-spin">
              <RefreshCw className="w-8 h-8 text-primary" />
            </div>
          </div>
        )}
      </div>
      
      {/* Desktop shuffle button */}
      {!isMobile && (
        <Button 
          onClick={handleShake} 
          className="mt-8 bg-primary text-white flex items-center gap-2 px-6 py-6 text-lg"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Find New Beer</span>
        </Button>
      )}
      
      {/* Mobile device indicator */}
      {isMobile && (
        <div className="mt-8 flex items-center justify-center animate-float">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
            <Smartphone className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Shake to Discover</span>
          </div>
        </div>
      )}
      
      {/* Browser testing button */}
      {!isMobile && (
        <div className="mt-4">
          <button
            onClick={() => simulateShake()}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            (Simulate Shake)
          </button>
        </div>
      )}
      
      {/* Beer Detail Modal */}
      <BeerDetail 
        beer={selectedBeer} 
        onClose={handleDetailClose} 
        isVisible={showDetail} 
      />
    </div>
  );
};
