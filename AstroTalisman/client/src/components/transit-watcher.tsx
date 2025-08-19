import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function TransitWatcher() {
  const [alertSettings, setAlertSettings] = useState({
    majorChallenging: true,
    beneficial: true,
    minorAspects: false,
  });

  const { toast } = useToast();

  // For demo purposes, using a mock natal chart ID
  const mockNatalChartId = "demo-chart-1";

  const { data: activeTransits } = useQuery({
    queryKey: ["/api/transits/active", mockNatalChartId],
  });

  const { data: upcomingTransits } = useQuery({
    queryKey: ["/api/transits/upcoming", mockNatalChartId],
  });

  const calculateTransitsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/transits/calculate", {
        natalChartId: mockNatalChartId
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Transits Updated",
        description: "Transit calculations have been refreshed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to calculate transits.",
        variant: "destructive",
      });
    },
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "challenging":
        return "border-l-red-500 bg-red-50";
      case "positive":
        return "border-l-green-500 bg-green-50";
      case "mixed":
        return "border-l-blue-500 bg-blue-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "challenging":
        return "bg-red-100 text-red-800";
      case "positive":
        return "bg-green-100 text-green-800";
      case "mixed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case "challenging":
        return "Challenging";
      case "positive":
        return "Beneficial";
      case "mixed":
        return "Mixed";
      default:
        return "Neutral";
    }
  };

  const getUpcomingImpactColor = (impact: string) => {
    switch (impact) {
      case "challenging":
        return "bg-red-100 text-red-800";
      case "positive":
        return "bg-green-100 text-green-800";
      case "mixed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUpcomingImpactLabel = (impact: string) => {
    switch (impact) {
      case "challenging":
        return "Intense";
      case "positive":
        return "Excellent";
      case "mixed":
        return "Caution";
      default:
        return "Stable";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Current Transits */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <i className="fas fa-satellite-dish mr-3 text-primary"></i>
              Active Transits
            </CardTitle>
            <Button
              onClick={() => calculateTransitsMutation.mutate()}
              variant="outline"
              size="sm"
              disabled={calculateTransitsMutation.isPending}
            >
              {calculateTransitsMutation.isPending ? "Calculating..." : "Refresh"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeTransits && Array.isArray(activeTransits) && activeTransits.length > 0 ? (
            <div className="space-y-4">
              {activeTransits.map((transit: any) => (
                <div
                  key={transit.id}
                  className={`border-l-4 p-4 rounded-r-lg ${getImpactColor(transit.impact)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {transit.transitPlanet} {transit.aspect} {transit.natalPlanet}
                    </h3>
                    <Badge className={getImpactBadge(transit.impact)}>
                      {getImpactLabel(transit.impact)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Exact: {new Date(transit.exactDate).toLocaleDateString()} • Duration: Varies
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    {transit.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                    >
                      Suggest {transit.impact === "challenging" ? "Protection" : "Enhancement"} Talisman
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <i className="fas fa-satellite-dish text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-500 font-medium">No active transits</p>
              <p className="text-sm text-gray-400 mt-2">Click refresh to calculate current transits</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Transits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-clock mr-3 text-primary"></i>
            Upcoming Transits (30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingTransits && Array.isArray(upcomingTransits) && upcomingTransits.length > 0 ? (
            <div className="space-y-3">
              {upcomingTransits.map((transit: any) => (
                <div
                  key={transit.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {transit.transitPlanet} {transit.aspect} {transit.natalPlanet}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {new Date(transit.exactDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getUpcomingImpactColor(transit.impact)}>
                      {getUpcomingImpactLabel(transit.impact)}
                    </Badge>
                    <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <i className="fas fa-clock text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-500 font-medium">No upcoming transits</p>
              <p className="text-sm text-gray-400 mt-2">Refresh to calculate upcoming transits</p>
            </div>
          )}

          {/* Alert Settings */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Alert Settings</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="majorChallenging"
                  checked={alertSettings.majorChallenging}
                  onCheckedChange={(checked) =>
                    setAlertSettings({ ...alertSettings, majorChallenging: !!checked })
                  }
                />
                <label htmlFor="majorChallenging">
                  Major challenging transits (squares, oppositions)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="beneficial"
                  checked={alertSettings.beneficial}
                  onCheckedChange={(checked) =>
                    setAlertSettings({ ...alertSettings, beneficial: !!checked })
                  }
                />
                <label htmlFor="beneficial">
                  Beneficial opportunities (trines, sextiles)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="minorAspects"
                  checked={alertSettings.minorAspects}
                  onCheckedChange={(checked) =>
                    setAlertSettings({ ...alertSettings, minorAspects: !!checked })
                  }
                />
                <label htmlFor="minorAspects">
                  Minor aspects and lunar phases
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}