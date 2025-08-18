import { projects } from "@/data/projects";
import { useFavorites } from "@/hooks/useFavorites";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const userId = localStorage.getItem("userId");

  // Get favorite projects
  const favoriteProjects = projects.filter((project) =>
    favorites.includes(project.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            الرجوع للمشاريع
          </Link>
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-primary fill-current" />
          <h1 className="text-3xl font-bold">المفضلة</h1>
          <span className="text-muted-foreground">({favoriteProjects.length})</span>
        </div>

        {!userId ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">
               سجّل الدخول للوصول إلى المفضلة
            </h2>
            <p className="text-muted-foreground mb-8">
              تحتاج إلى تسجيل الدخول لعرض مشاريعك المفضلة.
            </p>
            <Button asChild size="lg">
              <Link to="/login">تسجيل الدخول</Link>
            </Button>
          </div>
        ) : favoriteProjects.length > 0 ? (
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
          /* Empty State (مستخدم مسجّل لكن ما عنده عناصر) */
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">لا توجد مشاريع مفضلة بعد </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              ابدأ في استكشاف مشاريعنا السكنية المذهلة وأضفها إلى قائمتك المفضلة
            </p>
            <Button asChild size="lg">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                أستكشف المشاريع
              </Link>
            </Button>
          </div>
        )}
      </div>

      <footer className="bg-primary text-primary-foreground py-8 px-4 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-lg">
            Created by <span className="font-semibold">Arwa Alswilem</span> -Frontend Developer
          </p>

          <div className="flex justify-center gap-6 text-sm">
            <a
              href="https://ruh-s3.bluvalt.com/nhcsa/uploads/NHC-Portfolio-V4-20250123.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              About NHC
            </a>
            <a
              href="https://www.linkedin.com/in/arwa-alswilem-5299982a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              My linkedin
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Favorites;
