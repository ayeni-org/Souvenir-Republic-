import { Category, Product } from "./types";

export const COLORS = {
  primary: "#A67C00", // Gold/Mustard from the image
  secondary: "#000000", // Black
  accent: "#F5F5F0", // Warm off-white
};

export const CATEGORIES: Category[] = [
  {
    id: "kitchen-utensils",
    name: "Kitchen Utensils",
    subcategories: ["Knives & Cutlery", "Cooking Spoons & Spatulas", "Peelers & Graters"],
  },
  {
    id: "kitchenware",
    name: "Kitchenware",
    subcategories: ["Pots & Pans", "Mixing Bowls", "Bakeware"],
  },
  {
    id: "cooking-appliances",
    name: "Cooking Appliances",
    subcategories: ["Blenders & Mixers", "Toasters & Ovens", "Coffee Machines"],
  },
  {
    id: "food-preparation",
    name: "Food Preparation",
    subcategories: ["Cutting Boards", "Choppers & Slicers", "Measuring Tools"],
  },
  {
    id: "storage-serving",
    name: "Storage & Serving",
    subcategories: ["Containers & Jars", "Plates & Bowls", "Serving Trays"],
  },
  {
    id: "household-essentials",
    name: "Household Essentials",
    subcategories: ["Cleaning Tools", "Laundry Supplies", "Home Organization"],
  },
  {
    id: "kids-items",
    name: "Kids Items",
    subcategories: ["Toys & Games", "Feeding & Utensils", "Learning Tools"],
  },
  {
    id: "souvenir-gifts",
    name: "Souvenirs & Gifts",
    subcategories: ["Decorative Items", "Gift Sets", "Personalized Gifts"],
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "1070-1035 Half Stainless",
    price: 3000,
    image: "https://picsum.photos/seed/utensil1/400/400",
    category: "Kitchen Utensils",
    description: "High-quality half stainless steel utensil, perfect for modern kitchens. Durable and stylish.",
    specifications: {
      "Material": "Stainless Steel & ABS Plastic",
      "Weight": "250g",
      "Dimensions": "30cm x 5cm",
      "Color": "Silver/Black"
    },
    reviews: [
      { id: "r1", user: "Adebayo K.", rating: 5, comment: "Very durable and looks great!", date: "2024-01-15" },
      { id: "r2", user: "Chioma O.", rating: 4, comment: "Good quality for the price.", date: "2024-01-20" }
    ],
    stock: 45,
    sku: "SR-1070",
    active: true
  },
  {
    id: "2",
    name: "1137 Medium Spoon",
    price: 1000,
    image: "https://picsum.photos/seed/spoon/400/400",
    category: "Kitchen Utensils",
    description: "Elegant medium-sized spoon designed for comfort and durability. Ideal for daily use.",
    specifications: {
      "Material": "Polished Stainless Steel",
      "Size": "Medium",
      "Dishwasher Safe": "Yes"
    },
    reviews: [
      { id: "r3", user: "John D.", rating: 5, comment: "Perfect size for serving.", date: "2024-02-01" }
    ],
    stock: 120,
    sku: "SR-1137",
    active: true
  },
  {
    id: "3",
    name: "12pc Wooden Rotating Spice Jar (qx-5)",
    price: 20000,
    image: "https://picsum.photos/seed/spice/400/400",
    category: "Kitchenware",
    description: "A beautiful 12-piece wooden rotating spice jar set. Keeps your spices organized and accessible.",
    specifications: {
      "Material": "Natural Wood & Glass",
      "Capacity": "12 Jars",
      "Rotation": "360 Degrees"
    },
    reviews: [],
    stock: 15,
    sku: "SR-QX5",
    active: true
  },
  {
    id: "4",
    name: "12pcs Cutlery Set",
    price: 1250,
    image: "https://picsum.photos/seed/cutlery/400/400",
    category: "Kitchen Utensils",
    description: "Complete 12-piece cutlery set for your dining table. Made from premium materials.",
    specifications: {
      "Set Includes": "4 Spoons, 4 Forks, 4 Knives",
      "Material": "Stainless Steel"
    },
    reviews: [],
    stock: 85,
    sku: "SR-CS12",
    active: true
  },
  {
    id: "5",
    name: "17pcs Tea Set",
    price: 18000,
    image: "https://picsum.photos/seed/tea/400/400",
    category: "Storage And Serving",
    description: "Exquisite 17-piece tea set for hosting guests. Features a classic design with gold accents.",
    specifications: {
      "Material": "Fine Porcelain",
      "Gold Trim": "Yes",
      "Set Includes": "Teapot, 6 Cups, 6 Saucers, Sugar Bowl, Creamer"
    },
    reviews: [],
    stock: 8,
    sku: "SR-TS17",
    active: true
  },
  {
    id: "6",
    name: "1996 1200 Net Water",
    price: 3500,
    image: "https://picsum.photos/seed/water/400/400",
    category: "Storage And Serving",
    description: "Large capacity water container with a secure lid. Perfect for keeping your beverages fresh.",
    specifications: {
      "Capacity": "1200ml",
      "BPA Free": "Yes"
    },
    reviews: [],
    stock: 64,
    sku: "SR-W1200",
    active: true
  },
  {
    id: "7",
    name: "21pc Silicon With Knives Small Sx 9005",
    price: 13500,
    image: "https://picsum.photos/seed/knives/400/400",
    category: "Food Preparation",
    description: "Comprehensive 21-piece silicon kitchen set including high-quality knives. Heat resistant and safe.",
    specifications: {
      "Material": "Food-grade Silicon & Steel",
      "Heat Resistance": "Up to 230°C"
    },
    reviews: [],
    stock: 22,
    sku: "SR-SX9005",
    active: true
  },
  {
    id: "8",
    name: "2427 Voung Bottle",
    price: 3800,
    image: "https://picsum.photos/seed/bottle/400/400",
    category: "Kitchen Utensils",
    description: "Stylish and portable water bottle. Durable construction for long-lasting use.",
    specifications: {
      "Material": "Tritan Plastic",
      "Leak Proof": "Yes"
    },
    reviews: [],
    stock: 95,
    sku: "SR-VB2427",
    active: true
  },
  {
    id: "9",
    name: "2ways Abs Hand Grater",
    price: 1400,
    image: "https://picsum.photos/seed/grater/400/400",
    category: "Food Preparation",
    description: "Versatile 2-way hand grater for cheese, vegetables, and more. Easy to clean and store.",
    specifications: {
      "Material": "ABS Plastic & Stainless Steel",
      "Blades": "Fine & Coarse"
    },
    reviews: [],
    stock: 42,
    sku: "SR-HG2",
    active: true
  },
  {
    id: "10",
    name: "3 In 1 Bottle",
    price: 5000,
    image: "https://picsum.photos/seed/bottle3in1/400/400",
    category: "Kitchen Utensils",
    description: "Innovative 3-in-1 bottle design. Multi-functional and perfect for on-the-go hydration.",
    specifications: {
      "Features": "Built-in Pill Organizer, Cup, Water Bottle"
    },
    reviews: [],
    stock: 31,
    sku: "SR-B31",
    active: true
  },
  {
    id: "11",
    name: "3 In 1 Non Stick Pot Gz 1001",
    price: 13500,
    image: "https://picsum.photos/seed/pot/400/400",
    category: "Kitchenware",
    description: "Premium non-stick pot set. 3-in-1 configuration for all your cooking needs.",
    specifications: {
      "Coating": "Ceramic Non-stick",
      "Induction Ready": "Yes"
    },
    reviews: [],
    stock: 14,
    sku: "SR-GZ1001",
    active: true
  },
  {
    id: "12",
    name: "3 In 1 Sterling Cup Bottle Sx 7020",
    price: 5200,
    image: "https://picsum.photos/seed/cup/400/400",
    category: "Kitchen Utensils",
    description: "Elegant sterling cup bottle. Combines style with functionality for a premium experience.",
    specifications: {
      "Material": "Sterling Silver Plated",
      "Insulated": "Yes"
    },
    reviews: [],
    stock: 28,
    sku: "SR-SX7020",
    active: true
  },
];
