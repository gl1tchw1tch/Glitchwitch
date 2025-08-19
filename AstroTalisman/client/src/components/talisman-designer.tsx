import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import TalismanCanvas from "@/lib/talisman-canvas";
import LiberationTalismanGuide from "./liberation-talisman-guide";

type DesignElement = {
  shape: string;
  color: string;
  symbols: string[];
  numbers: number[];
  materials: string[];
};

export default function TalismanDesigner() {
  const [design, setDesign] = useState<DesignElement>({
    shape: "circle",
    color: "red",
    symbols: [],
    numbers: [],
    materials: ["Iron"]
  });

  const canvasRef = useRef<any>(null);

  const shapes = [
    { id: "circle", component: "circle" },
    { id: "triangle", component: "triangle" },
    { id: "square", component: "square" },
    { id: "pentagon", component: "pentagon" },
    { id: "hexagon", component: "hexagon" },
    { id: "star", component: "star" }
  ];

  const colors = [
    { id: "red", value: "#DC2626" },
    { id: "blue", value: "#2563EB" },
    { id: "green", value: "#16A34A" },
    { id: "yellow", value: "#CA8A04" },
    { id: "purple", value: "#9333EA" },
    { id: "black", value: "#000000" }
  ];

  const symbols = [
    { id: "mars", symbol: "♂", name: "Mars - Strength" },
    { id: "venus", symbol: "♀", name: "Venus - Love" },
    { id: "sun", symbol: "☉", name: "Sun - Power" },
    { id: "moon", symbol: "☽", name: "Moon - Protection" },
    { id: "jupiter", symbol: "♃", name: "Jupiter - Justice" },
    { id: "saturn", symbol: "♄", name: "Saturn - Boundaries" },
    { id: "mercury", symbol: "☿", name: "Mercury - Communication" },
    { id: "liberation", symbol: "⚡", name: "Liberation" },
    { id: "shield", symbol: "🛡️", name: "Protection" },
    { id: "key", symbol: "🗝️", name: "Freedom" },
    { id: "chains", symbol: "⛓️‍💥", name: "Breaking Chains" },
    { id: "fire", symbol: "🔥", name: "Transformation" }
  ];

  const numbers = [3, 7, 9, 12];

  const handleShapeSelect = (shapeId: string) => {
    setDesign({ ...design, shape: shapeId });
  };

  const handleColorSelect = (colorId: string) => {
    setDesign({ ...design, color: colorId });
  };

  const handleSymbolToggle = (symbolId: string) => {
    const newSymbols = design.symbols.includes(symbolId)
      ? design.symbols.filter(s => s !== symbolId)
      : [...design.symbols, symbolId];
    setDesign({ ...design, symbols: newSymbols });
  };

  const handleNumberToggle = (number: number) => {
    const newNumbers = design.numbers.includes(number)
      ? design.numbers.filter(n => n !== number)
      : [...design.numbers, number];
    setDesign({ ...design, numbers: newNumbers });
  };

  const handleMaterialToggle = (material: string) => {
    const newMaterials = design.materials.includes(material)
      ? design.materials.filter(m => m !== material)
      : [...design.materials, material];
    setDesign({ ...design, materials: newMaterials });
  };

  const handleExportBlueprint = () => {
    const blueprint = {
      design,
      timestamp: new Date().toISOString(),
      format: "AstroTalisman Blueprint v1.0"
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blueprint, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "talisman-blueprint.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleExportPNG = () => {
    if (canvasRef.current) {
      canvasRef.current.exportPNG();
    }
  };

  const handleExportSVG = () => {
    if (canvasRef.current) {
      canvasRef.current.exportSVG();
    }
  };

  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const handleRedo = () => {
    if (canvasRef.current) {
      canvasRef.current.redo();
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
    setDesign({
      shape: "circle",
      color: "red", 
      symbols: [],
      numbers: [],
      materials: ["Iron"]
    });
  };

  const isLiberationFocused = design.symbols.includes("liberation") || design.symbols.includes("key") || design.symbols.includes("chains");

  return (
    <div className="space-y-8">
      {/* Liberation Talisman Guide */}
      {isLiberationFocused && <LiberationTalismanGuide />}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Design Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-palette mr-3 text-primary"></i>
            Design Elements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Shape Selection */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Base Shape</Label>
            <div className="grid grid-cols-3 gap-2">
              {shapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => handleShapeSelect(shape.id)}
                  className={`aspect-square border-2 rounded-lg flex items-center justify-center hover:bg-opacity-20 transition-colors ${
                    design.shape === shape.id
                      ? "border-primary bg-primary bg-opacity-10"
                      : "border-gray-300 hover:border-primary"
                  }`}
                >
                  {shape.id === "circle" && <div className="w-8 h-8 bg-primary rounded-full"></div>}
                  {shape.id === "triangle" && <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gray-400"></div>}
                  {shape.id === "square" && <div className="w-8 h-8 bg-gray-400"></div>}
                  {shape.id === "pentagon" && <div className="w-8 h-8 bg-gray-400" style={{clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"}}></div>}
                  {shape.id === "hexagon" && <div className="w-8 h-8 bg-gray-400" style={{clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)"}}></div>}
                  {shape.id === "star" && <i className="fas fa-star text-gray-400 text-lg"></i>}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Primary Color</Label>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorSelect(color.id)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors ${
                    design.color === color.id
                      ? "border-gray-600"
                      : "border-transparent hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          {/* Symbol Library */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Symbols</Label>
            <div className="grid grid-cols-4 gap-2">
              {symbols.map((symbol) => (
                <button
                  key={symbol.id}
                  onClick={() => handleSymbolToggle(symbol.id)}
                  className={`aspect-square border rounded-lg flex items-center justify-center text-lg transition-colors ${
                    design.symbols.includes(symbol.id)
                      ? "border-primary bg-primary bg-opacity-10"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {symbol.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Numbers */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Sacred Numbers</Label>
            <div className="grid grid-cols-4 gap-2">
              {numbers.map((number) => (
                <button
                  key={number}
                  onClick={() => handleNumberToggle(number)}
                  className={`aspect-square border rounded-lg flex items-center justify-center font-semibold transition-colors ${
                    design.numbers.includes(number)
                      ? "border-primary bg-primary bg-opacity-10"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Recommended Materials</Label>
            <div className="space-y-2 text-sm">
              {["Iron", "Purple cloth backing", "Black ink/paint", "Silver thread", "Hematite stone"].map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={design.materials.includes(material)}
                    onChange={() => handleMaterialToggle(material)}
                    className="text-primary focus:ring-primary"
                  />
                  <span>{material}
                    {material === "Iron" && " (Strength & protection)"}
                    {material === "Purple cloth backing" && " (Transformation)"}
                    {material === "Hematite stone" && " (Grounding & protection)"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canvas Designer */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <i className="fas fa-drafting-compass mr-3 text-primary"></i>
                Talisman Preview
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  onClick={handleUndo}
                  variant="outline"
                  size="sm"
                >
                  <i className="fas fa-undo mr-1"></i>Undo
                </Button>
                <Button
                  onClick={handleRedo}
                  variant="outline"
                  size="sm"
                >
                  <i className="fas fa-redo mr-1"></i>Redo
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  size="sm"
                >
                  <i className="fas fa-trash mr-1"></i>Clear
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Canvas Area */}
            <TalismanCanvas ref={canvasRef} design={design} />

            {/* Design Properties */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Current Design Properties</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Shape:</span>
                  <span className="font-medium ml-2 capitalize">{design.shape}</span>
                </div>
                <div>
                  <span className="text-gray-600">Primary Color:</span>
                  <span className="font-medium ml-2 capitalize">{design.color}</span>
                </div>
                <div>
                  <span className="text-gray-600">Symbols:</span>
                  <span className="font-medium ml-2">
                    {design.symbols.length > 0 ? design.symbols.join(", ") : "None"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Sacred Numbers:</span>
                  <span className="font-medium ml-2">
                    {design.numbers.length > 0 ? design.numbers.join(", ") : "None"}
                  </span>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="mt-6 flex space-x-3">
              <Button
                onClick={handleExportBlueprint}
                className="flex-1 bg-primary text-white hover:bg-blue-700"
              >
                <i className="fas fa-download mr-2"></i>Export Blueprint
              </Button>
              <Button
                onClick={handleExportPNG}
                variant="outline"
                className="flex-1"
              >
                <i className="fas fa-image mr-2"></i>Export PNG
              </Button>
              <Button
                onClick={handleExportSVG}
                variant="outline"
                className="flex-1"
              >
                <i className="fas fa-file-code mr-2"></i>Export SVG
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}