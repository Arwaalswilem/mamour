import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { projects } from "@/data/projects";
import { useFavorites } from "@/hooks/useFavorites";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RiyalIcon from "@/assets/riyalr.svg";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Building,
  Bed,
  Bath,
  Square,
  CheckCircle,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ====== Unit Card with Image Slider ======
function UnitCardItem({ unit }: { unit: any }) {
  const [current, setCurrent] = useState(0);
  // Supports either unit.images[] or a single unit.image
  const images: string[] = Array.isArray(unit.images) && unit.images.length > 0
    ? unit.images
    : (unit.image ? [unit.image] : []);

  const hasImages = images.length > 0;
  const next = () => setCurrent((p) => (p + 1) % images.length);
  const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length);

  return (
    <Card key={unit.id} className="hover:shadow-card transition-shadow" dir="rtl">
      <CardContent className="p-6">
        {/* Image Slider */}
<div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-muted">
          {hasImages ? (
            <>
              <img
                src={images[current]}
                alt={`${unit.name} - ${current + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Dots indicators */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                    {images.map((_, i) => (
                      <span
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-2.5 w-2.5 rounded-full cursor-pointer border border-white/70 ${
                          i === current ? "bg-white" : "bg-white/40"
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full grid place-items-center text-sm text-muted-foreground">
              لا توجد صور
            </div>
          )}
        </div>

        {/* Card body */}
        <div 
  dir="rtl" 
  className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-right"
>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{unit.name}</h3>

    <div className="flex items-center gap-6 text-muted-foreground mb-3 justify-end">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{unit.bedrooms === 0 ? "استديو" : `${unit.bedrooms} دورة مياة`}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{unit.bathrooms} غرفة نوم</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{unit.area} {`100 م\u00B2`}</span>
              </div>
            </div>

            {unit.link && (
              <Button asChild className="flex items-center gap-6 text-white-foreground mb-3">
                <a href={unit.link} target="_blank" rel="noopener noreferrer">استعرض</a>
              </Button>
            )}

            {unit.brochureLink && (
              <Button
                asChild
                variant="secondary"
                className="flex items-center gap-6 text-white-foreground mb-3"
              >
                <a href={unit.brochureLink} target="_blank" rel="noopener noreferrer">
                  استكشف الكتيب
                </a>
              </Button>
            )}

            <div className="flex flex-wrap gap-2">
              {unit.features.slice(0, 3).map((feature: string, index: number) => (
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
            <p className="text-2xl font-bold text-primary flex-row-reverse flex items-end justify-end gap-1">
              <img src={RiyalIcon} alt="ريال" className="w-5 h-5" />
              {unit.price.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground flex-row-reverse flex items-end gap-1">
              <img src={RiyalIcon} alt="ريال" className="w-4 h-4" />
              {Math.round(unit.price / unit.area).toLocaleString()}/{`100 م\u00B2`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ====== Main Page ======
const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [sortUnitsBy, setSortUnitsBy] = useState<"price-low" | "price-high" | "size">("price-low");

  const project = projects.find((p) => p.id === id);

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
    <div dir="rtl" className="min-h-screen bg-background text-right">
      <Navbar />

      {/* Header with Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            الرجوع للمشاريع
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
                  isFavorite(project.id) ? "text-red-400" : "text-white"
                }`}
                onClick={() => toggleFavorite(project.id)}
              >
                <Heart className={`h-5 w-5 ${isFavorite(project.id) ? "fill-current" : ""}`} />
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
                <CardTitle>نبذة عن المشروع</CardTitle>
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
                <h2 className="text-2xl font-bold">المشاريع المتاحة</h2>

                <div>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      // no-op to keep shadcn dropdown import if you decide to switch back
                    }}
                  >
              <SlidersHorizontal className="h-4 w-4" />
ترتيب حسب: {sortUnitsBy === "price-low"
  ? "السعر: من الأقل إلى الأعلى"
  : sortUnitsBy === "price-high"
  ? "السعر: من الأعلى إلى الأقل"
  : "المساحة"}
</Button>
</div>
</div>

              {/* Simple sort buttons (you can revert to DropdownMenu if you prefer) */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Button variant={sortUnitsBy === "price-low" ? "default" : "outline"} onClick={() => setSortUnitsBy("price-low")}>الأقل → الأعلى</Button>
                <Button variant={sortUnitsBy === "price-high" ? "default" : "outline"} onClick={() => setSortUnitsBy("price-high")}>الأعلى → الأقل</Button>
                <Button variant={sortUnitsBy === "size" ? "default" : "outline"} onClick={() => setSortUnitsBy("size")}>المساحة</Button>
              </div>

              <div className="grid gap-6">
                {sortedUnits.map((unit) => (
                  <UnitCardItem key={unit.id} unit={unit} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>خدمات المشروع</CardTitle>
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

export default ProjectDetails;
