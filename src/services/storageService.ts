import { EyewearItem, LensOption } from '../types/optical';
import { CATALOG_ITEMS, LENS_OPTIONS } from '../data/catalog';

export interface CategoryItem {
  id: string;
  label: string;
  type?: 'category' | 'gender' | 'tier' | 'shape';
  sublabel?: string;
  imageUrl?: string;
}

export interface AppointmentItem {
  id: string;
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  reason: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface HeroBanner {
  id: string;
  imageUrl: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  layout?: 'split' | 'fullbleed';
  isActive: boolean;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  landmark: string;
  timings: string;
  mapsUrl: string;
  promoText: string;
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'men', label: 'Men', type: 'gender', sublabel: 'Trending', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
  { id: 'women', label: 'Women', type: 'gender', sublabel: 'Designer', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { id: 'kids', label: 'Kids', type: 'gender', sublabel: 'Unbreakable', imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=300&q=80' },
  { id: 'budget', label: 'Starts @ ₹499', type: 'tier', sublabel: 'Hustlr Eyewear', imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=300&q=80' },
  { id: 'screen', label: 'Computer Lenses', type: 'category', sublabel: 'Zero Power 420nm', imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=300&q=80' },
  { id: 'sunglasses', label: 'Sunglasses', type: 'category', sublabel: 'UV400 Polarized', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80' },
];

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'Anand Optical',
  tagline: 'Precision Vision & Eyewear',
  phone: '9430800015',
  whatsapp: '9430800015',
  email: 'anandopticalpatna@gmail.com',
  address: 'Danapur, Khagaul, Patna, Bihar - 801503',
  landmark: 'Near Danapur Station / Khagaul Road',
  timings: 'Open 7 Days: 9:30 AM – 9:00 PM',
  mapsUrl: 'https://www.google.com/maps/place/ANAND+OPTICAL/@25.6111055,85.0504545,2883m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39ed573ff65f2281:0x3b9fccb74ec6bc4c!8m2!3d25.6111059!4d85.0607543!16s%2Fg%2F11y95by830',
  promoText: '4.9 ★ Rating | 50,000+ Happy Eyes in Patna & Danapur | Call: 9430800015',
};

export const DEFAULT_HERO_BANNERS: HeroBanner[] = [
  {
    id: 'banner-essilor-crizal-sapphire',
    imageUrl: '/assets/essilor/essilor_obj_112.jpg',
    badge: 'AUTHORIZED ESSILOR PARTNER • ANAND OPTICAL',
    title: 'Crizal® Sapphire™ HR Lenses',
    subtitle: 'Transparency that stands the test of life. 360° multi-angular anti-reflective clarity, scratch & smudge resistance available at Danapur showroom.',
    ctaText: 'Explore Eyewear Collection',
    ctaLink: '#catalog',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-varilux-xr-series',
    imageUrl: '/assets/essilor/essilor_obj_17.jpg',
    badge: 'VARILUX® AI PROGRESSIVE • #1 WORLDWIDE',
    title: 'Varilux® XR Series™ Progressive',
    subtitle: 'Powered by Artificial Intelligence for instant sharpness even in motion. Expert progressive measurement by our Senior Optician (24+ Yrs Exp).',
    ctaText: 'Book Free Eye Test',
    ctaLink: '#eyetest',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-varilux-xr-track',
    imageUrl: '/assets/essilor/essilor_obj_21.jpg',
    badge: 'PERSONALIZED PROGRESSIVE VISION',
    title: 'Varilux® XR Track™',
    subtitle: 'The ultimate progressive lens personalized to your exact eye behavior and reading posture for effortless focus across every distance.',
    ctaText: 'Book Consultation',
    ctaLink: '#eyetest',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-varilux-near-far',
    imageUrl: '/assets/essilor/essilor_obj_19.jpg',
    badge: 'SEAMLESS MULTI-DISTANCE CLARITY',
    title: 'Instant Sharp Focus from Near to Far',
    subtitle: 'Experience smooth, natural transitions between smartphone, laptop, and distant road signs with authentic Varilux® progressive lenses.',
    ctaText: 'Explore Lens Lab',
    ctaLink: '#lens-tech',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-varilux-exclusive',
    imageUrl: '/assets/essilor/essilor_obj_37.jpg',
    badge: 'EXCLUSIVE FOR EXPERTS • ANAND OPTICAL',
    title: 'Engineered with AI & Individual Measurements',
    subtitle: 'Precision Varilux® XR Track lenses tailored to your unique facial geometry and optical center at our Danapur, Patna clinic.',
    ctaText: 'Book Free Eye Test',
    ctaLink: '#eyetest',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-varilux-vm-6tier',
    imageUrl: '/assets/essilor/essilor_obj_46.jpg',
    badge: 'VARILUX® CLINICAL COMPARISON CHART',
    title: 'Complete Varilux® Progressive Range (6 Tiers)',
    subtitle: 'Compare Varilux Progress, Ultra 3.0, Comfort Max, E Series, Physio Extensee & XR Series — enhanced with Transitions®, Crizal® & Eyecode®.',
    ctaText: 'Ask Optician on WhatsApp',
    ctaLink: 'whatsapp',
    layout: 'fullbleed',
    isActive: true,
  },
  {
    id: 'banner-essilor-varilux-vm-3tier',
    imageUrl: '/assets/essilor/essilor_obj_54.jpg',
    badge: 'VARILUX® ESSENTIAL GUIDE',
    title: 'Varilux® Progress, Liberty 3.0 & Comfort Max',
    subtitle: 'Preferred, Advanced & Superior progressive lens options with smooth transitions and all-day postural vision comfort.',
    ctaText: 'Book Free Eye Test',
    ctaLink: '#eyetest',
    layout: 'fullbleed',
    isActive: true,
  },
  {
    id: 'banner-essilor-mother-cover',
    imageUrl: '/assets/essilor/essilor_obj_4.jpg',
    badge: 'ESSILOR® VISUAL BRANDING 2026',
    title: 'World’s #1 Spectacle Lens Brand',
    subtitle: 'Authentic Essilor French optical lenses paired with designer titanium, acetate & TR90 frames at Anand Optical, Danapur.',
    ctaText: 'Shop Frames Collection',
    ctaLink: '#catalog',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-mother-sight',
    imageUrl: '/assets/essilor/essilor_obj_62.jpg',
    badge: 'ESSILOR® EVOLVING VISION',
    title: 'Reveal and Preserve the Power of Your Sight',
    subtitle: 'Choose from the world’s #1 brand in spectacle lenses. Innovative vision care with AI-powered precision solutions.',
    ctaText: 'Shop Eyeglasses',
    ctaLink: '#catalog',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-mother-research',
    imageUrl: '/assets/essilor/essilor_obj_64.jpg',
    badge: '170+ YEARS OF VISION SCIENCE',
    title: 'All Lenses Are Not Created Equal',
    subtitle: 'Driven by over 170 years of ophthalmic research, Essilor lenses deliver unmatched clarity, durability, and visual comfort.',
    ctaText: 'Explore 10D Lens Lab',
    ctaLink: '#lens-tech',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-eyezen-men',
    imageUrl: '/assets/essilor/essilor_obj_74.jpg',
    badge: 'EYEZEN® DIGITAL EYE RELIEF',
    title: 'Relax and Protect Your Eyes',
    subtitle: 'Essilor® Eyezen® lenses filter harmful blue-violet light and reduce visual fatigue from smartphones, laptops, and gaming screens.',
    ctaText: 'Shop Computer Glasses',
    ctaLink: '#catalog',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-eyezen-women',
    imageUrl: '/assets/essilor/essilor_obj_76.jpg',
    badge: 'EYEZEN® BLUE-VIOLET SHIELD',
    title: 'Zero Strain for Connected Lifestyles',
    subtitle: 'Engineered for students, coders, and professionals who spend 8+ hours daily on digital displays. Available in zero-power & prescription.',
    ctaText: 'Configure Blue-Cut Lens',
    ctaLink: '#catalog',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-transitions-gens-ruby',
    imageUrl: '/assets/essilor/essilor_obj_104.jpg',
    badge: 'NEW TRANSITIONS® GEN S™ • RUBY',
    title: 'Transitions® GEN S™ Ultra Dynamic',
    subtitle: 'Clear indoors and dark outdoors in seconds. Vibrant Ruby and fashion shades with 100% UVA/UVB & blue-violet light protection.',
    ctaText: 'Explore Sunglasses & Tints',
    ctaLink: '#catalog',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-transitions-gens-sapphire',
    imageUrl: '/assets/essilor/essilor_obj_106.jpg',
    badge: 'NEW TRANSITIONS® GEN S™ • SAPPHIRE',
    title: 'Ultra Dynamic Light-Intelligent Lenses',
    subtitle: 'Lightning-fast fade-back and sun activation built for Patna’s bright sunlight and indoor office comfort in a single pair.',
    ctaText: 'Shop Frames',
    ctaLink: '#catalog',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-transitions-women',
    imageUrl: '/assets/essilor/essilor_obj_84.jpg',
    badge: 'TRANSITIONS® PHOTOCHROMIC SERIES',
    title: 'Move Freely In Any Light',
    subtitle: 'Adaptive light-intelligent lenses that automatically adjust tint intensity as you step from indoors to bright outdoor sunlight.',
    ctaText: 'Book Free Demo',
    ctaLink: '#eyetest',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-transitions-men',
    imageUrl: '/assets/essilor/essilor_obj_86.jpg',
    badge: 'TRANSITIONS® ALL-DAY ADAPTATION',
    title: 'Smart Protection for Driving & Outdoors',
    subtitle: 'Seamless light control with crisp glare reduction and full UV protection crafted into your favorite optical frame.',
    ctaText: 'Shop Eyewear',
    ctaLink: '#catalog',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-color-touch-1',
    imageUrl: '/assets/essilor/essilor_obj_94.jpg',
    badge: 'NEW TRANSITIONS® COLOR TOUCH™',
    title: 'Always-On Touch of Color',
    subtitle: 'Ultra-dynamic photochromic lenses with a subtle indoor fashion tint — available in Gradient & Washed styles across 5 iconic colors.',
    ctaText: 'Explore Shades',
    ctaLink: '#catalog',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-color-touch-2',
    imageUrl: '/assets/essilor/essilor_obj_96.jpg',
    badge: 'TRANSITIONS® COLOR TOUCH™ • 5 COLORS',
    title: 'Ruby, Sapphire, Amethyst, Emerald & Amber',
    subtitle: 'Express your personal style indoors and outdoors with lightweight UV400 Color Touch lenses fitted in 1 hour at Anand Optical.',
    ctaText: 'Order on WhatsApp',
    ctaLink: 'whatsapp',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-crizal-rock',
    imageUrl: '/assets/essilor/essilor_obj_101.jpg',
    badge: 'CRIZAL® ROCK™ • ULTIMATE PROTECTION',
    title: 'Lens Durability, Like Never Before',
    subtitle: 'High-resistance anti-reflective coating rated best in scratch and smudge resistance for active everyday wear.',
    ctaText: 'Configure Crizal® Rock',
    ctaLink: '#catalog',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-crizal-natural',
    imageUrl: '/assets/essilor/essilor_obj_114.jpg',
    badge: 'NEW CRIZAL® NATURAL LOOK™',
    title: 'Less Reflection, More You',
    subtitle: 'All the benefits of premium Crizal protection enhanced with Advanced Aesthetic Technology™ for minimal reflection and natural eye visibility.',
    ctaText: 'Explore Collection',
    ctaLink: '#catalog',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-stellest-2',
    imageUrl: '/assets/essilor/essilor_obj_110.jpg',
    badge: 'NEW ESSILOR® STELLEST® 2.0 LENSES',
    title: 'Higher Power, Higher Efficacy for Kids',
    subtitle: 'Next-generation myopia management lenses designed specifically to protect growing children’s vision with proven clinical efficacy.',
    ctaText: 'Book Kids Eye Screening',
    ctaLink: '#eyetest',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-essilor-stellest-67',
    imageUrl: '/assets/essilor/essilor_obj_108.jpg',
    badge: 'U.S. FDA AUTHORIZED • MYOPIA CONTROL',
    title: 'Essilor® Stellest® Slows Myopia by 67%',
    subtitle: 'Clinically proven spectacle lenses recommended by eye care professionals worldwide to slow down children’s myopia progression.',
    ctaText: 'Consult Senior Optician',
    ctaLink: '#eyetest',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-anand-hustlr',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80',
    badge: 'RESERVE FOR JUST ₹99 • WELCOME GIFT',
    title: 'A FREE Pair of Hustlr Eyewear',
    subtitle: 'Zero-power blue-cut computer eyewear or single-vision power lenses included. Danapur & Patna’s most trusted optical showroom.',
    ctaText: 'Reserve Now',
    ctaLink: 'reserve_hustlr',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-anand-festive',
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=80',
    badge: 'FESTIVE VIP PRIVILEGES • ANAND OPTICAL',
    title: 'DIWALI 2X BENEFITS',
    subtitle: 'Buy One Get One Free on Complete Spectacles with Free Computerized Eye Testing & Ultrasonic Fitting.',
    ctaText: 'Explore Sunglasses & Offers',
    ctaLink: '#catalog',
    layout: 'split',
    isActive: true,
  },
  {
    id: 'banner-anand-titanium',
    imageUrl: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1200&q=80',
    badge: 'PURE JAPANESE BETA-TITANIUM',
    title: 'SHUNYA — Echoes of the Universe',
    subtitle: 'Featherlight 7.8g rimless architecture. Hypoallergenic, corrosion-proof, and zero nose-bridge fatigue guaranteed.',
    ctaText: 'Explore Titanium Collection',
    ctaLink: 'explore_titanium',
    layout: 'split',
    isActive: true,
  },
];

// Storage Keys
const KEY_PRODUCTS = 'ao_products_catalog';
const KEY_LENSES = 'ao_lens_packages';
const KEY_CATEGORIES = 'ao_categories_list';
const KEY_BANNERS = 'ao_hero_banners_list';
const KEY_APPOINTMENTS = 'ao_appointments_list';
const KEY_SETTINGS = 'ao_store_settings';
const KEY_ADMIN_PASS = 'ao_admin_password';

export const ADMIN_DEFAULT_PASSWORD = 'anand@12345';

// Safe localStorage helper
export const storageService = {
  // PRODUCTS
  getProducts(): EyewearItem[] {
    try {
      const data = localStorage.getItem(KEY_PRODUCTS);
      if (data !== null) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading products from localStorage', e);
    }
    return CATALOG_ITEMS;
  },

  saveProducts(products: EyewearItem[]): boolean {
    try {
      localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
      return true;
    } catch (e) {
      console.error('Error saving products', e);
      return false;
    }
  },

  resetProducts(): EyewearItem[] {
    try {
      localStorage.removeItem(KEY_PRODUCTS);
    } catch (e) {}
    return CATALOG_ITEMS;
  },

  // LENS PACKAGES
  getLensPackages(): LensOption[] {
    try {
      const data = localStorage.getItem(KEY_LENSES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading lens packages', e);
    }
    return LENS_OPTIONS;
  },

  saveLensPackages(lenses: LensOption[]): boolean {
    try {
      localStorage.setItem(KEY_LENSES, JSON.stringify(lenses));
      return true;
    } catch (e) {
      console.error('Error saving lenses', e);
      return false;
    }
  },

  resetLensPackages(): LensOption[] {
    try {
      localStorage.removeItem(KEY_LENSES);
    } catch (e) {}
    return LENS_OPTIONS;
  },

  // CATEGORIES
  getCategories(): CategoryItem[] {
    try {
      const data = localStorage.getItem(KEY_CATEGORIES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading categories', e);
    }
    return DEFAULT_CATEGORIES;
  },

  saveCategories(cats: CategoryItem[]): boolean {
    try {
      localStorage.setItem(KEY_CATEGORIES, JSON.stringify(cats));
      return true;
    } catch (e) {
      console.error('Error saving categories', e);
      return false;
    }
  },

  resetCategories(): CategoryItem[] {
    try {
      localStorage.removeItem(KEY_CATEGORIES);
    } catch (e) {}
    return DEFAULT_CATEGORIES;
  },

  // HERO BANNERS / SLIDERS
  getBanners(): HeroBanner[] {
    try {
      const data = localStorage.getItem(KEY_BANNERS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading banners from localStorage', e);
    }
    return DEFAULT_HERO_BANNERS;
  },

  saveBanners(banners: HeroBanner[]): boolean {
    try {
      localStorage.setItem(KEY_BANNERS, JSON.stringify(banners));
      return true;
    } catch (e) {
      console.error('Error saving banners', e);
      return false;
    }
  },

  resetBanners(): HeroBanner[] {
    try {
      localStorage.removeItem(KEY_BANNERS);
    } catch (e) {}
    return DEFAULT_HERO_BANNERS;
  },

  // APPOINTMENTS
  getAppointments(): AppointmentItem[] {
    try {
      const data = localStorage.getItem(KEY_APPOINTMENTS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading appointments', e);
    }
    return [];
  },

  saveAppointment(app: Omit<AppointmentItem, 'id' | 'createdAt' | 'status'>): AppointmentItem {
    const list = this.getAppointments();
    const newItem: AppointmentItem = {
      ...app,
      id: `AO-APT-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    list.unshift(newItem);
    try {
      localStorage.setItem(KEY_APPOINTMENTS, JSON.stringify(list));
    } catch (e) {
      console.error('Error saving appointment', e);
    }
    return newItem;
  },

  updateAppointmentStatus(id: string, status: AppointmentItem['status']): AppointmentItem[] {
    const list = this.getAppointments().map((it) => (it.id === id ? { ...it, status } : it));
    try {
      localStorage.setItem(KEY_APPOINTMENTS, JSON.stringify(list));
    } catch (e) {}
    return list;
  },

  deleteAppointment(id: string): AppointmentItem[] {
    const list = this.getAppointments().filter((it) => it.id !== id);
    try {
      localStorage.setItem(KEY_APPOINTMENTS, JSON.stringify(list));
    } catch (e) {}
    return list;
  },

  // STORE SETTINGS
  getStoreSettings(): StoreSettings {
    try {
      const data = localStorage.getItem(KEY_SETTINGS);
      if (data) {
        return { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Error reading store settings', e);
    }
    return DEFAULT_STORE_SETTINGS;
  },

  saveStoreSettings(settings: StoreSettings): boolean {
    try {
      localStorage.setItem(KEY_SETTINGS, JSON.stringify(settings));
      return true;
    } catch (e) {
      console.error('Error saving settings', e);
      return false;
    }
  },

  // ADMIN PASSWORD
  getAdminPassword(): string {
    try {
      const saved = localStorage.getItem(KEY_ADMIN_PASS);
      if (saved) return saved;
    } catch (e) {}
    return ADMIN_DEFAULT_PASSWORD;
  },

  saveAdminPassword(newPass: string): boolean {
    try {
      localStorage.setItem(KEY_ADMIN_PASS, newPass);
      return true;
    } catch (e) {
      return false;
    }
  },
};
