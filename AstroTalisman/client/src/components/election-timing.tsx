import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ElectionTiming() {
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const [timeFrame, setTimeFrame] = useState("30");

  const { toast } = useToast();

  const { data: spirits } = useQuery({
    queryKey: ["/api/spirits"],
  });

  const findElectionsMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/elections/find", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Elections Calculated",
        description: "Optimal election times have been found for your goal.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to calculate election times.",
        variant: "destructive",
      });
    },
  });

  const { data: elections } = useQuery({
    queryKey: ["/api/elections", goal],
    enabled: !!goal,
  });

  const handleFindElections = () => {
    if (!goal) {
      toast({
        title: "Missing Information",
        description: "Please select a primary goal.",
        variant: "destructive",
      });
      return;
    }

    findElectionsMutation.mutate({ goal, description, timeFrame });
  };

  const recommendedSpirits = spirits?.filter((spirit: any) => {
    if (goal.toLowerCase().includes("liberation") || goal.toLowerCase().includes("freedom")) {
      return spirit.virtues.includes("Protection") || spirit.virtues.includes("Justice") || spirit.virtues.includes("Liberation") || spirit.virtues.includes("Courage");
    }
    if (goal.toLowerCase().includes("protection")) {
      return spirit.virtues.includes("Protection") || spirit.virtues.includes("Courage");
    }
    if (goal.toLowerCase().includes("abundance")) {
      return spirit.virtues.includes("Abundance") || spirit.virtues.includes("Love");
    }
    return false;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-blue-100 text-blue-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent Election";
    if (score >= 80) return "Good Election";
    if (score >= 70) return "Moderate Election";
    return "Poor Election";
  };

  const getScoreBorder = (score: number) => {
    if (score >= 90) return "border-green-200 bg-green-50";
    if (score >= 80) return "border-blue-200 bg-blue-50";
    if (score >= 70) return "border-yellow-200 bg-yellow-50";
    return "border-red-200 bg-red-50";
  };

  const getScoreNumber = (score: number) => {
    if (score >= 90) return "bg-green-600 text-white";
    if (score >= 80) return "bg-blue-600 text-white";
    if (score >= 70) return "bg-yellow-600 text-white";
    return "bg-red-600 text-white";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Goal Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-bullseye mr-3 text-primary"></i>
            Magical Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="goal">Primary Intention</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger>
                <SelectValue placeholder="Select primary goal..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="liberation">Freedom from abuse/oppression</SelectItem>
                <SelectItem value="protection">Protection from enemies</SelectItem>
                <SelectItem value="abundance">Financial abundance</SelectItem>
                <SelectItem value="love">Love and relationships</SelectItem>
                <SelectItem value="health">Health and healing</SelectItem>
                <SelectItem value="wisdom">Wisdom and knowledge</SelectItem>
                <SelectItem value="business">Success in business</SelectItem>
                <SelectItem value="spiritual">Spiritual development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Specific Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your specific intention..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div>
            <Label htmlFor="timeFrame">Time Frame</Label>
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Next 30 days</SelectItem>
                <SelectItem value="60">Next 60 days</SelectItem>
                <SelectItem value="90">Next 90 days</SelectItem>
                <SelectItem value="180">Next 6 months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleFindElections}
            className="w-full bg-primary text-white hover:bg-blue-700"
            disabled={findElectionsMutation.isPending}
          >
            {findElectionsMutation.isPending ? "Finding Elections..." : "Find Optimal Elections"}
          </Button>

          {/* Recommended Spirits */}
          {recommendedSpirits && recommendedSpirits.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Recommended Spirits</h3>
              <div className="space-y-2">
                {recommendedSpirits.slice(0, 3).map((spirit: any) => (
                  <div key={spirit.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      {spirit.name} ({spirit.virtues[0]})
                    </span>
                    <Badge className="bg-gray-100 text-gray-800">{spirit.planet}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Election Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-star mr-3 text-primary"></i>
            Optimal Elections
          </CardTitle>
        </CardHeader>
        <CardContent>
          {elections && Array.isArray(elections) && elections.length > 0 ? (
            <div className="space-y-4">
              {elections.map((election: any, index: number) => (
                <div
                  key={election.id || index}
                  className={`border rounded-lg p-4 ${getScoreBorder(election.score)}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getScoreNumber(election.score)}`}>
                        {index + 1}
                      </div>
                      <span className="font-semibold">{getScoreLabel(election.score)}</span>
                    </div>
                    <Badge className={getScoreColor(election.score)}>
                      Score: {election.score}/100
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium">
                        {new Date(election.date).toLocaleDateString()} at {election.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Moon Phase:</span>
                      <span className="font-medium">{election.moonPhase}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Planetary Hour:</span>
                      <span className="font-medium">{election.planetaryHour}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Key Aspect:</span>
                      <span className="font-medium">{election.keyAspect}</span>
                    </div>
                  </div>
                  <p className={`text-xs mt-3 p-2 rounded ${getScoreBorder(election.score).replace('border-', 'bg-').replace('-200', '-100')}`}>
                    {election.justification}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <i className="fas fa-calendar-alt text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-500 font-medium">Select a goal to find optimal elections</p>
              <p className="text-sm text-gray-400 mt-2">Elections will be calculated based on astrological conditions</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}