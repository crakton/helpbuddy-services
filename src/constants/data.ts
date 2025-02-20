import { IAfrunaPartner } from "@/interfaces/data.interface";
import { imgs } from "./images";

export const afrunaPartner: IAfrunaPartner[] = [
  {
    _id: "12",
    img: imgs.traveloka,
  },
  {
    _id: "2",
    img: imgs.tiket,
  },
  {
    _id: "1",
    img: imgs.airbnb,
  },
  {
    _id: "3",
    img: imgs.tripadvisor,
  },
];

export const feautureCategories = [
  {
    text: "construction",
    img: imgs.constCategory,
  },
  {
    text: "educaion",
    img: imgs.eduCategory,
  },
  {
    text: "technology",
    img: imgs.tecnCategory,
  },
  {
    text: "personal",
    img: imgs.percategory,
  },
  {
    text: "event",
    img: imgs.eventCategory,
  },
  {
    text: "professional",
    img: imgs.profCategory,
  },
  {
    text: "real estate",
    img: imgs.estateCategory,
  },
  {
    text: "transportation",
    img: imgs.transpCategory,
  },
  {
    text: "Community and Non-Profit Services",
    img: imgs.tecnCategory,
  },
  {
    text: "Business Services",
    img: imgs.percategory,
  },
  {
    text: "Automotive",
    img: imgs.eventCategory,
  },
  {
    text: "Pet",
    img: imgs.profCategory,
  },
  {
    text: "Art and Creative Services",
    img: imgs.estateCategory,
  },
  {
    text: "Entertainment Services",
    img: imgs.transpCategory,
  },
  {
    text: "Healthcare Services",
    img: imgs.tecnCategory,
  },
  {
    text: "Senior Care Sevices",
    img: imgs.percategory,
  },
  {
    text: "Sport and Recreation services",
    img: imgs.eventCategory,
  },
  {
    text: "Repair amd Maintenances services",
    img: imgs.profCategory,
  },
  {
    text: "real estate",
    img: imgs.estateCategory,
  },

];

export const userMethods = [
  {
    title: "Desired Service",
    text: "Collatra auto-generates inventory reports, stores and emails to relevant partners",
  },
  {
    title: "Location",
    text: "Collatra auto-generates inventory reports, stores and emails to relevant partners",
  },
  {
    title: "What Next",
    text: "Collatra auto-generates inventory reports, stores and emails to relevant partners",
  },
];


export const providerMethods = [
  {
    title: "Create an Account",
    text: "Collatra auto-generates inventory reports, stores and emails to relevant partners",
  },
  {
    title: "Settup Accounts",
    text: "Collatra auto-generates inventory reports, stores and emails to relevant partners",
  },
  {
    title: "Post Your services",
    text: "Collatra auto-generates inventory reports, stores and emails to relevant partners",
  },
];

