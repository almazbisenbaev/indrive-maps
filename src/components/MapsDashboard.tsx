'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapCard } from './MapCard';
import { ConnectionStatus } from './ConnectionStatus';
import { ApiService } from '@/lib/api';
import { ApiResponse, MapsData } from '@/types/api';

export function MapsDashboard() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ApiService.getMaps();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch maps data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderMapGrid = (maps: any[], category: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {maps.map((map, index) => (
        <MapCard key={`${category}-${index}`} map={map} category={category} />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading maps data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Connection Error</CardTitle>
            <CardDescription>
              Failed to connect to the backend server
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchData} className="flex-1">
                Retry
              </Button>
              <ConnectionStatus />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maps Dashboard</h1>
          <p className="text-muted-foreground mt-1">{data.message}</p>
        </div>
        <div className="flex items-center gap-4">
          {/* <Badge variant="outline" className="text-sm">
            v{data.version} • {data.total_maps} maps
          </Badge> */}
          <ConnectionStatus />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            Analysis
            <Badge variant="secondary" className="ml-1">
              {data.maps.analysis.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="congestion" className="flex items-center gap-2">
            Congestion
            <Badge variant="secondary" className="ml-1">
              {data.maps.congestion.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="heatmaps" className="flex items-center gap-2">
            Heatmaps
            <Badge variant="secondary" className="ml-1">
              {data.maps.heatmaps.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="mt-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Analysis Maps</h2>
              <p className="text-muted-foreground text-sm">
                Traffic analysis and clustering visualizations
              </p>
            </div>
            {renderMapGrid(data.maps.analysis, 'analysis')}
          </div>
        </TabsContent>

        <TabsContent value="congestion" className="mt-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Congestion Maps</h2>
              <p className="text-muted-foreground text-sm">
                Traffic congestion and bottleneck visualizations
              </p>
            </div>
            {renderMapGrid(data.maps.congestion, 'congestion')}
          </div>
        </TabsContent>

        <TabsContent value="heatmaps" className="mt-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Heatmap Visualizations</h2>
              <p className="text-muted-foreground text-sm">
                Density and traffic flow heatmaps
              </p>
            </div>
            {renderMapGrid(data.maps.heatmaps, 'heatmaps')}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
