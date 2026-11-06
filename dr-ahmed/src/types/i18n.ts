/**
 * i18n Types
 * Full TypeScript interfaces for bilingual dictionaries (Arabic/English),
 * translation domains, language keys, and text direction.
 */

export type Lang = "ar" | "en";
export type Dir = "rtl" | "ltr";

export interface NavTranslations {
  home: string;
  about: string;
  services: string;
  location: string;
  gallery: string;
  contact: string;
}

export interface CtaTranslations {
  whatsapp: string;
  call: string;
  order: string;
  directions: string;
  more: string;
  allServices: string;
}

export interface HeroTranslations {
  badge: string;
  title: string;
  titleAccent: string;
  text: string;
  stat1: string;
  stat1d: string;
  stat2: string;
  stat2d: string;
  stat3: string;
  stat3d: string;
}

export interface ServiceItem {
  k: string;
  t: string;
  d: string;
}

export interface AboutPageTranslations {
  title: string;
  sub: string;
  storyTitle: string;
  story1: string;
  story2: string;
  valuesTitle: string;
  values: Array<{ t: string; d: string }>;
  whyTitle: string;
  why: Array<{ t: string; d: string }>;
}

export interface ServicesPageTranslations {
  title: string;
  sub: string;
  details: Array<{ k: string; t: string; d: string }>;
}

export interface LocationPageTranslations {
  title: string;
  sub: string;
  howTitle: string;
  how: string[];
}

export interface ContactTranslations {
  title: string;
  sub: string;
  formTitle: string;
  name: string;
  phone: string;
  type: string;
  message: string;
  types: {
    order: string;
    consult: string;
    delivery: string;
    other: string;
  };
  send: string;
  sentNote: string;
  errName: string;
  errPhone: string;
  errMsg: string;
  direct: string;
  facebook: string;
  placeholderNote: string;
}

export interface GalleryTranslations {
  title: string;
  sub: string;
  items: string[];
}

export interface FooterTranslations {
  links: string;
  rights: string;
  tagline: string;
}

export interface AuthTranslations {
  signIn: string;
  signUp: string;
  signOut: string;
  signInTitle: string;
  signUpTitle: string;
  signInDesc: string;
  signUpDesc: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  optional: string;
  submitting: string;
  yourAccount: string;
  currentlyLoggedIn: string;
  errEmailPassRequired: string;
  errAllRequiredFields: string;
  toastSignInSuccess: string;
  toastSignUpSuccess: string;
  toastSignOutSuccess: string;
}

export interface ErrorTranslations {
  notFoundCode: string;
  notFoundTitle: string;
  notFoundDesc: string;
  backHome: string;
  contactUs: string;
  errorTitle: string;
  errorDesc: string;
  tryAgain: string;
  serverErrorTitle: string;
  serverErrorDesc: string;
}

export interface LocaleDictionary {
  brand: string;
  brandShort: string;
  nav: NavTranslations;
  cta: CtaTranslations;
  hero: HeroTranslations;
  servicesTitle: string;
  servicesSub: string;
  services: ServiceItem[];
  aboutTitle: string;
  aboutText: string;
  hoursTitle: string;
  hoursNote: string;
  locationTitle: string;
  address: string;
  orderTitle: string;
  orderText: string;
  about: AboutPageTranslations;
  servicesPage: ServicesPageTranslations;
  locationPage: LocationPageTranslations;
  contact: ContactTranslations;
  gallery: GalleryTranslations;
  footer: FooterTranslations;
  auth: AuthTranslations;
  errors: ErrorTranslations;
  theme: string;
  lang: string;
  menu: string;
  toTop: string;
  waMsg: string;
}

export interface I18nContextValue {
  lang: Lang;
  dir: Dir;
  isRtl: boolean;
  t: LocaleDictionary;
  toggleLang: () => void;
  setLanguage: (lang: Lang) => void;
}
