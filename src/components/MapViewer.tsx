'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapItem } from '@/types/api';
import { ApiService } from '@/lib/api';

interface MapViewerProps {
  map: MapItem;
  isOpen: boolean;
  onClose: () => void;
}

export function MapViewer({ map, isOpen, onClose }: MapViewerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenMap = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const mapUrl = ApiService.getMapUrl(map.url);
      window.open(mapUrl, '_blank');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open map');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {map.name}
            <Badge variant="secondary">HTML Map</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">{map.description}</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="text-sm">
              <span className="font-medium">URL:</span>
              <code className="ml-2 px-2 py-1 bg-muted rounded text-xs">
                {map.url}
              </code>
            </div>
            
            <div className="text-sm">
              <span className="font-medium">Full URL:</span>
              <code className="ml-2 px-2 py-1 bg-muted rounded text-xs break-all">
                {ApiService.getMapUrl(map.url)}
              </code>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={handleOpenMap} 
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? 'Opening...' : 'Open Map'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
