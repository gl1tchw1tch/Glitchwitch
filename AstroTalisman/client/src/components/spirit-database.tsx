import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function SpiritDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    planet: "",
    element: "",
    virtue: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: spirits, isLoading } = useQuery({
    queryKey: ["/api/spirits", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.planet && filters.planet !== "all") params.append("planet", filters.planet);
      if (filters.element && filters.element !== "all") params.append("element", filters.element);
      if (filters.virtue && filters.virtue !== "all") params.append("virtue", filters.virtue);
      
      const response = await fetch(`/api/spirits?${params}`);
      if (!response.ok) throw new Error("Failed to fetch spirits");
      return response.json();
    },
  });

  const filteredSpirits = spirits?.filter((spirit: any) =>
    spirit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spirit.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPlanetarySymbol = (planet: string) => {
    const symbols: Record<string, string> = {
      Sun: "☉",
      Moon: "☽", 
      Mercury: "☿",
      Venus: "♀",
      Mars: "♂",
      Jupiter: "♃",
      Saturn: "♄",
    };
    return symbols[planet] || planet.charAt(0);
  };

  const getPlanetaryColor = (planet: string) => {
    const colors: Record<string, string> = {
      Sun: "bg-yellow-100 text-yellow-600",
      Moon: "bg-blue-100 text-blue-600",
      Mercury: "bg-blue-100 text-blue-600",
      Venus: "bg-yellow-100 text-yellow-600",
      Mars: "bg-red-100 text-red-600",
      Jupiter: "bg-purple-100 text-purple-600",
      Saturn: "bg-gray-100 text-gray-600",
    };
    return colors[planet] || "bg-gray-100 text-gray-600";
  };

  const getElementColor = (element: string) => {
    const colors: Record<string, string> = {
      Fire: "bg-orange-100 text-orange-800",
      Earth: "bg-green-100 text-green-800",
      Air: "bg-gray-100 text-gray-800",
      Water: "bg-blue-100 text-blue-800",
    };
    return colors[element] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-filter mr-3 text-primary"></i>
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="search">Search Spirits</Label>
            <Input
              id="search"
              placeholder="Name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="planet">Planet</Label>
            <Select value={filters.planet} onValueChange={(value) => setFilters({...filters, planet: value})}>
              <SelectTrigger>
                <SelectValue placeholder="All Planets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Planets</SelectItem>
                <SelectItem value="Sun">Sun</SelectItem>
                <SelectItem value="Moon">Moon</SelectItem>
                <SelectItem value="Mars">Mars</SelectItem>
                <SelectItem value="Venus">Venus</SelectItem>
                <SelectItem value="Jupiter">Jupiter</SelectItem>
                <SelectItem value="Saturn">Saturn</SelectItem>
                <SelectItem value="Mercury">Mercury</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="element">Element</Label>
            <Select value={filters.element} onValueChange={(value) => setFilters({...filters, element: value})}>
              <SelectTrigger>
                <SelectValue placeholder="All Elements" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Elements</SelectItem>
                <SelectItem value="Fire">Fire</SelectItem>
                <SelectItem value="Earth">Earth</SelectItem>
                <SelectItem value="Air">Air</SelectItem>
                <SelectItem value="Water">Water</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="purpose">Purpose</Label>
            <Select value={filters.virtue} onValueChange={(value) => setFilters({...filters, virtue: value})}>
              <SelectTrigger>
                <SelectValue placeholder="All Purposes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Purposes</SelectItem>
                <SelectItem value="Protection">Protection</SelectItem>
                <SelectItem value="Abundance">Abundance</SelectItem>
                <SelectItem value="Love">Love</SelectItem>
                <SelectItem value="Wisdom">Wisdom</SelectItem>
                <SelectItem value="Healing">Healing</SelectItem>
                <SelectItem value="War">War/Conflict</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Spirit List */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <i className="fas fa-database mr-3 text-primary"></i>
                Spirit Database
              </CardTitle>
              <Button className="bg-primary text-white hover:bg-blue-700">
                <i className="fas fa-plus mr-2"></i>Add Spirit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <i className="fas fa-spinner fa-spin text-2xl text-gray-400 mb-4"></i>
                <p className="text-gray-500">Loading spirits...</p>
              </div>
            ) : filteredSpirits?.length === 0 ? (
              <div className="text-center py-8">
                <i className="fas fa-search text-2xl text-gray-400 mb-4"></i>
                <p className="text-gray-500">No spirits found matching your criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSpirits?.map((spirit: any) => (
                  <div
                    key={spirit.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{spirit.name}</h3>
                        <p className="text-sm text-gray-600">{spirit.description}</p>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getPlanetaryColor(spirit.planet)}`}>
                        <span className="text-xs">{getPlanetarySymbol(spirit.planet)}</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Planet:</span>
                        <Badge className={getPlanetaryColor(spirit.planet)}>{spirit.planet}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Element:</span>
                        <Badge className={getElementColor(spirit.element)}>{spirit.element}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Virtues:</span>
                        <div className="flex space-x-1">
                          {spirit.virtues.slice(0, 2).map((virtue: string, index: number) => (
                            <Badge key={index} variant="secondary">{virtue}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}