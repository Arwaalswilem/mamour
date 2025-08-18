import { Heart, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ProjectCardProps {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  startingPrice: number;
  type: string;
  isLiked?: boolean;
  onToggleLike?: (id: string) => void;
}

const ProjectCard = ({ 
  id, 
  title, 
  location, 
  description, 
  image, 
  startingPrice, 
  type,
  isLiked = false,
  onToggleLike 
}: ProjectCardProps) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLikeToggle = () => {
    setLiked(!liked);
    onToggleLike?.(id);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-card transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card border-border/60">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white transition-all ${
            liked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={handleLikeToggle}
        >
          <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
        </Button>

        {/* Type Badge */}
        <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground backdrop-blur-sm">
          <Building className="h-3 w-3 mr-1" />
          {type}
        </Badge>
      </div>

      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link to={`/project/${id}`}>
           عرض التفاصيل
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;