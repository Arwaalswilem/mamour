import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { projects } from "@/data/projects";
import { useFavorites } from "@/hooks/useFavorites";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Building, 
  Calendar, 
  User,
  Bed,
  Bath,
  Square,
  CheckCircle,
  SlidersHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [sortUnitsBy, setSortUnitsBy] = useState<"price-low" | "price-high" | "size">("price-low");
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Sort units based on selected criteria
  const sortedUnits = [...project.units].sort((a, b) => {
    switch (sortUnitsBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "size":
        return a.area - b.area;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header with Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Project Title Overlay */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between text-white">
              <div>
                <Badge className="mb-2 bg-white/20 text-white border-white/30">
                  <Building className="h-3 w-3 mr-1" />
                  {project.type}
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                  {project.title}
                </h1>
                <div className="flex items-center text-white/90">
                  <MapPin className="h-4 w-4 mr-1" />
                  {project.location}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className={`bg-white/20 backdrop-blur-sm hover:bg-white/30 ${
                  isFavorite(project.id) ? 'text-red-400' : 'text-white'
                }`}
                onClick={() => toggleFavorite(project.id)}
              >
                <Heart className={`h-5 w-5 ${isFavorite(project.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Project</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            {/* Unit Types Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Available Units</h2>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Sort: {sortUnitsBy === "price-low" ? "Price Low-High" : 
                             sortUnitsBy === "price-high" ? "Price High-Low" : "Size"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortUnitsBy("price-low")}>
                      Price: Low to High
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortUnitsBy("price-high")}>
                      Price: High to Low
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortUnitsBy("size")}>
                      Size (sq ft)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid gap-6">
                {sortedUnits.map((unit) => (
                  <Card key={unit.id} className="hover:shadow-card transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{unit.name}</h3>
                          
                          <div className="flex items-center gap-6 text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Bed className="h-4 w-4" />
                              <span>{unit.bedrooms === 0 ? 'Studio' : `${unit.bedrooms} BR`}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bath className="h-4 w-4" />
                              <span>{unit.bathrooms} BA</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Square className="h-4 w-4" />
                              <span>{unit.area} sq ft</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {unit.features.slice(0, 3).map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {feature}
                              </Badge>
                            ))}
                            {unit.features.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{unit.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            ${unit.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${Math.round(unit.price / unit.area).toLocaleString()}/sq ft
                          </p>
                          <Button className="mt-3">
                            Inquire Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Developer</p>
                    <p className="text-sm text-muted-foreground">{project.developer}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Completion</p>
                    <p className="text-sm text-muted-foreground">{project.completionDate}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="font-medium mb-2">Starting from</p>
                  <p className="text-3xl font-bold text-primary">
                    ${project.startingPrice.toLocaleString()}
                  </p>
                </div>

                <Button className="w-full" size="lg">
                  Schedule a Visit
                </Button>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {project.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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

export default ProjectDetails;