export const services = [
  {
    $id: "srv1",
    name: "Photography & Video Editing",
    category: "Event",
    description: "Professional photography and video editing services for weddings, birthdays, and corporate events.",
    price: 4200,
    location: "Kaduna",
    rating: 4.7,
    imageUrl: imgs.disSer1,
    providerId: "prv1",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "srv2",
    name: "Building Plan & Drawing",
    category: "Construction",
    description: "Architectural design, building planning, and structural drawings.",
    price: 4200,
    location: "Kaduna",
    rating: 5.0,
    imageUrl: imgs.disSer2,
    providerId: "prv5",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "srv3",
    name: "Babysitting & Nanny Services",
    category: "Childcare",
    description: "Experienced babysitters and professional nanny services.",
    price: 10000,
    location: "Area 11, Garki Abuja",
    rating: 4.0,
    imageUrl: imgs.disSer3,
    providerId: "prv6",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "srv4",
    name: "Plumbing & Pipe Installation",
    category: "Plumber",
    description: "General plumbing services, leak repair, and pipe installation.",
    price: 8000,
    location: "Abuja",
    rating: 4.2,
    imageUrl: imgs.disSer3,
    providerId: "prv5",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "srv5",
    name: "House Cleaning",
    category: "Cleaner",
    description: "Comprehensive cleaning services for homes, offices, and event spaces.",
    price: 3500,
    location: "Kaduna",
    rating: 4.5,
    imageUrl: imgs.disSer3,
    providerId: "prv2",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "srv6",
    name: "Solar Panel Installation",
    category: "Solar Installer",
    description: "Professional installation of solar panels for residential and commercial buildings.",
    price: 50000,
    location: "Kaduna",
    rating: 4.8,
    imageUrl: imgs.disSer3,
    providerId: "prv3",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "srv7",
    name: "Hair Styling & Braiding",
    category: "Hair Stylist",
    description: "Expert hairstyling, braiding, and hair treatment services.",
    price: 6000,
    location: "Kano",
    rating: 4.9,
    imageUrl: imgs.disSer3,
    providerId: "prv8",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "srv8",
    name: "Fashion Designing & Tailoring",
    category: "Fashion Designer",
    description: "Custom clothing design, tailoring, and alterations.",
    price: 15000,
    location: "Enugu",
    rating: 4.6,
    imageUrl: imgs.disSer3,
    providerId: "prv12",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "srv9",
    name: "Wall Painting & Interior Design",
    category: "Painter",
    description: "Professional house painting and interior design services.",
    price: 10000,
    location: "Port Harcourt",
    rating: 3.8,
    imageUrl: imgs.disSer3,
    providerId: "prv7",
    createdAt: new Date().toISOString(),
  },
];
export const providers = [
  {
    $id: "prv1",
    name: "Smart Jamal",
    serviceCategory: "Electrician",
    rating: 1.0,
    imageUrl: imgs.provider1,
    location: "Kaduna",
    contact: "+2348000000001",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "prv2",
    name: "Yamaha Jamal",
    serviceCategory: "Cleaner",
    rating: 1.5,
    imageUrl: imgs.provider2,
    location: "Kaduna",
    contact: "+2348000000002",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "prv3",
    name: "Smart Jamal",
    serviceCategory: "Solar Installer",
    rating: 2.0,
    imageUrl: imgs.provider3,
    location: "Kaduna",
    contact: "+2348000000003",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "prv4",
    name: "Yamaha Jamal",
    serviceCategory: "Cleaner",
    rating: 2.5,
    imageUrl: imgs.seller1,
    location: "Kaduna",
    contact: "+2348000000004",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "prv5",
    name: "John Doe",
    serviceCategory: "Plumber",
    rating: 4.0,
    imageUrl: imgs.provider2,
    location: "Abuja",
    contact: "+2348000000005",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "prv6",
    name: "Amina Bello",
    serviceCategory: "Catering",
    rating: 4.5,
    imageUrl: imgs.provider2,
    location: "Lagos",
    contact: "+2348000000006",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "prv7",
    name: "Samuel Eze",
    serviceCategory: "Painter",
    rating: 3.8,
    imageUrl: imgs.provider2,
    location: "Port Harcourt",
    contact: "+2348000000007",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "prv8",
    name: "Fatima Musa",
    serviceCategory: "Hair Stylist",
    rating: 4.9,
    imageUrl: imgs.provider2,
    location: "Kano",
    contact: "+2348000000008",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "prv9",
    name: "Michael Chinedu",
    serviceCategory: "Carpenter",
    rating: 3.5,
    imageUrl: imgs.provider2,
    location: "Ibadan",
    contact: "+2348000000009",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "prv10",
    name: "Grace Ojo",
    serviceCategory: "Makeup Artist",
    rating: 4.7,
    imageUrl: imgs.provider2,
    location: "Jos",
    contact: "+2348000000010",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "prv11",
    name: "David Ibrahim",
    serviceCategory: "Mechanic",
    rating: 3.9,
    imageUrl: imgs.provider3,
    location: "Kaduna",
    contact: "+2348000000011",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "prv12",
    name: "Esther Okonkwo",
    serviceCategory: "Fashion Designer",
    rating: 4.6,
    imageUrl: imgs.provider3,
    location: "Enugu",
    contact: "+2348000000012",
    createdAt: new Date().toISOString(),
  },
];

