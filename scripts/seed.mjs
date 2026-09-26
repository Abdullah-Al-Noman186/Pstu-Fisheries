import mongoose from "mongoose";

// ── Hardcoded URI — paste your exact MongoDB URI here ──
const MONGODB_URI = "mongodb+srv://PSTUFisheries:Af1FpjJZLLSswInd@cluster0.jxeswbl.mongodb.net/pstu_fisheries?retryWrites=true&w=majority&appName=Cluster0";

await mongoose.connect(MONGODB_URI);
console.log("✅ Connected to MongoDB");

// ── Schemas ───────────────────────────────────────────
const TeacherSchema = new mongoose.Schema({
  name: String, designation: String, department: String,
  email: String, bio: String, publications: Number,
  researchAreas: [String], isHOD: Boolean, order: Number,
  photo: String, phone: String, joinYear: Number,
  education: [{ degree: String, institution: String, year: Number }]
});

const AlumniSchema = new mongoose.Schema({
  name: String, batch: Number, department: String,
  currentPosition: String, organization: String,
  location: String, linkedin: String,
  testimonial: String, isFeatured: Boolean,
  photo: String, email: String, achievements: [String]
});

const NewsSchema = new mongoose.Schema({
  title: String, slug: String, content: String,
  excerpt: String, category: String,
  publishedAt: Date, isPublished: Boolean, author: String,
  image: String, department: String
});

const ResearchSchema = new mongoose.Schema({
  title: String, authors: [String], department: String,
  journal: String, year: Number, abstract: String,
  link: String, type: String
});

// ── Models ────────────────────────────────────────────
const Teacher  = mongoose.models.Teacher  || mongoose.model("Teacher",  TeacherSchema);
const Alumni   = mongoose.models.Alumni   || mongoose.model("Alumni",   AlumniSchema);
const News     = mongoose.models.News     || mongoose.model("News",     NewsSchema);
const Research = mongoose.models.Research || mongoose.model("Research", ResearchSchema);

// ── Clear old data ────────────────────────────────────
await Teacher.deleteMany({});
await Alumni.deleteMany({});
await News.deleteMany({});
await Research.deleteMany({});
console.log("🗑️  Cleared old data");

