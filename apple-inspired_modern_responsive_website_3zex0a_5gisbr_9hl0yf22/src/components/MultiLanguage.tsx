import React, { useState, useContext, createContext } from 'react';
import { Globe, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  t: (key: string) => string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'hero.title': 'Think Different.',
    'hero.subtitle': 'Shop Apple.',
    'hero.description': 'Discover the latest innovations in technology. From iPhone to Mac, find the perfect Apple products that fit your lifestyle.',
    'button.shop-now': 'Shop Now',
    'button.watch-demo': 'Watch Demo',
    'features.title': 'Why Choose Apple Store?',
    'features.description': 'Experience premium quality, innovative design, and exceptional service with every Apple product.',
    'feature.quality.title': 'Premium Quality',
    'feature.quality.description': 'Every product meets Apple\'s highest standards for quality and performance.',
    'feature.delivery.title': 'Free Delivery',
    'feature.delivery.description': 'Fast and free shipping on all orders over $99. Get your products quickly.',
    'feature.warranty.title': 'Warranty Protection',
    'feature.warranty.description': 'Comprehensive warranty coverage and AppleCare+ options available.',
    'feature.support.title': 'Expert Support',
    'feature.support.description': '24/7 customer support from Apple-certified specialists.',
    'products.featured': 'Featured Products',
    'products.featured.description': 'Discover our most popular Apple products',
    'button.view-all': 'View All Products',
    'newsletter.title': 'Stay Updated',
    'newsletter.description': 'Get the latest news about Apple products, exclusive offers, and tech insights.',
    'button.subscribe': 'Subscribe'
  },
  es: {
    'nav.home': 'Inicio',
    'nav.products': 'Productos',
    'nav.about': 'Acerca de',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',
    'hero.title': 'Piensa Diferente.',
    'hero.subtitle': 'Compra Apple.',
    'hero.description': 'Descubre las últimas innovaciones en tecnología. Desde iPhone hasta Mac, encuentra los productos Apple perfectos para tu estilo de vida.',
    'button.shop-now': 'Comprar Ahora',
    'button.watch-demo': 'Ver Demo',
    'features.title': '¿Por qué elegir Apple Store?',
    'features.description': 'Experimenta calidad premium, diseño innovador y servicio excepcional con cada producto Apple.',
    'feature.quality.title': 'Calidad Premium',
    'feature.quality.description': 'Cada producto cumple con los más altos estándares de calidad y rendimiento de Apple.',
    'feature.delivery.title': 'Envío Gratuito',
    'feature.delivery.description': 'Envío rápido y gratuito en todos los pedidos superiores a $99. Recibe tus productos rápidamente.',
    'feature.warranty.title': 'Protección de Garantía',
    'feature.warranty.description': 'Cobertura de garantía integral y opciones AppleCare+ disponibles.',
    'feature.support.title': 'Soporte Experto',
    'feature.support.description': 'Soporte al cliente 24/7 de especialistas certificados por Apple.',
    'products.featured': 'Productos Destacados',
    'products.featured.description': 'Descubre nuestros productos Apple más populares',
    'button.view-all': 'Ver Todos los Productos',
    'newsletter.title': 'Mantente Actualizado',
    'newsletter.description': 'Recibe las últimas noticias sobre productos Apple, ofertas exclusivas e información tecnológica.',
    'button.subscribe': 'Suscribirse'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.products': 'Produits',
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'hero.title': 'Pensez Différemment.',
    'hero.subtitle': 'Achetez Apple.',
    'hero.description': 'Découvrez les dernières innovations technologiques. De l\'iPhone au Mac, trouvez les produits Apple parfaits pour votre style de vie.',
    'button.shop-now': 'Acheter Maintenant',
    'button.watch-demo': 'Voir la Démo',
    'features.title': 'Pourquoi choisir Apple Store ?',
    'features.description': 'Découvrez une qualité premium, un design innovant et un service exceptionnel avec chaque produit Apple.',
    'feature.quality.title': 'Qualité Premium',
    'feature.quality.description': 'Chaque produit répond aux plus hauts standards de qualité et de performance d\'Apple.',
    'feature.delivery.title': 'Livraison Gratuite',
    'feature.delivery.description': 'Expédition rapide et gratuite sur toutes les commandes de plus de 99$. Recevez vos produits rapidement.',
    'feature.warranty.title': 'Protection Garantie',
    'feature.warranty.description': 'Couverture de garantie complète et options AppleCare+ disponibles.',
    'feature.support.title': 'Support Expert',
    'feature.support.description': 'Support client 24/7 par des spécialistes certifiés Apple.',
    'products.featured': 'Produits en Vedette',
    'products.featured.description': 'Découvrez nos produits Apple les plus populaires',
    'button.view-all': 'Voir Tous les Produits',
    'newsletter.title': 'Restez Informé',
    'newsletter.description': 'Recevez les dernières nouvelles sur les produits Apple, les offres exclusives et les insights technologiques.',
    'button.subscribe': 'S\'abonner'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
    localStorage.setItem('preferred-language', code);
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage as keyof typeof translations];
    return translation?.[key as keyof typeof translation] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, setLanguage } = useLanguage();

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-apple-gray-100 transition-colors"
      >
        <Globe className="w-5 h-5 text-apple-gray-600" />
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="text-sm font-medium text-apple-gray-700">{currentLang?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-apple-gray-200 py-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                setLanguage(language.code);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-apple-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm font-medium text-apple-gray-900">{language.name}</span>
              </div>
              {currentLanguage === language.code && (
                <Check className="w-4 h-4 text-apple-blue-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
