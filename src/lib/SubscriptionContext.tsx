'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_SUBSCRIBED_MODULES } from './modules';

interface SubscriptionContextType {
  subscribedModuleIds: string[];
  isSubscribed: (id: string) => boolean;
  toggleSubscription: (id: string) => void;
  subscribeAll: () => void;
  unsubscribeAll: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscribedModuleIds, setSubscribedModuleIds] = useState<string[]>(INITIAL_SUBSCRIBED_MODULES);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tessma_subscriptions');
      if (saved) {
        setSubscribedModuleIds(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
  }, []);

  const updateAndPersist = (newIds: string[]) => {
    // Dashboard and settings are core, always kept enabled
    const enforced = Array.from(new Set(['dashboard', 'settings', ...newIds]));
    setSubscribedModuleIds(enforced);
    try {
      localStorage.setItem('tessma_subscriptions', JSON.stringify(enforced));
    } catch {
      // Ignore storage errors
    }
  };

  const isSubscribed = (id: string) => {
    if (id === 'dashboard' || id === 'settings') return true;
    return subscribedModuleIds.includes(id);
  };

  const toggleSubscription = (id: string) => {
    if (id === 'dashboard' || id === 'settings') return;
    if (subscribedModuleIds.includes(id)) {
      updateAndPersist(subscribedModuleIds.filter((item) => item !== id));
    } else {
      updateAndPersist([...subscribedModuleIds, id]);
    }
  };

  const subscribeAll = () => {
    updateAndPersist([
      'dashboard',
      'finance',
      'sales-crm',
      'projects',
      'hr',
      'contracts',
      'compliance',
      'procurement',
      'it-assets',
      'service-support',
      'reports',
      'settings'
    ]);
  };

  const unsubscribeAll = () => {
    updateAndPersist(['dashboard', 'settings']);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscribedModuleIds,
        isSubscribed,
        toggleSubscription,
        subscribeAll,
        unsubscribeAll,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