// ── TEACHERS ──────────────────────────────────────────
await Teacher.insertMany([
  {
    name: "Prof. Dr. Md. Abdul Karim",
    designation: "Professor & Dean",
    department: "AQC",
    email: "karim@pstu.ac.bd",
    bio: "Expert in shrimp aquaculture with 25 years of research experience in coastal Bangladesh.",
    publications: 45,
    researchAreas: ["Shrimp Culture", "Aquaculture Nutrition", "Coastal Aquaculture"],
    isHOD: true, order: 1,
    joinYear: 1999,
    education: [
      { degree: "PhD in Aquaculture", institution: "Ghent University, Belgium", year: 1998 },
      { degree: "MSc in Fisheries", institution: "Bangladesh Agricultural University", year: 1993 }
    ]
  },
  {
    name: "Prof. Dr. Fatema Begum",
    designation: "Professor",
    department: "AQC",
    email: "fatema@pstu.ac.bd",
    bio: "Specialist in fish breeding and genetics with extensive publication record.",
    publications: 32,
    researchAreas: ["Fish Breeding", "Genetics", "Selective Breeding"],
    isHOD: false, order: 2,
    joinYear: 2003,
    education: [
      { degree: "PhD in Fisheries Science", institution: "Tokyo University of Marine Science", year: 2002 }
    ]
  },
  {
    name: "Dr. Md. Rafiqul Islam",
    designation: "Associate Professor",
    department: "AQC",
    email: "rafiq@pstu.ac.bd",
    bio: "Research focus on pond aquaculture management and water quality.",
    publications: 18,
    researchAreas: ["Pond Management", "Water Quality", "Fish Nutrition"],
    isHOD: false, order: 3,
    joinYear: 2008,
    education: [
      { degree: "PhD in Aquaculture", institution: "NIFES Norway", year: 2007 }
    ]
  },
  {
    name: "Dr. Mst. Nasima Khatun",
    designation: "Assistant Professor",
    department: "AQC",
    email: "nasima@pstu.ac.bd",
    bio: "Specializes in hatchery management and larval rearing techniques.",
    publications: 10,
    researchAreas: ["Hatchery Management", "Larval Rearing", "Broodstock Management"],
    isHOD: false, order: 4,
    joinYear: 2015,
    education: [
      { degree: "PhD in Aquaculture", institution: "PSTU", year: 2014 }
    ]
  },
  {
    name: "Prof. Dr. Samsul Huda",
    designation: "Professor & HOD",
    department: "FBG",
    email: "samsul@pstu.ac.bd",
    bio: "Leading expert in fish population genetics and molecular biology.",
    publications: 38,
    researchAreas: ["Population Genetics", "Molecular Biology", "Fish Genomics"],
    isHOD: true, order: 1,
    joinYear: 2001,
    education: [
      { degree: "PhD in Genetics", institution: "University of Wales, UK", year: 2000 }
    ]
  },
  {
    name: "Dr. Nasrin Akter",
    designation: "Assistant Professor",
    department: "FBG",
    email: "nasrin@pstu.ac.bd",
    bio: "Specialist in fish biodiversity assessment and conservation genetics.",
    publications: 14,
    researchAreas: ["Biodiversity", "Conservation Genetics", "Taxonomy"],
    isHOD: false, order: 2,
    joinYear: 2012,
    education: [
      { degree: "PhD in Fisheries Biology", institution: "Rajshahi University", year: 2011 }
    ]
  },
  {
    name: "Dr. Md. Habibur Rahman",
    designation: "Associate Professor",
    department: "FBG",
    email: "habib@pstu.ac.bd",
    bio: "Research on fish cytogenetics and karyotype analysis.",
    publications: 20,
    researchAreas: ["Cytogenetics", "Karyotype Analysis", "Fish Biology"],
    isHOD: false, order: 3,
    joinYear: 2006,
    education: [
      { degree: "PhD in Fish Biology", institution: "University of Dhaka", year: 2005 }
    ]
  },
  {
    name: "Prof. Dr. Kamal Hossain",
    designation: "Professor & HOD",
    department: "FMN",
    email: "kamal@pstu.ac.bd",
    bio: "Expert in sustainable fisheries policy, co-management, and resource assessment.",
    publications: 41,
    researchAreas: ["Fisheries Policy", "Co-management", "Resource Assessment"],
    isHOD: true, order: 1,
    joinYear: 2000,
    education: [
      { degree: "PhD in Fisheries Management", institution: "University of Tromsø, Norway", year: 1999 }
    ]
  },
  {
    name: "Dr. Shahida Khanam",
    designation: "Associate Professor",
    department: "FMN",
    email: "shahida@pstu.ac.bd",
    bio: "Research on inland fisheries management and wetland conservation.",
    publications: 22,
    researchAreas: ["Inland Fisheries", "Wetland Conservation", "Fisher Livelihoods"],
    isHOD: false, order: 2,
    joinYear: 2007,
    education: [
      { degree: "PhD in Environmental Science", institution: "Jahangirnagar University", year: 2006 }
    ]
  },
  {
    name: "Dr. Md. Zakir Hossain",
    designation: "Assistant Professor",
    department: "FMN",
    email: "zakir@pstu.ac.bd",
    bio: "Specializes in fisheries economics and value chain analysis.",
    publications: 12,
    researchAreas: ["Fisheries Economics", "Value Chain", "Market Analysis"],
    isHOD: false, order: 3,
    joinYear: 2014,
    education: [
      { degree: "PhD in Agricultural Economics", institution: "Bangladesh Agricultural University", year: 2013 }
    ]
  },
  {
    name: "Prof. Dr. Anisur Rahman",
    designation: "Professor & HOD",
    department: "FST",
    email: "anis@pstu.ac.bd",
    bio: "Pioneer in fish processing technology and value-added fishery products.",
    publications: 36,
    researchAreas: ["Fish Processing", "Quality Control", "Value-Added Products"],
    isHOD: true, order: 1,
    joinYear: 2002,
    education: [
      { degree: "PhD in Food Science", institution: "University of Reading, UK", year: 2001 }
    ]
  },
  {
    name: "Dr. Mst. Rokeya Khatun",
    designation: "Assistant Professor",
    department: "FST",
    email: "rokeya@pstu.ac.bd",
    bio: "Research on traditional fish drying, preservation and food safety.",
    publications: 12,
    researchAreas: ["Post-harvest Technology", "Food Safety", "Fish Drying"],
    isHOD: false, order: 2,
    joinYear: 2013,
    education: [
      { degree: "PhD in Food Technology", institution: "PSTU", year: 2012 }
    ]
  },
  {
    name: "Dr. Md. Shahidul Islam",
    designation: "Associate Professor",
    department: "FST",
    email: "shahidul@pstu.ac.bd",
    bio: "Expert in fish smoking, canning, and packaging technologies.",
    publications: 17,
    researchAreas: ["Fish Smoking", "Canning Technology", "Packaging"],
    isHOD: false, order: 3,
    joinYear: 2009,
    education: [
      { degree: "PhD in Food Engineering", institution: "Chiang Mai University, Thailand", year: 2008 }
    ]
  },
  {
    name: "Prof. Dr. Md. Shafiqul Islam",
    designation: "Professor & HOD",
    department: "MFO",
    email: "shafiq@pstu.ac.bd",
    bio: "Expert in marine fish ecology, oceanography, and Bay of Bengal fisheries.",
    publications: 50,
    researchAreas: ["Marine Ecology", "Oceanography", "Bay of Bengal Fisheries"],
    isHOD: true, order: 1,
    joinYear: 1998,
    education: [
      { degree: "PhD in Marine Science", institution: "University of Southampton, UK", year: 1997 }
    ]
  },
  {
    name: "Dr. Tahmina Sultana",
    designation: "Associate Professor",
    department: "MFO",
    email: "tahmina@pstu.ac.bd",
    bio: "Research on coastal fisheries, mangrove ecosystems, and Sundarbans biodiversity.",
    publications: 20,
    researchAreas: ["Coastal Fisheries", "Mangrove Ecology", "Sundarbans"],
    isHOD: false, order: 2,
    joinYear: 2006,
    education: [
      { degree: "PhD in Marine Biology", institution: "University of Chittagong", year: 2005 }
    ]
  },
  {
    name: "Dr. Md. Enamul Haque",
    designation: "Assistant Professor",
    department: "MFO",
    email: "enamul@pstu.ac.bd",
    bio: "Specialist in deep-sea fisheries and marine biodiversity surveys.",
    publications: 11,
    researchAreas: ["Deep-sea Fisheries", "Marine Biodiversity", "Trawl Surveys"],
    isHOD: false, order: 3,
    joinYear: 2016,
    education: [
      { degree: "PhD in Oceanography", institution: "CUET", year: 2015 }
    ]
  }
]);
console.log("✅ Teachers seeded (16 records)");

