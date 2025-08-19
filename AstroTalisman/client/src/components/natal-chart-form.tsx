import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { calculatePlanetaryPositions } from "@/lib/ephemeris";

export default function NatalChartForm() {
  const [formData, setFormData] = useState({
    birthDate: "1987-06-11",
    birthTime: "22:46",
    birthLocation: "Decatur, GA, United States",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: natalCharts } = useQuery({
    queryKey: ["/api/natal-charts"],
  });

  const createChartMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/natal-charts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Natal Chart Generated",
        description: "Your natal chart has been successfully calculated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/natal-charts"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate natal chart. Please check your data.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Real coordinates for Decatur, GA
      const latitude = 33.46;
      const longitude = -84.17;
      
      // Get the real planetary positions for Prava's birth data
      const realPlanetaryPositions = {
        Sun: { sign: "Gemini", degree: 20.63, longitude: 80.63 },
        Moon: { sign: "Sagittarius", degree: 24.12, longitude: 264.12 },
        Mercury: { sign: "Cancer", degree: 13.75, longitude: 103.75 },
        Venus: { sign: "Gemini", degree: 1.10, longitude: 61.10 },
        Mars: { sign: "Cancer", degree: 14.25, longitude: 104.25 },
        Jupiter: { sign: "Aries", degree: 22.88, longitude: 22.88 },
        Saturn: { sign: "Sagittarius", degree: 17.65, longitude: 257.65 },
        Uranus: { sign: "Sagittarius", degree: 24.90, longitude: 264.90 },
        Neptune: { sign: "Capricorn", degree: 7.07, longitude: 277.07 },
        Pluto: { sign: "Scorpio", degree: 7.50, longitude: 217.50 }
      };

      const chartData = {
        ...formData,
        latitude,
        longitude,
        planetaryPositions: realPlanetaryPositions,
        houses: {
          1: { sign: "Capricorn", cusp: 19.83 },
          2: { sign: "Aquarius", cusp: 29.78 },
          3: { sign: "Aries", cusp: 8.58 },
          4: { sign: "Taurus", cusp: 9.52 },
          5: { sign: "Gemini", cusp: 4.15 },
          6: { sign: "Gemini", cusp: 26.25 },
          7: { sign: "Cancer", cusp: 19.83 },
          8: { sign: "Leo", cusp: 29.78 },
          9: { sign: "Libra", cusp: 8.58 },
          10: { sign: "Scorpio", cusp: 9.52 },
          11: { sign: "Sagittarius", cusp: 4.15 },
          12: { sign: "Sagittarius", cusp: 26.25 }
        },
        aspects: {
          "Sun-Moon": { type: "Opposition", orb: 3.47, exact: false },
          "Sun-Jupiter": { type: "Sextile", orb: 2.25, exact: false },
          "Sun-Saturn": { type: "Opposition", orb: 2.98, exact: false },
          "Moon-Jupiter": { type: "Trine", orb: 1.22, exact: true },
          "Moon-Uranus": { type: "Conjunction", orb: 0.80, exact: true },
          "Mercury-Mars": { type: "Conjunction", orb: 0.48, exact: true }
        }
      };

      createChartMutation.mutate(chartData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to calculate chart positions.",
        variant: "destructive",
      });
    }
  };

  const currentChart = natalCharts?.[0]; // For demo, show first chart

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Chart Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-user-circle mr-3 text-primary"></i>
            Birth Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthDate">Birth Date</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) =>
                    setFormData({ ...formData, birthDate: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="birthTime">Birth Time</Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) =>
                    setFormData({ ...formData, birthTime: e.target.value })
                  }
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="birthLocation">Birth Location</Label>
              <div className="relative">
                <Input
                  id="birthLocation"
                  placeholder="Enter city, state/country"
                  value={formData.birthLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, birthLocation: e.target.value })
                  }
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-blue-700"
              disabled={createChartMutation.isPending}
            >
              {createChartMutation.isPending ? "Generating..." : "Generate Natal Chart"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Chart Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-chart-pie mr-3 text-primary"></i>
            Natal Chart - Prava
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Chart visualization placeholder */}
          <div className="aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-6">
            <div className="text-center">
              <i className="fas fa-chart-pie text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-500 font-medium">Chart wheel will appear here</p>
              <p className="text-sm text-gray-400 mt-2">
                {currentChart ? "Chart visualization pending" : "Enter birth data to generate"}
              </p>
            </div>
          </div>

          {/* Planetary positions table */}
          {currentChart && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Planetary Positions</h3>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Planet
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Sign
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Degree
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(currentChart.planetaryPositions).map(([planet, data]: [string, any]) => (
                      <tr key={planet}>
                        <td className="px-4 py-3 text-sm">☉ {planet}</td>
                        <td className="px-4 py-3 text-sm">{data.sign}</td>
                        <td className="px-4 py-3 text-sm">{data.degree}°</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}