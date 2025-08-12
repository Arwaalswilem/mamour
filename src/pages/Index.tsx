import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useFavorites } from "@/hooks/useFavorites";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "name">("name");
  const [filterType, setFilterType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get unique project types for filter
  const projectTypes = ["all", ...Array.from(new Set(projects.map(p => p.type)))];

  // Filter and sort projects
  const filteredAndSortedProjects = projects
    .filter(project => filterType === "all" || project.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.startingPrice - b.startingPrice;
        case "price-high":
          return b.startingPrice - a.startingPrice;
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover premium residential projects with modern amenities and exceptional designs
          </p>
          <Button variant="hero" size="hero" className="shadow-glow">
            Explore Projects
          </Button>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 px-4 border-b border-border/40">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Featured Projects ({filteredAndSortedProjects.length})
            </h2>
            
            <div className="flex items-center gap-3">
              {/* Filter by Type */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    {filterType === "all" ? "All Types" : filterType}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {projectTypes.map(type => (
                    <DropdownMenuItem 
                      key={type} 
                      onClick={() => setFilterType(type)}
                    >
                      {type === "all" ? "All Types" : type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort Options */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Sort: {sortBy === "price-low" ? "Price Low-High" : 
                           sortBy === "price-high" ? "Price High-Low" : "Name"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>
                    Name
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-low")}>
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-high")}>
                    Price: High to Low
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode Toggle */}
              <div className="flex border border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className={`grid gap-8 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}>
            {filteredAndSortedProjects.map((project) => (
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
        </div>
      </section>

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

export default Index;
