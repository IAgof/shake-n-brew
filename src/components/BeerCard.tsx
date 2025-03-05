
import { Beer } from "@/data/beers";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BeerCardProps {
  beer: Beer;
  className?: string;
  isShowing?: boolean;
}

export const BeerCard = ({ beer, className, isShowing = true }: BeerCardProps) => {
  const stars = Array(5).fill(0);
  
  return (
    <div 
      className={cn(
        "w-full max-w-sm beer-card-transition rounded-2xl overflow-hidden shadow-lg bg-white",
        isShowing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
        className
      )}
    >
      <div className="relative h-60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
        <img 
          src={beer.imageUrl}
          alt={`${beer.name} by ${beer.brewery}`}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <Badge className="bg-beer-label text-white mb-2">{beer.style}</Badge>
          <h2 className="text-white text-xl font-semibold">{beer.name}</h2>
          <p className="text-white/90 text-sm">{beer.brewery}</p>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {stars.map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < Math.floor(beer.rating) 
                    ? "text-yellow-500 fill-yellow-500" 
                    : i < beer.rating 
                      ? "text-yellow-500 fill-yellow-500 opacity-50" 
                      : "text-gray-300"
                )}
              />
            ))}
            <span className="text-sm font-medium ml-1">{beer.rating.toFixed(1)}</span>
          </div>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-secondary text-secondary-foreground">
              ABV {beer.abv}%
            </Badge>
            <Badge variant="outline" className="bg-secondary text-secondary-foreground">
              IBU {beer.ibu}
            </Badge>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3">{beer.description}</p>
        
        <div className="pt-2 flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {beer.origin}
          </Badge>
        </div>
      </div>
    </div>
  );
};