// ── ALUMNI ────────────────────────────────────────────
await Alumni.insertMany([
  {
    name: "Dr. Abul Bashar",
    batch: 2005, department: "AQC",
    currentPosition: "Senior Scientist",
    organization: "Bangladesh Fisheries Research Institute (BFRI)",
    location: "Mymensingh, Bangladesh",
    linkedin: "#",
    testimonial: "PSTU gave me the foundation to become a leading researcher in aquaculture. The hands-on training was invaluable.",
    isFeatured: true,
    achievements: ["Best Researcher Award 2018", "FAO Consultant 2020", "30+ publications"]
  },
  {
    name: "Md. Jahidul Islam",
    batch: 2008, department: "FBG",
    currentPosition: "Senior Fisheries Officer",
    organization: "Department of Fisheries, Bangladesh",
    location: "Dhaka, Bangladesh",
    linkedin: "#",
    testimonial: "The genetics program at PSTU opened doors I never imagined possible.",
    isFeatured: true,
    achievements: ["Government Gold Medal 2015", "District Best Officer 2019"]
  },
  {
    name: "Dr. Farida Yeasmin",
    batch: 2006, department: "FMN",
    currentPosition: "Senior Research Fellow",
    organization: "WorldFish Center",
    location: "Penang, Malaysia",
    linkedin: "#",
    testimonial: "PSTU's fisheries management program prepared me for an international career I dreamed of.",
    isFeatured: true,
    achievements: ["WorldFish Young Researcher Award 2016", "CGIAR Fellowship 2014"]
  },
  {
    name: "Md. Rafiul Karim",
    batch: 2010, department: "FST",
    currentPosition: "Quality Control Manager",
    organization: "PRAN-RFL Group (Seafood Division)",
    location: "Dhaka, Bangladesh",
    linkedin: "#",
    testimonial: "The technology and processing training I received at PSTU was world-class and directly industry-relevant.",
    isFeatured: true,
    achievements: ["ISO 22000 Lead Auditor Certified", "HACCP Specialist"]
  },
  {
    name: "Shakila Begum",
    batch: 2012, department: "MFO",
    currentPosition: "Marine Biologist",
    organization: "BOBLME Project, FAO",
    location: "Bangkok, Thailand",
    linkedin: "#",
    testimonial: "Marine fisheries at PSTU gave me the scientific grounding to work with the FAO on regional ocean governance.",
    isFeatured: true,
    achievements: ["FAO Regional Award 2021", "Published in Nature Sustainability"]
  },
  {
    name: "Kazi Mahmudul Hasan",
    batch: 2009, department: "AQC",
    currentPosition: "Managing Director",
    organization: "Blue Gold Aquaculture Ltd.",
    location: "Khulna, Bangladesh",
    linkedin: "#",
    testimonial: "PSTU inspired me to build my own aquaculture enterprise employing 200+ people.",
    isFeatured: true,
    achievements: ["National Entrepreneur Award 2022", "Best Exporter SME 2023"]
  },
  {
    name: "Taslima Akter",
    batch: 2014, department: "FBG",
    currentPosition: "PhD Researcher",
    organization: "University of Tokyo, Japan",
    location: "Tokyo, Japan",
    linkedin: "#",
    testimonial: "",
    isFeatured: false,
    achievements: ["MEXT Japan Scholarship 2018"]
  },
  {
    name: "Md. Saiful Islam",
    batch: 2015, department: "FMN",
    currentPosition: "Program Officer",
    organization: "CARE Bangladesh",
    location: "Cox's Bazar, Bangladesh",
    linkedin: "#",
    testimonial: "",
    isFeatured: false,
    achievements: []
  },
  {
    name: "Nusrat Jahan",
    batch: 2013, department: "FST",
    currentPosition: "Food Safety Inspector",
    organization: "Bangladesh Standards and Testing Institution (BSTI)",
    location: "Dhaka, Bangladesh",
    linkedin: "#",
    testimonial: "",
    isFeatured: false,
    achievements: []
  },
  {
    name: "Md. Kamrul Hasan",
    batch: 2011, department: "MFO",
    currentPosition: "Coast Guard Officer",
    organization: "Bangladesh Coast Guard",
    location: "Chittagong, Bangladesh",
    linkedin: "#",
    testimonial: "",
    isFeatured: false,
    achievements: []
  }
]);
console.log("✅ Alumni seeded (10 records)");

