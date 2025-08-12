import { Search, Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import luluLogo from "@/assets/lulu-logo.png";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-smooth">
          <img src={luluLogo} alt="Lulu" className="h-8 w-auto" />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects..."
              className="pl-10 bg-card border-border/60 focus:border-primary/40 transition-smooth"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="outline" asChild>
            <Link to="/">
              <Home className="h-4 w-4" />
              Discover
            </Link>
          </Button>
          
          <Button 
            variant={location.pathname === "/favorites" ? "default" : "ghost"} 
            asChild
          >
            <Link to="/favorites">
              <Heart className="h-4 w-4" />
              Favorites
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;