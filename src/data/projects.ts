import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export interface UnitType {
  id: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: number;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  type: string;
  startingPrice: number;
  units: UnitType[];
  amenities: string[];
  developer: string;
  completionDate: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Emerald Gardens Residences",
    location: "Downtown District",
    description: "Modern luxury apartments with panoramic city views, featuring contemporary design and premium amenities in the heart of the business district.",
    image: project1,
    type: "Apartments",
    startingPrice: 450000,
    developer: "Premium Developments Ltd.",
    completionDate: "Q4 2024",
    amenities: [
      "Swimming Pool",
      "Fitness Center", 
      "Rooftop Garden",
      "24/7 Security",
      "Underground Parking",
      "Business Center",
      "Children's Playground"
    ],
    units: [
      {
        id: "1-1",
        name: "Studio Apartment",
        bedrooms: 0,
        bathrooms: 1,
        area: 450,
        price: 450000,
        features: ["Open Plan", "Balcony", "Modern Kitchen", "Smart Home System"]
      },
      {
        id: "1-2", 
        name: "One Bedroom",
        bedrooms: 1,
        bathrooms: 1,
        area: 650,
        price: 580000,
        features: ["Separate Bedroom", "Balcony", "Walk-in Closet", "Premium Finishes"]
      },
      {
        id: "1-3",
        name: "Two Bedroom",
        bedrooms: 2,
        bathrooms: 2,
        area: 850,
        price: 750000,
        features: ["Master Suite", "Guest Bedroom", "Two Balconies", "Storage Room"]
      },
      {
        id: "1-4",
        name: "Penthouse",
        bedrooms: 3,
        bathrooms: 3,
        area: 1200,
        price: 1200000,
        features: ["Private Terrace", "Panoramic Views", "Premium Kitchen", "Wine Cellar"]
      }
    ]
  },
  {
    id: "2", 
    title: "Mediterranean Villas",
    location: "Coastal Heights",
    description: "Exclusive villa community with Mediterranean-inspired architecture, private gardens, and stunning sea views in a prestigious neighborhood.",
    image: project2,
    type: "Villas",
    startingPrice: 850000,
    developer: "Coastal Properties Group",
    completionDate: "Q2 2025",
    amenities: [
      "Private Beach Access",
      "Golf Course",
      "Spa & Wellness Center",
      "Marina",
      "Tennis Courts",
      "Kids Club",
      "Concierge Service"
    ],
    units: [
      {
        id: "2-1",
        name: "Garden Villa",
        bedrooms: 3,
        bathrooms: 3,
        area: 2200,
        price: 850000,
        features: ["Private Garden", "Garage", "Maid's Room", "BBQ Area"]
      },
      {
        id: "2-2",
        name: "Sea View Villa", 
        bedrooms: 4,
        bathrooms: 4,
        area: 2800,
        price: 1150000,
        features: ["Sea Views", "Private Pool", "Double Garage", "Guest Suite"]
      },
      {
        id: "2-3",
        name: "Premium Villa",
        bedrooms: 5,
        bathrooms: 5,
        area: 3500,
        price: 1500000,
        features: ["Panoramic Views", "Private Pool", "Home Theater", "Wine Cellar"]
      }
    ]
  },
  {
    id: "3",
    title: "Skyline Towers",
    location: "Business Bay",
    description: "Ultra-modern high-rise residential towers offering luxury living with world-class amenities and breathtaking city skyline views.",
    image: project3,
    type: "Towers",
    startingPrice: 380000,
    developer: "Skyline Developments",
    completionDate: "Q1 2025",
    amenities: [
      "Infinity Pool",
      "Sky Lounge",
      "Gym & Spa",
      "Valet Parking",
      "Retail Podium",
      "Business Lounge",
      "Observation Deck"
    ],
    units: [
      {
        id: "3-1",
        name: "Studio Plus",
        bedrooms: 0,
        bathrooms: 1,
        area: 520,
        price: 380000,
        features: ["Floor-to-ceiling Windows", "Smart Home", "Balcony", "Storage"]
      },
      {
        id: "3-2",
        name: "One Bedroom Deluxe",
        bedrooms: 1,
        bathrooms: 1,
        area: 720,
        price: 520000,
        features: ["City Views", "Walk-in Closet", "Premium Kitchen", "Study Area"]
      },
      {
        id: "3-3",
        name: "Two Bedroom Sky",
        bedrooms: 2,
        bathrooms: 2,
        area: 950,
        price: 720000,
        features: ["Corner Unit", "Wraparound Balcony", "Master Suite", "Maid's Room"]
      },
      {
        id: "3-4",
        name: "Sky Penthouse",
        bedrooms: 4,
        bathrooms: 4,
        area: 1800,
        price: 1800000,
        features: ["Private Elevator", "Rooftop Terrace", "Jacuzzi", "360° Views"]
      }
    ]
  }
];