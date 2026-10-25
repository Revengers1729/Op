export type EyewearTier = 'premium' | 'middle' | 'budget';

export type FrameShape = 
  | 'wayfarer' 
  | 'aviator' 
  | 'round' 
  | 'clubmaster' 
  | 'hexagonal' 
  | 'rimless' 
  | 'cat-eye' 
  | 'rectangle';

export interface EyewearColor {
  name: string;
  hex: string;
  rimColor: string;
  templeColor: string;
}

export interface EyewearItem {
  id: string;
  name: string;
  code: string;
  tier: EyewearTier;
  shape: FrameShape;
  material: string;
  weightGrams: number;
  price: number;
  originalPrice: number;
  dimensions: {
    lensWidth: number; // mm
    bridge: number;    // mm
    temple: number;    // mm
  };
  colors: EyewearColor[];
  tags: string[];
  bestForFace: string[];
  description: string;
  features: string[];
  inStock: boolean;
  isPopular?: boolean;
  gender?: 'men' | 'women' | 'unisex' | 'kids';
  category?: 'eyeglasses' | 'sunglasses' | 'screen' | 'reading';
  rating?: number;
  reviewsCount?: number;
  size?: 'Narrow' | 'Medium' | 'Wide';
  brand?: string;
}

export type LensTypeId = 
  | 'frame_only' 
  | 'single_vision_ar' 
  | 'blue_cut_shield' 
  | 'polarized_sun' 
  | 'photochromic_transition' 
  | 'digital_progressive' 
  | 'ultra_thin_167';

export interface LensOption {
  id: LensTypeId;
  name: string;
  subtitle: string;
  priceAddon: number;
  description: string;
  recommendedFor: string;
}

export interface CartItem {
  cartId: string;
  item: EyewearItem;
  selectedColor: EyewearColor;
  selectedLens: LensOption;
  powerOption: 'later' | 'custom' | 'upload_wa';
  prescriptionDetails?: {
    rightEye?: string;
    leftEye?: string;
    notes?: string;
  };
  quantity: number;
}
