import khuzam from "@/assets/kuzam.png";
import sadan from "@/assets/sadan.png";
import alfursan from "@/assets/Alfursan.png";
import rasen from "@/assets/rasen.png";
import rasenn from "@/assets/rasenn.png";
import rasennn from "@/assets/rasennn.png";
import saraya from "@/assets/saraya.png";
import sarayaa from "@/assets/sarayaa.png";
import sarayaaa from "@/assets/sarayaaa.png";
import narjes from "@/assets/narjes.png";
import narjess from "@/assets/narjess.png";
import narjesss from "@/assets/narjesss.png";
import eshrag from "@/assets/eshrag.png";
import abaya from "@/assets/abaya.png";
import abayaa from "@/assets/abayaa.png";
import abayaaa from "@/assets/abayaaa.png";
import atele from "@/assets/atele.png";
import atelee from "@/assets/atelee.png";
import hayts from "@/assets/hayts.png";
import haytss from "@/assets/haytss.png";
import isadan from "@/assets/isadan.png";
import isadann from "@/assets/isadann.png";
import isadannn from "@/assets/isadannn.png";
import rehab from "@/assets/rehab.png";
import rehabb from "@/assets/rehabb.png";
import rehabbb from "@/assets/rehabbb.png";










export interface UnitType {
  id: string;
  image: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: number;
  images:string[];
  features: string[];
  brochureLink:string; 
  link?: string; // رابط خارجي
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
    title: "ضاحية خزام",
    location:
      "تقع شمال مدينة الرياض وبالقرب من مطار الملك خالد الدولي وجامعة الأميرة نورة بنت عبد الرحمن",
    description:
      "واجهة مبتكرة بتفاصيلها، تصنع مشهدًا عمرانيًا يعكس قيم الاستدامة ويمنح السكان جودة حياة تنبض بالمعاصرة، وتبتكر أسلوبًا مميزًا للعيش مع إطلالة خارجية تساهم في خلق فضاءات رحبة وتعزز الاستدامة الاجتماعية، مما يحقق جودة الحياة بأسلوب معاصر.",
    image: khuzam,
    type: "Apartments",
    startingPrice: 450000,
    developer: "Premium Developments Ltd.",
    completionDate: "Q4 2024",
    amenities: [
      " حدائق ومساحات مفتوحة",
      " مراكز الصحية",
      "المراكز الأمنية",
      "مدارس",
      "مساجد",
      "مرافق تجارية",
    ],
    units: [
      {
        id: "1-1",
        name: "سرايا الجوان",
        bedrooms: 0,
        image: khuzam,
        bathrooms: 1,
          images: [sarayaaa, sarayaa, saraya],
        area: 450,
        price: 1300000,
        features: ["مخطط مفتوح", "شرفة", "مطبخ عصري", "نظام المنزل الذكي"],
        link: "https://sakani.sa/app/offplan-projects/1012",
               brochureLink:"https://ruh-s3.bluvalt.com/api-nhc.sa/s3fs-public/2024-11/12.11%20Rejan%20-%20Brochure-2-compressed.pdf",

        
      },
      {
        id: "1-2",
        name: "النرجس فيو",
        bedrooms: 1,
        image: khuzam,
        bathrooms: 1,
                  images: [narjes, narjess, narjesss],
        area: 650,
        price: 1500000,
        features:["غرفة نوم مستقلة", "شرفة", "خزانة ملابس واسعة", "تشطيبات فاخرة"],
        link: "https://nhc.sa/real-estate-development/projects/324/",
               brochureLink:"https://ruh-s3.bluvalt.com/api-nhc.sa/s3fs-public/2021-08/%D8%A8%D8%B1%D8%B4%D9%88%D8%B1%20-%20%D8%A7%D9%84%D9%86%D8%B1%D8%AC%D8%B3%20%D9%81%D9%8A%D9%88.pdf",

      },
      {
        id: "1-3",
        name: "إشراق ليفينج",
        bedrooms: 2,
        image: khuzam,
        bathrooms: 2,
                  images: [eshrag, eshrag, eshrag],

        area: 850,
        price: 2000000,
        features: ["جناح رئيسي", "غرفة نوم للضيوف", "شرفتان", "غرفة تخزين"],
        link: "https://shrakat.housing.sa/ar/partners/212/533",
                       brochureLink:"https://ruh-s3.bluvalt.com/api-nhc.sa/s3fs-public/2021-08/%D8%A8%D8%B1%D9%88%D8%B4%D9%88%D8%B1%20%D8%A5%D8%B4%D8%B1%D8%A7%D9%82%20%D9%84%D9%8A%D9%81%D9%8A%D9%86%D8%AC.pdf",

      },
      {
        id: "1-4",
        name: "رسين ريجان هيلز",
        bedrooms: 3,
        image: khuzam,
        bathrooms: 3,
                  images: [rasen, rasenn, rasennn],

        area: 1200,
        price: 1200000,
        features: ["تراس خاص", "إطلالات بانورامية", "مطبخ فاخر"],
        link: "https://sakani.sa/app/offplan-projects/1433",
                       brochureLink:"https://ruh-s3.bluvalt.com/api-nhc.sa/s3fs-public/2021-08/%D8%A8%D8%B1%D8%B4%D9%88%D8%B1%20-%20%D8%B3%D8%B1%D8%A7%D9%8A%D8%A7%20%D8%A7%D9%84%D8%AC%D9%88%D8%A7%D9%86.pdf",

      },
    ],
  },
  {
    id: "2",
    title: "ضاحية الفرسان",
    location:
      "تقع شمال شرق مدينة الرياض حيث تبعد عن ميدان الملك عبدالعزيز للفروسية بـ 6 كيلو متر،",
    description:
      "تتوزع 6 ملايين م² من المساحات الخضراء لتوفر نمط حياة متكامل يجمع بين السكن العصري والطبيعة، مع تعزيز الروابط الاجتماعية ضمن بيئة مستدامة تضمن الراحة وتدعم جودة الحياة.",
    image: alfursan,
    type: "Villas",
    startingPrice: 850000,
    developer: "Coastal Properties Group",
    completionDate: "Q2 2025",
    amenities: [
      " حدائق ومساحات مفتوحة",
      " مراكز الصحية",
      "المراكز الأمنية",
      "مدارس",
      "مساجد",
      "مرافق تجارية",
    ],
    units: [
      {
        id: "2-1",
        name: "عبيّة",
        bedrooms: 3,
        image: khuzam,
        bathrooms: 3,
                  images: [abaya, abayaa, abayaaa],

        area: 2200,
        price: 850000,
        features: ["حديقة خاصة", "كراج", "غرفة خادمة", "منطقة شواء"],
        link: "https://sakani.sa/app/offplan-projects/1421?csrt=2655069475825020309",
                       brochureLink:"https://ruh-s3.bluvalt.com/api-nhc.sa/s3fs-public/2025-02/2212248_NHC_Ebayya_Brochure_Digi_v1_AW_SB%20%281%29.pdf"
      },
      {
        id: "2-2",
        name: "عبيّة إيليت",
        bedrooms: 4,
        image: khuzam,
        bathrooms: 4,
                  images: [atele, atelee],

        area: 2800,
        price: 1150000,
        features: ["إطلالات بحرية", "مسبح خاص", "كراج مزدوج", "جناح ضيوف"],
        link: "https://sakani.sa/app/offplan-projects/1421?csrt=2655069475825020309",
                       brochureLink:"https://ruh-s3.bluvalt.com/api-nhc.sa/s3fs-public/2024-11/2212244_NHC_Al_Fursan_Brochure_Digi_v1_AW_SB.pdf"
      },
      {
        id: "2-3",
        name: "عبيّة هايتس",
        bedrooms: 5,
        image: khuzam,
        bathrooms: 5,
                  images: [hayts, haytss],

        area: 3500,
        price: 1500000,
        features: ["إطلالات بانورامية", "مسبح خاص", "صالة سينما منزلية"]
,
        link: "https://sakani.sa/app/offplan-projects/1421?csrt=2655069475825020309",
                       brochureLink:"https://ruh-s3.bluvalt.com/api-nhc.sa/s3fs-public/2024-11/2212244_NHC_Al_Fursan_Brochure_Digi_v1_AW_SB.pdf"
      },
    ],
  },
  {
    id: "3",
    title: "ضاحية السدن",
    location:
      " ملتقى شبكة من الطرق الرئيسية وهي طريق مكة - جدة، وطريق الحرمين السريع.",
    description:
      "يقدم السدن مسكنًا يتفهم احتياجاتك، ويوفر أساسيات الحياة لعائلتك، مع مميزات الترفيه والراحة بالقرب من مسكنك، يتميز السدن بموقعه الاستراتيجي جنوب مدينة جدة، مما يتيح الوصول السريع لكافة الوجهات الخارجية تعزيزاً لجودة الحياة ورفاهية السكن.",
    image: sadan,
    type: "Towers",
    startingPrice: 380000,
    developer: "Skyline Developments",
    completionDate: "Q1 2025",
    amenities: [
      " حدائق ومساحات مفتوحة",
      " مراكز الصحية",
      "المراكز الأمنية",
      "مدارس",
      "مساجد",
      "مرافق تجارية",
    ],
    units: [
      {
        id: "3-1",
        name: "مشروع السدن",
        bedrooms: 0,
        image: khuzam,
        bathrooms: 1,
                  images: [isadan, isadann, isadannn],

        area: 520,
        price: 380000,
        features:["نوافذ ممتدة من الأرض حتى السقف", "منزل ذكي", "شرفة", "تخزين"]
,
        link: "https://sakani.sa/app/offplan-projects/1416",
                       brochureLink:"https://ruh-s3.bluvalt.com/api-nhc.sa/s3fs-public/2024-11/Al%20Sadan%20Brochure11%20Digital.pdf"
      },
      {
        id: "3-2",
        name: "رحاب السدن",
        bedrooms: 1,
        image: khuzam,
        bathrooms: 1,
                  images: [rehab, rehabb, rehabbb],

        area: 720,
        price: 520000,
        features: ["إطلالات على المدينة", "خزانة ملابس واسعة", "مطبخ فاخر", "منطقة دراسة"],
        link: "https://sakani.sa/app/offplan-projects/1542",
                       brochureLink:"https://ruh-s3.bluvalt.com/api-nhc.sa/s3fs-public/2025-02/NHC_RIHAB-ALSADAN-BROCHURE.pdf"
      },
    ],
  },
];
