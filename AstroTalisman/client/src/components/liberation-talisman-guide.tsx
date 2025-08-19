import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LiberationTalismanGuide() {
  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <span className="mr-3">⚡</span>
            Talisman for Freedom from Abuse
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-purple-900 mb-2">Recommended Design Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-purple-800">Primary Spirit: Oya</p>
                <p className="text-purple-700">Fierce warrior goddess of transformation and liberation</p>
              </div>
              <div>
                <p className="font-medium text-purple-800">Secondary Spirit: Ogun</p>
                <p className="text-purple-700">Iron warrior for protection and justice</p>
              </div>
              <div>
                <p className="font-medium text-purple-800">Shape: Triangle or Star</p>
                <p className="text-purple-700">Dynamic shapes for breakthrough energy</p>
              </div>
              <div>
                <p className="font-medium text-purple-800">Colors: Purple, Red, Black</p>
                <p className="text-purple-700">Transformation, strength, protection</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-purple-900 mb-2">Essential Symbols</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-purple-100 text-purple-800">⚡ Liberation</Badge>
              <Badge className="bg-red-100 text-red-800">♂ Mars - Strength</Badge>
              <Badge className="bg-blue-100 text-blue-800">♃ Jupiter - Justice</Badge>
              <Badge className="bg-gray-100 text-gray-800">🗝️ Freedom Key</Badge>
              <Badge className="bg-orange-100 text-orange-800">⛓️‍💥 Breaking Chains</Badge>
              <Badge className="bg-purple-100 text-purple-800">🛡️ Protection Shield</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-purple-900 mb-2">Sacred Numbers</h3>
            <div className="flex gap-2">
              <Badge className="bg-purple-100 text-purple-800">9 - Completion & Liberation</Badge>
              <Badge className="bg-red-100 text-red-800">7 - Spiritual Power</Badge>
              <Badge className="bg-blue-100 text-blue-800">3 - Dynamic Action</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-purple-900 mb-2">Optimal Creation Timing</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Best Day:</span> Tuesday (Mars day) or Wednesday (Mercury day for communication)</p>
              <p><span className="font-medium">Best Moon Phase:</span> New Moon for fresh starts, or Waning Moon to banish abuse</p>
              <p><span className="font-medium">Best Hour:</span> Hour of Mars for strength, or Hour of Jupiter for justice</p>
              <p><span className="font-medium">Planetary Aspects:</span> Mars trine Jupiter, any strong Mars aspects to personal planets</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-purple-900 mb-2">Materials & Construction</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Base:</span> Purple cloth or iron disc</p>
              <p><span className="font-medium">Ink:</span> Black ink mixed with iron filings (for strength)</p>
              <p><span className="font-medium">Thread:</span> Silver or purple thread for sewing edges</p>
              <p><span className="font-medium">Stone:</span> Hematite or black tourmaline for grounding protection</p>
              <p><span className="font-medium">Blessing:</span> Anoint with protection oil (frankincense, dragon's blood, black pepper)</p>
            </div>
          </div>

          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Activation Prayer</h3>
            <p className="text-sm text-purple-800 italic">
              "Oya, fierce goddess of winds and storms, I call upon your power to break all chains that bind me. 
              Ogun, warrior of iron and justice, lend me your strength to defend my boundaries. 
              By Mars I claim my power, by Jupiter I invoke justice, by the sacred numbers 9-7-3 I seal this work. 
              Let this talisman be a shield against all abuse, a key to my freedom, and a lightning bolt that shatters oppression. 
              As I will it, so it is done."
            </p>
          </div>

          <div className="text-xs text-purple-600 bg-purple-50 p-3 rounded">
            <p className="font-medium mb-1">Important Note:</p>
            <p>This talisman is a spiritual tool to support your journey to freedom. Always prioritize practical safety measures, 
            seek appropriate help from professionals, and remember that you deserve safety, respect, and love.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}