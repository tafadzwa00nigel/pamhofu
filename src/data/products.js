// src/data/products.js

// Updated Beef Imports
// Ensure you have these images in your folder or rename these imports to match your files
import beefSide from '../assets/productImages/beefSide.jpg'; 
import beefForequarter from '../assets/productImages/beefForequarter.jpg';
import beefHindquarter from '../assets/productImages/beefHindquarter.jpg';

import goatFlank from '../assets/productImages/goatFlank.jpg';
import goatLegs from '../assets/productImages/goatLegs.jpg';
import goatLoin from '../assets/productImages/goatLoin.jpg';
import goatRibs from '../assets/productImages/goatRibs.jpg';
import goatShoulder from '../assets/productImages/goatShoulder.jpg';
import goatNeck from '../assets/productImages/goatNeck.jpg';

import porkBelly from '../assets/productImages/porkBelly.jpg';
import porkJowl from '../assets/productImages/porkJowl.jpg';
import porkLegs from '../assets/productImages/porkLegs.jpg';
import porkLoin from '../assets/productImages/porkLoin.jpg';
import porkRibs from '../assets/productImages/porkRibs.jpg';
import porkTrotters from '../assets/productImages/porkTrotters.jpg';

export const products = [
  // BEEF PRODUCTS (Abattoir Wholesale Cuts)
  { 
    id: 1, 
    slug: 'beef-side',
    name: 'Beef Side', 
    desc: 'A full half-carcass containing both the forequarter and hindquarter.', 
    category: 'beef', 
    img: beefSide,
    details: 'A side of beef is half of a dressed carcass, split vertically down the backbone. It includes all the primary cuts and is the standard unit for bulk purchasing.'
  },
  { 
    id: 2, 
    slug: 'beef-forequarter',
    name: 'Forequarter', 
    desc: 'The front section of the side, known for rich, flavorful roasting cuts.', 
    category: 'beef', 
    img: beefForequarter,
    details: 'The forequarter includes the neck, shoulder (chuck), brisket, and front ribs. These cuts are traditionally used for slow-cooking, braising, and high-quality mince.'
  },
  { 
    id: 3, 
    slug: 'beef-hindquarter',
    name: 'Hindquarter', 
    desc: 'The rear section containing premium steak cuts and lean roasts.', 
    category: 'beef', 
    img: beefHindquarter,
    details: 'The hindquarter contains the most tender cuts, including the loin, fillet, and rump. It is highly valued for its high percentage of grilling steaks and lean meat.'
  },

  // GOAT MEAT PRODUCTS
  { 
    id: 7, 
    slug: 'goat-legs',
    name: 'Legs', 
    desc: 'Meaty and lean, ideal for roasting whole.', 
    category: 'goat', 
    img: goatLegs,
    details: 'The goat leg is a versatile, lean cut. It is most popular for holiday roasts or sliced for succulent kebabs.'
  },
  { 
    id: 8, 
    slug: 'goat-loin',
    name: 'Loin', 
    desc: 'Tender and juicy, perfect for quick chops.', 
    category: 'goat', 
    img: goatLoin,
    details: 'Similar to beef, the goat loin is the most tender area, offering delicate chops that cook quickly over high heat.'
  },
  { 
    id: 9, 
    slug: 'goat-ribs',
    name: 'Rib', 
    desc: 'Succulent and flavorful, great for BBQ.', 
    category: 'goat', 
    img: goatRibs,
    details: 'Goat ribs are smaller than beef ribs but packed with flavor. They are best prepared with dry rubs or sticky glazes.'
  },
  { 
    id: 10, 
    slug: 'goat-shoulder',
    name: 'Shoulder', 
    desc: 'Best for slow-braising or stews.', 
    category: 'goat', 
    img: goatShoulder,
    details: 'The shoulder contains a lot of connective tissue, which melts into a rich sauce when braised over several hours.'
  },
  { 
    id: 11, 
    slug: 'goat-flank',
    name: 'Breast and Flank', 
    desc: 'Thin and flavorful, great for rolling.', 
    category: 'goat', 
    img: goatFlank,
    details: 'A thinner cut that is often stuffed and rolled (braciola style) or used for ground goat meat.'
  },
  { 
    id: 12, 
    slug: 'goat-neck',
    name: 'Neck', 
    desc: 'Rich in collagen, provides amazing depth to soups.', 
    category: 'goat', 
    img: goatNeck,
    details: 'The neck is a bone-in cut that releases incredible flavor into broths and traditional stews.'
  },

  // PORK PRODUCTS
  { 
    id: 13, 
    slug: 'pork-loin',
    name: 'Loin', 
    desc: 'The leanest and most tender part of the pig.', 
    category: 'pork', 
    img: porkLoin,
    details: 'Pork loin is a large, lean muscle. It can be sold as a whole roast or sliced into lean pork chops.'
  },
  { 
    id: 14, 
    slug: 'pork-belly',
    name: 'Belly', 
    desc: 'Rich, fatty, and used for bacon or pork belly burnt ends.', 
    category: 'pork', 
    img: porkBelly,
    details: 'The ultimate flavorful cut. Pork belly is the source of bacon and is prized for its layers of fat and meat.'
  },
  { 
    id: 15, 
    slug: 'pork-leg',
    name: 'Leg', 
    desc: 'Often cured into hams or roasted whole.', 
    category: 'pork', 
    img: porkLegs,
    details: 'The pork leg (or ham) is a large, lean cut usually reserved for curing, smoking, or festive roasts.'
  },
  { 
    id: 16, 
    slug: 'pork-ribs',
    name: 'Spare Ribs', 
    desc: 'Classic BBQ cut with a balance of meat and fat.', 
    category: 'pork', 
    img: porkRibs,
    details: 'Spare ribs are cut from the belly side. They are flatter and contain more bone than meat, but are incredibly juicy.'
  },
  { 
    id: 17, 
    slug: 'pork-jowl',
    name: 'Jowl', 
    desc: 'Incredibly flavorful, often used for guanciale.', 
    category: 'pork', 
    img: porkJowl,
    details: 'The cheek of the pig. It is very high in fat and is the traditional choice for making authentic Italian pasta sauces.'
  },
  { 
    id: 18, 
    slug: 'pork-trotters',
    name: 'Trotters', 
    desc: 'Smoky and salty, perfect for flavoring beans or greens.', 
    category: 'pork', 
    img: porkTrotters,
    details: 'Pork feet are high in gelatin. When simmered, they thicken stocks and add a unique richness to traditional dishes.'
  },
];