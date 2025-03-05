
import { Beer } from "@/data/beers";
import { Star, MapPin, Droplets, ThermometerSun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BeerDetailProps {
  beer: Beer;
  onClose: () => void;
  className?: string;
  isVisible: boolean;
}

export const BeerDetail = ({ beer, onClose, className, isVisible }: BeerDetailProps) => {
  const stars = Array(5).fill(0);
  
  if (!beer) return null;
  
  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 beer-card-transition",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div 
        className={cn(
          "bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl beer-card-transition relative z-10",
          isVisible ? "scale-100" : "scale-95"
        )}
      >
        <div className="relative h-72 w-full">
          <img 
            src={beer.imageUrl}
            alt={`${beer.name} by ${beer.brewery}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <Button 
            onClick={onClose} 
            variant="outline" 
            size="icon" 
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 text-white"
          >
            ✕
          </Button>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <Badge className="mb-2 bg-beer-label">{beer.style}</Badge>
            <h1 className="text-2xl font-bold mb-1">{beer.name}</h1>
            <p className="text-white/90">{beer.brewery}</p>
          </div>
        </div>
        
        <div className="p-6 space-y-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {stars.map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < Math.floor(beer.rating) 
                      ? "text-yellow-500 fill-yellow-500" 
                      : i < beer.rating 
                        ? "text-yellow-500 fill-yellow-500 opacity-70" 
                        : "text-gray-300"
                  )}
                />
              ))}
              <span className="ml-2 font-medium">{beer.rating.toFixed(1)}</span>
            </div>
            
            <div className="flex gap-2">
              <Badge className="flex items-center gap-1 bg-secondary text-secondary-foreground">
                <Droplets className="w-3 h-3" /> {beer.abv}% ABV
              </Badge>
              <Badge className="flex items-center gap-1 bg-secondary text-secondary-foreground">
                <ThermometerSun className="w-3 h-3" /> {beer.ibu} IBU
              </Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="font-medium text-gray-900">Description</h2>
            <p className="text-gray-700 leading-relaxed">{beer.description}</p>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{beer.origin}</span>
          </div>
        </div>
        
        <div className="p-6 pt-0">
          <Button 
            onClick={onClose} 
            className="w-full bg-beer-label hover:bg-beer-label/90"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
