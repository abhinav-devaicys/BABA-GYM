export interface EquipmentItem {
  id: string;
  t: string;
  d: string;
  img: string;
  alt: string;
}

export interface TrainerItem {
  id: string;
  t: string;
  d: string;
  c: string;
  img: string;
  alt: string;
}

export interface PlanItem {
  id: string;
  t: string;
  p: string;
  duration: string;
  description: string;
  hot?: boolean;
}

export interface ReviewItem {
  id: string;
  q: string;
  n: string;
  rating: number;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface SiteData {
  name: string;
  subName: string;
  headline: string;
  tagline: string;
  about: string;
  historyText: string;
  heroImg: string;
  aboutImg: string;
  mapEmbedUrl: string;
  stats: [string, string][];
  ticker: string[];
  equipment: EquipmentItem[];
  trainers: TrainerItem[];
  plans: PlanItem[];
  planFeatures: string[];
  reviews: ReviewItem[];
  faqs: FaqItem[];
  contact: {
    address: string;
    phone: string;
    whatsapp: string;
    timings: string;
    justdialRating: string;
    payments: string[];
    features: string[];
  };
  social: { name: string; url: string }[];
}

export const initialSiteData: SiteData = {
  name: "BABA GYM",
  subName: "THE MUSCLE DOPE",
  headline: "FORGE YOUR<br>ULTIMATE PHYSIQUE",
  tagline:
    "Gwalior's legendary hardcore training destination since 2006. Equipped with professional steel, heavy free weights, CrossFit facilities, and elite coaching.",
  about:
    "Founded in 2006, Baba Gym – The Muscle Dope has been the cornerstone of bodybuilding and strength training in Gwalior. Located right in front of JC Mills College in Birla Nagar, we provide a raw, high-energy environment for serious lifters, athletes, and fitness enthusiasts of all levels.",
  historyText:
    "Established over 18 years ago, Baba Gym started with a singular mission: to build a temple of iron where dedication meets results. From humble beginnings to Gwalior's most trusted fitness sanctuary with 157+ verified Justdial reviews and a 4.5/5 rating, our commitment to authentic strength and community remains unbreakable.",
  heroImg:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80",
  aboutImg:
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.892416!2d78.1825!3d26.2295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMlDCsDEzJzQ2LjIiTiA3OMKwMTAnNTcuMCJF!5e0!3m2!1sen!2sin!4v1630000000000!5m2!1sen!2sin",
  stats: [
    ["2006", "Established Year"],
    ["4.5★", "Justdial Rating (157+ Reviews)"],
    ["18+", "Years of Excellence"],
    ["100%", "Hardcore Results"],
  ],
  ticker: [
    "Strength Training",
    "Bodybuilding",
    "Cardio Zone",
    "Personal Training",
    "CrossFit Facilities",
    "Unisex Gym",
    "Birla Nagar, Gwalior",
  ],
  equipment: [
    {
      id: "eq-1",
      t: "Heavy Olympic Power Racks",
      d: "Commercial-grade steel power cages equipped with safety spotter arms and chin-up bars for squats and heavy presses.",
      img: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
      alt: "Olympic power rack with loaded barbell and weight plates",
    },
    {
      id: "eq-2",
      t: "Plate-Loaded Strength Machines",
      d: "Hammer Strength and iso-lateral machines designed for maximum muscle isolation and hypertrophic overload.",
      img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
      alt: "Plate loaded heavy leg press and strength machine",
    },
    {
      id: "eq-3",
      t: "Professional Dumbbells & Barbells",
      d: "Extensive rack of cast iron and urethane dumbbells ranging from 2.5kg to 50kg+ with Olympic EZ-curl bars.",
      img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
      alt: "Dumbbell rack in gym floor",
    },
    {
      id: "eq-4",
      t: "CrossFit & Functional Turf",
      d: "Dedicated functional training turf for sled pushes, battle ropes, agility ladders, and core conditioning.",
      img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
      alt: "Functional turf area with kettlebells and battle ropes",
    },
    {
      id: "eq-5",
      t: "Advanced Cardio Suite",
      d: "High-performance treadmills, upright stationary bikes, and elliptical trainers for fat burning and stamina.",
      img: "https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=800&q=80",
      alt: "Row of treadmill machines in gym cardio suite",
    },
    {
      id: "eq-6",
      t: "Dedicated Stretching & Core Area",
      d: "Comfortable mat zone with foam rollers, resistance bands, and stability balls for warm-ups and recovery.",
      img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
      alt: "Stretching and recovery area",
    },
  ],
  trainers: [
    {
      id: "tr-1",
      t: "Baba Coach (Head Trainer)",
      d: "Master Bodybuilding & Strength Coach",
      c: "18+ Yrs Experience • Contest Prep & Mass Building Specialist",
      img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80",
      alt: "Head strength coach portrait",
    },
    {
      id: "tr-2",
      t: "Vikram Singh",
      d: "Senior Functional & CrossFit Trainer",
      c: "Certified Fitness Coach • Agility & Fat Loss Expert",
      img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
      alt: "Senior fitness trainer portrait",
    },
    {
      id: "tr-3",
      t: "Rahul Sharma",
      d: "Hypertrophy & Personal Training Lead",
      c: "Sports Nutritionist • Transformation Specialist",
      img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80",
      alt: "Personal training specialist portrait",
    },
  ],
  plans: [
    {
      id: "pl-1",
      t: "Monthly Standard Pass",
      p: "Contact for Pricing",
      duration: "1 Month",
      description: "Full access to all gym equipment, weight training floor, and cardio machines during operating hours.",
    },
    {
      id: "pl-2",
      t: "Quarterly Pro Membership",
      p: "Contact for Pricing",
      duration: "3 Months",
      description: "Includes complete gym access, customized workout guidance, and diet consultation.",
      hot: true,
    },
    {
      id: "pl-3",
      t: "Annual Champion Pass",
      p: "Contact for Pricing",
      duration: "12 Months",
      description: "Best value for dedicated athletes. Full VIP access, priority locker availability, and personal training support.",
    },
    {
      id: "pl-4",
      t: "Personal Training Package",
      p: "Contact for Pricing",
      duration: "1-on-1 Coaching",
      description: "Dedicated personal coaching, customized meal plans, progressive overload tracking, and one-on-one supervision.",
    },
  ],
  planFeatures: [
    "Full Gym Access (Strength & Cardio)",
    "Expert Floor Trainers on Duty",
    "Clean Locker & Changing Rooms",
    "CrossFit & Functional Training Zones",
    "Flexible Timings (Morning & Evening Batches)",
  ],
  reviews: [
    {
      id: "rv-1",
      q: "Baba Gym is the absolute best gym in Birla Nagar! The atmosphere is super energetic and the equipment is top notch for heavy lifting.",
      n: "Amit Kushwah",
      rating: 5,
    },
    {
      id: "rv-2",
      q: "Been training here for over a year. The trainers are very knowledgeable and supportive. Great place for bodybuilding and fitness.",
      n: "Rohit Tomar",
      rating: 5,
    },
    {
      id: "rv-3",
      q: "Genuine hardcore gym with all modern machines and great crowd. Highly recommended for anyone serious about fitness in Gwalior.",
      n: "Pankaj Rathore",
      rating: 4.5,
    },
  ],
  faqs: [
    {
      q: "What are the gym operating hours?",
      a: "We are open Monday to Saturday in two convenient shifts: Morning 5:00 AM – 10:30 AM and Evening 4:00 PM – 10:00 PM. Sundays are closed.",
    },
    {
      q: "Do you offer personal training?",
      a: "Yes! We have experienced certified trainers providing 1-on-1 personal training, customized diet plans, and bodybuilding guidance.",
    },
    {
      q: "Is Baba Gym suitable for beginners?",
      a: "Absolutely. Whether you are a complete beginner or an advanced powerlifter, our floor trainers guide you through proper form and customized workout routines.",
    },
    {
      q: "What payment methods are accepted?",
      a: "We accept UPI (PhonePe, Google Pay, Paytm), cash, and direct bank transfers for your convenience.",
    },
    {
      q: "Where is Baba Gym located?",
      a: "We are located at House No. 25, Lane No. 3, in front of JC Mills College, Birla Nagar, Gwalior, MP 474004.",
    },
  ],
  contact: {
    address: "House No. 25, Lane No. 3, in front of JC Mills College, Birla Nagar, Gwalior, MP 474004",
    phone: "+91 95890 01117",
    whatsapp: "+919589001117",
    timings: "Mon–Sat: 5:00–10:30 AM & 4:00–10:00 PM (Sun Closed)",
    justdialRating: "4.5 / 5.0 (157+ Justdial Reviews)",
    payments: ["UPI", "PhonePe", "Google Pay", "Cash"],
    features: ["Unisex Gym", "Wheelchair Accessible", "Airy & Ventilated Floor", "Expert Trainers"],
  },
  social: [
    { name: "Justdial", url: "https://www.justdial.com" },
    { name: "Instagram", url: "https://instagram.com" },
    { name: "Facebook", url: "https://facebook.com" },
  ],
};