export const testimonialData = [
  {
    img: imgs.testi3,
    name: "Ralph Edwards",
    statement:
      "Odio rhoncus ornare ut quam. Molestie vel duis quis scelerisque ut id. In tortor turpis viverra sagittis ultrices nisi, nec tortor. Vestibulum, ultrices ultricies neque, hac ultricies dolor",
    services: "Math Teacher",
  },
  {
    img: imgs.testi1,
    name: "Alice Smith",
    statement:
      "Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet. Tellus mi volutpat tellus, congue malesuada sit nisl donec a",
    services: "Manager",
  },
  {
    img: imgs.provider3,
    name: "John Joy",
    statement:
      "Odio rhoncus ornare ut quam. Molestie vel duis quis scelerisque ut id. In tortor turpis viverra sagittis ultrices nisi, nec tortor. Vestibulum, ultrices ultricies neque, hac ultricies dolor",
    services: "Psychology Student",
  },
  {
    img: imgs.testi2,
    name: "Alice idris",
    statement:
      "Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet. Tellus mi volutpat tellus, congue malesuada sit nisl donec a",
    services: "Frontend Dev",
  },
  {
    img: imgs.provider1,
    name: "Ayuba Alanin",
    statement:
      "Odio rhoncus ornare ut quam. Molestie vel duis quis scelerisque ut id. In tortor turpis viverra sagittis ultrices nisi, nec tortor. Vestibulum, ultrices ultricies neque, hac ultricies dolor",
    services: "Psychologist",
  },
  {
    img: imgs.testi3,
    name: "Olaide idris",
    statement:
      "Sapien, sollicitudin et vitae id et laoreet sapien consectetur. Felis egestas egestas amet aliquam sit euismod. Pellentesque neque, sed ut volutpat. Ullamcorper in at nulla dignissim",
    services: "Manager",
  },
  {
    img: imgs.provider3,
    name: "Akande Abiodun",
    statement:
      "Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet. Tellus mi volutpat tellus, congue malesuada sit nisl donec a",
    services: "Lawyer",
  },
  {
    img: imgs.testi2,
    name: "Azeezat Smith",
    statement:
      "Sapien, sollicitudin et vitae id et laoreet sapien consectetur. Felis egestas egestas amet aliquam sit euismod. Pellentesque neque, sed ut volutpat. Ullamcorper in at nulla dignissim",
    services: "Backend Dev",
  },
  {
    img: imgs.testi3,
    name: "John sofiyah",
    statement:
      "Odio rhoncus ornare ut quam. Molestie vel duis quis scelerisque ut id. In tortor turpis viverra sagittis ultrices nisi, nec tortor. Vestibulum, ultrices ultricies neque, hac ultricies dolor",
    services: "Accountant",
  },
  {
    img: imgs.testi1,
    name: "Idris Olaide",
    statement:
      "Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet. Tellus mi volutpat tellus, congue malesuada sit nisl donec a",
    services: "Doctor",
  },
  {
    img: imgs.provider3,
    name: "Adewale Usman",
    statement:
      "Sapien, Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet. Tellus mi volutpat tellus, congue malesuada sit nisl donec a.id et laoreet sapien consectetur. Felis egestas egestas amet aliquam sit euismod. Pellentesque neque, sed ut volutpat. Ullamcorper in at nulla dignissim",
    services: "Manager",
  },
  {
    img: imgs.testi3,
    name: "Alice Smith",
    statement:
      "Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet. Tellus mi volutpat tellus, congue malesuada sit nisl donec a",
    services: "Manager",
  },
];

export const users = [
  {
    id: "1",
    img: imgs.seller1,
    name: "Bhai jan ADMIN",
    number: 4,
    active: true,
  },
  {
    id: "2",
    img: imgs.provider1,
    name: "Bhai jan ADMIN",
    number: 2,
    active: true,
  },
  {
    id: "3",
    img: imgs.provider2,
    name: "Bhai jan ADMIN",
    number: 1,
    active: true,
  },
  {
    id: "4",
    img: imgs.provider3,
    name: "Bhai jan ADMIN",
    number: 0,
    active: false,
  },
  {
    id: "5",
    img: imgs.seller1,
    name: "Bhai jan ADMIN",
    number: 0,
    active: false,
  },
  {
    id: "6",
    img: imgs.provider3,
    name: "Bhai jan ADMIN",
    number: 0,
    active: false,
  },
  {
    id: "7",
    img: imgs.provider1,
    name: "Bhai jan ADMIN",
    number: 0,
    active: true,
  },
  {
    id: "8",
    img: imgs.provider2,
    name: "Bhai jan ADMIN",
    number: 0,
    active: true,
  },
  {
    id: "9",
    img: imgs.provider1,
    name: "Bhai jan ADMIN",
    number: 0,
    active: true,
  },
  {
    id: "xnbxcvbvb6887",
    img: imgs.provider1,
    name: "Bhai jan ADMIN",
    number: 0,
    active: true,
  },
  {
    id: "237643875ufdh",
    img: imgs.provider3,
    name: "Bhai jan ADMIN",
    number: 0,
    active: true,
  },
  {
    id: "dwhgsd78",
    img: imgs.seller1,
    name: "Bhai jan ADMIN",
    number: 0,
    active: false,
  },
];

