import React, { createContext, useContext, useCallback, useEffect } from 'react';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: Date;
}

interface AnalyticsContextType {
  trackEvent: (event: string, properties?: Record<string, any>) => void;
  trackPageView: (page: string, properties?: Record<string, any>) => void;
  trackPurchase: (orderId: string, value: number, items: any[]) => void;
  trackSearch: (query: string, results: number) => void;
  trackProductView: (productId: number, productName: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const trackEvent = useCallback((event: string, properties?: Record<string, any>) => {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date()
    };

    // In a real app, you'd send this to your analytics service
    console.log('Analytics Event:', analyticsEvent);
    
    // Store in localStorage for demo purposes
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push(analyticsEvent);
    
    // Keep only last 1000 events
    if (events.length > 1000) {
      events.splice(0, events.length - 1000);
    }
    
    localStorage.setItem('analytics_events', JSON.stringify(events));
  }, []);

  const trackPageView = useCallback((page: string, properties?: Record<string, any>) => {
    trackEvent('page_view', {
      page,
      ...properties
    });
  }, [trackEvent]);

  const trackPurchase = useCallback((orderId: string, value: number, items: any[]) => {
    trackEvent('purchase', {
      order_id: orderId,
      value,
      currency: 'USD',
      items: items.map(item => ({
        item_id: item.product.id,
        item_name: item.product.name,
        category: item.product.category,
        quantity: item.quantity,
        price: item.product.price
      }))
    });
  }, [trackEvent]);

  const trackSearch = useCallback((query: string, results: number) => {
    trackEvent('search', {
      search_term: query,
      results_count: results
    });
  }, [trackEvent]);

  const trackProductView = useCallback((productId: number, productName: string) => {
    trackEvent('view_item', {
      item_id: productId,
      item_name: productName
    });
  }, [trackEvent]);

  // Track page views automatically
  useEffect(() => {
    const handleLocationChange = () => {
      trackPageView(window.location.pathname);
    };

    // Track initial page view
    trackPageView(window.location.pathname);

    // Listen for navigation changes
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [trackPageView]);

  const value: AnalyticsContextType = {
    trackEvent,
    trackPageView,
    trackPurchase,
    trackSearch,
    trackProductView
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
