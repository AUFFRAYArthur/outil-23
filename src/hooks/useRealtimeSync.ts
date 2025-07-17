import { useEffect, useRef, useCallback } from 'react';

type SyncCallback = () => void;

interface SyncSubscription {
  id: string;
  callback: SyncCallback;
}

class RealtimeSyncManager {
  private subscriptions: Map<string, SyncSubscription[]> = new Map();
  private static instance: RealtimeSyncManager;
  private notificationQueue: Map<string, NodeJS.Timeout> = new Map();

  static getInstance(): RealtimeSyncManager {
    if (!RealtimeSyncManager.instance) {
      RealtimeSyncManager.instance = new RealtimeSyncManager();
    }
    return RealtimeSyncManager.instance;
  }

  subscribe(channel: string, id: string, callback: SyncCallback): () => void {
    // Ensure channel exists
    if (!this.subscriptions.has(channel)) {
      this.subscriptions.set(channel, []);
    }
    
    const channelSubs = this.subscriptions.get(channel)!;
    
    // Remove existing subscription with same id to prevent duplicates
    const existingIndex = channelSubs.findIndex(sub => sub.id === id);
    if (existingIndex > -1) {
      channelSubs.splice(existingIndex, 1);
    }
    
    const subscription: SyncSubscription = { id, callback };
    channelSubs.push(subscription);

    // Return unsubscribe function
    return () => {
      const index = channelSubs.findIndex(sub => sub.id === id);
      if (index > -1) {
        channelSubs.splice(index, 1);
      }
      // Clean up empty channels
      if (channelSubs.length === 0) {
        this.subscriptions.delete(channel);
      }
    };
  }

  notify(channel: string): void {
    // Debounce notifications to prevent excessive re-renders
    if (this.notificationQueue.has(channel)) {
      clearTimeout(this.notificationQueue.get(channel)!);
    }
    
    const timeoutId = setTimeout(() => {
      this.executeNotification(channel);
      this.notificationQueue.delete(channel);
    }, 0); // Use 0ms timeout to batch synchronous updates
    
    this.notificationQueue.set(channel, timeoutId);
  }
  
  private executeNotification(channel: string): void {
    const channelSubs = this.subscriptions.get(channel);
    if (channelSubs) {
      channelSubs.forEach(sub => {
        try {
          sub.callback();
        } catch (error) {
          console.error(`Error in sync callback for ${sub.id}:`, error);
        }
      });
    }
  }
  
  // Cleanup method for testing or manual cleanup
  cleanup(): void {
    this.notificationQueue.forEach(timeout => clearTimeout(timeout));
    this.notificationQueue.clear();
    this.subscriptions.clear();
  }
}

export const useRealtimeSync = (channel: string, callback: SyncCallback) => {
  const syncManager = RealtimeSyncManager.getInstance();
  const stableCallback = useCallback(callback, []);
  const idRef = useRef(`${channel}_${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const unsubscribe = syncManager.subscribe(
      channel, 
      idRef.current, 
      stableCallback
    );

    return unsubscribe;
  }, [channel, stableCallback]);

  const triggerSync = () => {
    syncManager.notify(channel);
  };

  return { triggerSync };
};

export { RealtimeSyncManager }