// ── NEWS ──────────────────────────────────────────────
await News.insertMany([
  {
    title: "Faculty of Fisheries Hosts International Aquaculture Conference 2024",
    slug: "aquaculture-conference-2024",
    excerpt: "Leading aquaculture researchers from 15 countries gathered at PSTU for a landmark three-day international conference on sustainable fish farming.",
    content: `The Faculty of Fisheries at Patuakhali Science and Technology University successfully hosted the International Aquaculture Conference 2024. Researchers and practitioners from 15 countries participated in this landmark event, sharing findings on sustainable aquaculture, genetic improvement of fish species, and climate-resilient fisheries management.

The conference featured keynote speeches from Dr. Rowan Smith of FAO, Prof. Li Wei from Ocean University of China, and our own Dean Prof. Dr. Md. Abdul Karim. Over 60 research papers were presented across five thematic sessions.

The event concluded with the signing of a Memorandum of Understanding between PSTU and three international institutions for collaborative research.`,
    category: "event",
    publishedAt: new Date("2024-11-15"),
    isPublished: true,
    author: "Faculty Office"
  },
  {
    title: "PSTU Fisheries Graduate Wins National Innovation Award 2024",
    slug: "national-innovation-award-2024",
    excerpt: "Mr. Arif Hossain from the 2018 batch of Aquaculture has been awarded the National Young Innovator Award for his IoT-based automated fish feeding system.",
    content: `We are proud to announce that Mr. Arif Hossain, a 2018 graduate of the Department of Aquaculture, has been awarded the prestigious National Young Innovator Award by the Ministry of Science and Technology, Bangladesh.

Mr. Hossain developed an IoT-based automated fish feeding and water quality monitoring system that has been adopted by over 200 fish farms in the southern coastal districts. The system reduces feed waste by 35% and improves fish growth rates by 20%.

"My teachers at PSTU always encouraged us to solve real problems," said Mr. Hossain at the award ceremony in Dhaka. "This innovation is dedicated to the small-scale fish farmers of Bangladesh."`,
    category: "achievement",
    publishedAt: new Date("2024-10-22"),
    isPublished: true,
    author: "Faculty Office"
  },
  {
    title: "New Research Grant: Climate-Resilient Fisheries Project Launched",
    slug: "climate-resilient-fisheries-project-2024",
    excerpt: "The Faculty has secured a BDT 2 crore research grant from the World Bank to study climate change impacts on coastal fisheries of Bangladesh.",
    content: `The Faculty of Fisheries has been awarded a major research grant of BDT 2 crore from the World Bank's BARC-administered competitive research fund.

The three-year project titled "Climate Resilience in Coastal Fisheries of Southern Bangladesh" will be led by Prof. Dr. Md. Shafiqul Islam of the Marine Fisheries and Oceanography Department.

The project will study how rising sea temperatures, increased salinity, and extreme weather events are affecting fish populations in the Bay of Bengal and develop adaptation strategies for fishing communities in Patuakhali, Barguna, and Bhola districts.`,
    category: "news",
    publishedAt: new Date("2024-09-10"),
    isPublished: true,
    author: "Research Office"
  },
  {
    title: "Admission Notice: MSc Fisheries Science Program 2024-25",
    slug: "msc-admission-notice-2024-25",
    excerpt: "Applications are open for the MSc in Fisheries Science program. Deadline: 30 November 2024. 40 seats available across all departments.",
    content: `The Faculty of Fisheries, PSTU, invites applications for the Master of Science (MSc) in Fisheries Science program for the academic session 2024-25.

Eligibility: BSc in Fisheries or related field with minimum CGPA 2.5 out of 4.0.

Available seats: 40 (distributed across all five departments)

Application deadline: 30 November 2024
Admission test date: 15 December 2024
Result publication: 22 December 2024

For application forms and further details, contact the Faculty Office or visit the university website. Application fee: BDT 500.`,
    category: "notice",
    publishedAt: new Date("2024-10-01"),
    isPublished: true,
    author: "Faculty Office"
  },
  {
    title: "Study Tour: Students Visit Cox's Bazar and Saint Martin's Island",
    slug: "study-tour-coxs-bazar-2024",
    excerpt: "45 students from MFO and FMN departments completed a successful week-long field study tour to Cox's Bazar and Saint Martin's Island.",
    content: `The Department of Marine Fisheries and Oceanography organized a highly successful week-long study tour to Cox's Bazar and Saint Martin's Island for 45 students.

Students had the opportunity to observe commercial trawler operations at Fishery Ghat, visit the Marine Fisheries Academy, study coral reef ecosystems at Saint Martin's Island, and interact with local fishing communities about traditional and modern fishing practices.

The tour was led by Dr. Tahmina Sultana and Dr. Md. Enamul Haque. Students collected water and sediment samples for their ongoing research projects.`,
    category: "event",
    publishedAt: new Date("2024-08-20"),
    isPublished: true,
    author: "MFO Department"
  },
  {
    title: "Research Published in Nature Aquaculture — A Historic Achievement",
    slug: "nature-aquaculture-publication-2024",
    excerpt: "Prof. Dr. Fatema Begum's paper on selective breeding in Rohu carp has been accepted in Nature Aquaculture, a world-leading journal.",
    content: `We are delighted to announce that a groundbreaking research paper by Prof. Dr. Fatema Begum, titled "Selective Breeding for Fast Growth in Rohu Carp (Labeo rohita) Under Tropical Pond Conditions", has been accepted for publication in Nature Aquaculture.

Nature Aquaculture is one of the world's most prestigious fisheries science journals with an impact factor of 17.4.

The paper presents 10 years of selective breeding data showing a 28% improvement in growth rate over five generations, with potential to significantly increase aquaculture productivity across South and Southeast Asia.

This is the first publication from PSTU in a Nature family journal — a historic milestone for our faculty.`,
    category: "achievement",
    publishedAt: new Date("2024-07-05"),
    isPublished: true,
    author: "FBG Department"
  }
]);
console.log("✅ News seeded (6 records)");