export const conversations = [
  {
    id: "jakh089",
    img: imgs.seller1,
    message: "Hi Jov Dov",
    time: "8:00 PM",
    isOwn: false,
  },
  {
    id: "89832867tigghwei567",
    img: imgs.provider1,
    message: "What sup",
    time: "8:00 PM",
    isOwn: true,
  },
  {
    id: "mnjksd7832903544",
    img: imgs.provider3,
    message: "Lorem ipsum hassince the 257678suusdh",
    time: "8:00 PM",
    isOwn: false,
  },
  {
    id: "poiuas567nhg34",
    img: imgs.seller1,
    message: "Lorem ipsum hasipsum has been  been the industry ",
    time: "8:00 PM",
    isOwn: true,
  },
  {
    id: "zc32nb76mn",
    img: imgs.provider1,
    message: "Lorem ipsum has been the industry",
    time: "8:00 PM",
    isOwn: false,
  },
  {
    id: "099yu6",
    img: imgs.provider3,
    message:
      "Lorem ipsum has been the industry standard dummy psum standard dummy text ever since",
    time: "8:00 PM",
    isOwn: false,
  },
  {
    id: 7,
    img: imgs.provider1,
    message:
      "Lorem ipsum has been the industry standard dummy text ever standard dummy text ever",
    time: "8:00 PM",
    isOwn: true,
  },
  {
    id: "ghoqw97778",
    img: imgs.provider2,
    message: "Lorem ipsum has ever standard dummy text ever",
    time: "8:00 PM",
    isOwn: true,
  },
  {
    id: "6677565ythg",
    img: imgs.provider3,
    message:
      "Lorem ipsum has been the industry standard dummy text ever standard dummy text ever",
    time: "8:00 PM",
    isOwn: false,
  },
];

export const galleryImg = [
  {
    img: imgs.detailservice,
  },
  {
    img: imgs.detail1,
  },
  {
    img: imgs.detail2,
  },
  {
    img: imgs.detail3,
  },
  {
    img: imgs.detail4,
  },
];

export const categories = [
  {
    id: "cleaning",
    name: "Cleaning Services",
    types: [
      "House Cleaning",
      "Office Cleaning",
      "Carpet Cleaning",
      "Window Cleaning",
    ],
  },
  {
    id: "home_repair",
    name: "Home Repair",
    types: [
      "Plumbing",
      "Electrical Repairs",
      "Painting",
      "Carpentry",
      "Roof Repair",
    ],
  },
  {
    id: "gardening",
    name: "Gardening & Landscaping",
    types: [
      "Lawn Mowing",
      "Tree Trimming",
      "Garden Design",
      "Irrigation System Installation",
    ],
  },
  {
    id: "beauty",
    name: "Beauty & Wellness",
    types: [
      "Hair Styling",
      "Makeup Services",
      "Massage Therapy",
      "Skincare Treatments",
    ],
  },
  {
    id: "fitness",
    name: "Fitness & Training",
    types: [
      "Personal Training",
      "Yoga Classes",
      "Martial Arts Training",
      "Gym Coaching",
    ],
  },
  {
    id: "tech",
    name: "Tech Support & IT Services",
    types: [
      "Computer Repairs",
      "Network Setup",
      "Software Installation",
      "Cybersecurity Services",
    ],
  },
  {
    id: "automobile",
    name: "Automobile Services",
    types: [
      "Car Wash",
      "Auto Repair",
      "Oil Change",
      "Tire Services",
      "Car Painting",
    ],
  },
  {
    id: "event",
    name: "Event Services",
    types: [
      "Photography",
      "Videography",
      "Catering",
      "Event Planning",
      "Decorations",
    ],
  },
  {
    id: "education",
    name: "Education & Tutoring",
    types: [
      "Home Tutoring",
      "Online Classes",
      "Language Lessons",
      "Music Lessons",
    ],
  },
  {
    id: "security",
    name: "Security Services",
    types: [
      "CCTV Installation",
      "Private Security",
      "Alarm Systems",
      "Cybersecurity",
    ],
  },
];


