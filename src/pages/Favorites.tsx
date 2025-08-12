import { projects } from "@/data/projects";
import { useFavorites } from "@/hooks/useFavorites";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Heart, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  
  // Get favorite projects
  const favoriteProjects = projects.filter(project => 
    favorites.includes(project.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-primary fill-current" />
          <h1 className="text-3xl font-bold">My Favorites</h1>
          <span className="text-muted-foreground">({favoriteProjects.length})</span>
        </div>

        {/* Content */}
        {favoriteProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                location={project.location}
                description={project.description}
                image={project.image}
                startingPrice={project.startingPrice}
                type={project.type}
                isLiked={isFavorite(project.id)}
                onToggleLike={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start exploring our amazing residential projects and add your favorites by clicking the heart icon on any project card.
            </p>
            <Button asChild size="lg">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Discover Projects
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-lg">
            Created by <span className="font-semibold">Your Name</span> • My Programming
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Favorites;