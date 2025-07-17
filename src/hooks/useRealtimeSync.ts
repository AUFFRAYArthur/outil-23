import { useEffect, useRef } from 'react';

type SyncCallback = () => void;

interface SyncSubscription {
  id: string;
  callback: SyncCallback;
}

class RealtimeSyncManager {
  private subscriptions: Map<string, SyncSubscription[]> = new Map();
  private static instance: RealtimeSyncManager;

  static getInstance(): RealtimeSyncManager {
    if (!RealtimeSyncManager.instance) {
      RealtimeSyncManager.instance = new RealtimeSyncManager();
    }
    return RealtimeSyncManager.instance;
  }

  subscribe(channel: string, id: string, callback: SyncCallback): () => void {
    if (!this.subscriptions.has(channel)) {
      this.subscriptions.set(channel, []);
    }
    
    const channelSubs = this.subscriptions.get(channel)!;
    const subscription: SyncSubscription = { id, callback };
    channelSubs.push(subscription);

    // Return unsubscribe function
    return () => {
      const index = channelSubs.findIndex(sub => sub.id === id);
      if (index > -1) {
        channelSubs.splice(index, 1);
      }
    };
  }

  notify(channel: string): void {
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
}

export const useRealtimeSync = (channel: string, callback: SyncCallback, dependencies: any[] = []) => {
  const syncManager = RealtimeSyncManager.getInstance();
  const callbackRef = useRef(callback);
  const idRef = useRef(`${channel}_${Math.random().toString(36).substr(2, 9)}`);

  // Update callback ref when dependencies change
  useEffect(() => {
    callbackRef.current = callback;
  }, dependencies);

  useEffect(() => {
    const unsubscribe = syncManager.subscribe(
      channel, 
      idRef.current, 
      () => callbackRef.current()
    );

    return unsubscribe;
  }, [channel]);

  const triggerSync = () => {
    syncManager.notify(channel);
  };

  return { triggerSync };
};