export const providerReviews = [
  {
    img: imgs.provider1,
    review:
      "Car wash is a facility used to clean the exterior and, in some cases, the interior of motor vehicles. Car washes can be self-serve, fully automated, or full-service with attendants who wash the vehicle.",
    rating: 3,
    name: "Eniola",
  },
  {
    img: imgs.provider2,
    review:
      "Car wash is a facility used to clean the exterior and, in some cases, the interior of motor vehicles. Car washes can be self-serve, fully automated, or full-service with attendants who wash the vehicle.",
    rating: 2,
    name: "Eniola",
  },
  {
    img: imgs.seller1,
    review:
      "Car wash is a facility used to clean the exterior and, in some cases, the interior of motor vehicles. Car washes can be self-serve, fully automated, or full-service with attendants who wash the vehicle.",
    rating: 2,
    name: "Eniola",
  },
  {
    img: imgs.provider3,
    review:
      "Car wash is a facility used to clean the exterior and, in some cases, the interior of motor vehicles. Car washes can be self-serve, fully automated, or full-service with attendants who wash the vehicle.",
    rating: 5,
    name: "Eniola",
  },
];

export const allservices = [
  {
    name: "Household",
    services: [
      "Cleaning services (house cleaning, carpet cleaning, window cleaning).",
      "Plumbing services",
      "Electrical services",
      "Air Conditioning and cooling system",
      "services Pest control services ",
      "Handyman services",
      "Landscaping and gardening services",
    ],
  },
  {
    name: "Education",
    services: [
      "Tutoring and academic support.",
      "Language learning services",
      "Music and arts lessons",
    ],
  },
  {
    name: "Event",
    services: [
      "Event planning and coordination services",
      "Catering services",
      "Photography and videography services",
      "DJ and entertainment services",
      "services Pest control services ",
      "Venue rental services Floral and decoration services",
           
    ],
  },
  {
    name: "Professional",
    services: [
      "Legal services (lawyers, attorneys, legal consultants)",
      "Marketing and advertising services",
      "Web development and design services ",
      "Business consulting services",
      "Writing and editing services  ",
      "Accounting and financial services (accountants, tax consultants)",
      "Translation services  ",
      "Translation services  ",
    ],
  },
  {
    name: "Household",
    services: [
      "Cleaning services (house cleaning, carpet cleaning, window cleaning).",
      "Plumbing services",
      "Electrical services",
      "Air Conditioning and cooling system",
      "services Pest control services ",
      "Handyman services",
      "Landscaping and gardening services",
    ],
  },
  {
    name: "Education",
    services: [
      "Tutoring and academic support.",
      "Language learning services",
      "Music and arts lessons",
    ],
  },
  {
    name: "Household",
    services: [
      "Cleaning services (house cleaning, carpet cleaning, window cleaning).",
      "Plumbing services",
      "Electrical services",
      "Air Conditioning and cooling system",
      "services Pest control services ",
      "Handyman services",
      "Landscaping and gardening services",
    ],
  },
  {
    name: "Education",
    services: [
      "Tutoring and academic support.",
      "Language learning services",
      "Music and arts lessons",
    ],
  },
  {
    name: "Event",
    services: [
      "Event planning and coordination services",
      "Catering services",
      "Photography and videography services",
      "DJ and entertainment services",
      "services Pest control services ",
      "Venue rental services Floral and decoration services",
           
    ],
  },
  {
    name: "Professional",
    services: [
      "Legal services (lawyers, attorneys, legal consultants)",
      "Marketing and advertising services",
      "Web development and design services ",
      "Business consulting services",
      "Writing and editing services  ",
      "Accounting and financial services (accountants, tax consultants)",
      "Translation services  ",
    ],
  },
  {
    name: "Household",
    services: [
      "Cleaning services (house cleaning, carpet cleaning, window cleaning).",
      "Plumbing services",
      "Electrical services",
      "Air Conditioning and cooling system",
      "services Pest control services ",
      "Handyman services",
      "Landscaping and gardening services",
    ],
  },
  {
    name: "Education",
    services: [
      "Tutoring and academic support.",
      "Language learning services",
      "Music and arts lessons",
    ],
  },
];


export const validBookings  = [
  {
    _id:"",
    photos:[],
    name:"",
    status:"",
    createdAt:Date.now(),
    amount:"",
    location:"",
    provider:"",

    providerId:{
      
        _id: "prv6",
        name: "Amina Bello",
        email:"",
        rating: 4.5,
        avatar: imgs.provider2,
        location: "Lagos",
        contact: "+2348000000006",
        createdAt: new Date().toISOString(),
      },
    

  }
]