// ── RESEARCH ──────────────────────────────────────────
await Research.insertMany([
  {
    title: "Selective Breeding for Fast Growth in Rohu Carp Under Tropical Pond Conditions",
    authors: ["Fatema Begum", "Samsul Huda", "K. Mahfuzul Haque"],
    department: "FBG",
    journal: "Nature Aquaculture",
    year: 2024,
    abstract: "Ten-year selective breeding study demonstrating 28% growth improvement in Rohu carp over five generations under tropical pond conditions in Bangladesh.",
    type: "journal"
  },
  {
    title: "Climate Change Impacts on Hilsa Fisheries in the Bay of Bengal: A 30-Year Analysis",
    authors: ["Md. Shafiqul Islam", "Tahmina Sultana", "R. Ahmed", "M. Karim"],
    department: "MFO",
    journal: "Fisheries Research",
    year: 2023,
    abstract: "Analysis of 30-year catch data showing significant shifts in Hilsa migration patterns linked to sea surface temperature changes and salinity intrusion.",
    type: "journal"
  },
  {
    title: "IoT-Based Real-Time Water Quality Monitoring for Shrimp Aquaculture in Coastal Bangladesh",
    authors: ["Md. Abdul Karim", "Md. Rafiqul Islam", "S. Hossain"],
    department: "AQC",
    journal: "Aquacultural Engineering",
    year: 2023,
    abstract: "Development and field testing of a low-cost IoT sensor network for real-time dissolved oxygen, pH, temperature, and salinity monitoring in shrimp ponds.",
    type: "journal"
  },
  {
    title: "Post-Harvest Losses in Artisanal Fisheries of Coastal Bangladesh: A Quantitative Assessment",
    authors: ["Anisur Rahman", "Mst. Rokeya Khatun", "F. Khanam"],
    department: "FST",
    journal: "Food Policy",
    year: 2022,
    abstract: "Quantitative assessment of post-harvest fish losses across 120 landing stations in coastal Bangladesh, identifying key intervention points.",
    type: "journal"
  },
  {
    title: "Community-Based Fisheries Co-Management in Haor Wetlands of Bangladesh",
    authors: ["Kamal Hossain", "Shahida Khanam", "M. Ali"],
    department: "FMN",
    journal: "Ocean & Coastal Management",
    year: 2022,
    abstract: "Evaluation of community-based co-management approaches for inland fisheries sustainability in the Haor basin, covering 45 water bodies.",
    type: "journal"
  },
  {
    title: "Genetic Diversity of Gangetic Dolphin Populations in Bangladesh Rivers Using Microsatellite Markers",
    authors: ["Samsul Huda", "Nasrin Akter"],
    department: "FBG",
    journal: "Aquatic Conservation: Marine and Freshwater Ecosystems",
    year: 2021,
    abstract: "Molecular genetic analysis revealing critically low diversity in Gangetic dolphin populations with implications for conservation planning.",
    type: "journal"
  },
  {
    title: "Nutritional Composition and Quality Assessment of Dried Fish Products from Southern Bangladesh",
    authors: ["Anisur Rahman", "Md. Shahidul Islam"],
    department: "FST",
    journal: "Journal of Food Composition and Analysis",
    year: 2021,
    abstract: "Comprehensive nutritional profiling of 15 traditional dried fish products from Patuakhali, Barguna and Cox's Bazar markets.",
    type: "journal"
  },
  {
    title: "Mangrove Ecosystem Services and Fisheries Productivity in the Sundarbans: A Valuation Study",
    authors: ["Tahmina Sultana", "Md. Shafiqul Islam"],
    department: "MFO",
    journal: "Ecosystem Services",
    year: 2020,
    abstract: "Economic valuation of mangrove-dependent fisheries in the Sundarbans, estimating annual provisioning services at USD 340 million.",
    type: "journal"
  }
]);
console.log("✅ Research seeded (8 records)");

await mongoose.disconnect();
console.log("\n🎉 All seeding complete! Your database is ready.");
console.log("   Visit http://localhost:3001 to see your data.");