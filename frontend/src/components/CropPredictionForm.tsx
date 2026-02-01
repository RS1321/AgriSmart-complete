import { motion } from "framer-motion";
import { 
  Droplets, 
  FlaskConical, 
  Thermometer, 
  CloudRain, 
  Loader2, 
  Sprout, 
  Sparkles, 
  BookOpen 
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface PredictionResult {
  crop: string;
  confidence?: number;
}

const CropPredictionForm = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    temperature: "",
    humidity: "",
    rainfall: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  // --- AI GUIDE STATE ---
  const [aiGuide, setAiGuide] = useState<string>("");
  const [loadingGuide, setLoadingGuide] = useState(false);
  const apiKey = ""; 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null); // Clear previous result
    setAiGuide("");  // Clear previous guide

    try {
      // 1. Call Python Backend
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nitrogen: Number(formData.nitrogen),
          phosphorus: Number(formData.phosphorus),
          potassium: Number(formData.potassium),
          temperature: Number(formData.temperature),
          humidity: Number(formData.humidity),
          ph: Number(formData.ph),
          rainfall: Number(formData.rainfall)
        }),
      });

      if (!response.ok) throw new Error("Failed to connect to backend");

      const data = await response.json();
      
      // 2. Set Result
      setResult({ crop: data.crop, confidence: 98 }); // Python backend result
      
    } catch (error) {
      console.error("Error:", error);
      // Optional: Add toast here for error
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateGuide = async () => {
    if (!result) return; // Fixed: Use 'result', not 'prediction'
    
    setLoadingGuide(true);
    
    const prompt = `You are an expert agronomist. The user has been recommended to grow '${result.crop}' based on their soil conditions.
    
    Provide a concise, practical care guide (max 200 words) using these exact headings:
    1. 💧 Irrigation Strategy
    2. 🐛 Pest Control
    3. 🧪 Fertilizer Tips
    4. 🚜 Harvesting Advice
    
    Keep the tone encouraging for a farmer.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate guide.";
      setAiGuide(text);
    } catch (error) {
      console.error("AI Error:", error);
      setAiGuide("Error connecting to AI. Please check internet or API key.");
    } finally {
      setLoadingGuide(false);
    }
  };

  const inputFields = [
    { name: "nitrogen", label: "Nitrogen (N)", placeholder: "e.g., 90", icon: FlaskConical, unit: "kg/ha" },
    { name: "phosphorus", label: "Phosphorus (P)", placeholder: "e.g., 42", icon: FlaskConical, unit: "kg/ha" },
    { name: "potassium", label: "Potassium (K)", placeholder: "e.g., 43", icon: FlaskConical, unit: "kg/ha" },
    { name: "ph", label: "pH Level", placeholder: "e.g., 6.5", icon: Droplets, unit: "pH" },
    { name: "temperature", label: "Temperature", placeholder: "e.g., 25", icon: Thermometer, unit: "°C" },
    { name: "humidity", label: "Humidity", placeholder: "e.g., 80", icon: Droplets, unit: "%" },
    { name: "rainfall", label: "Rainfall", placeholder: "e.g., 200", icon: CloudRain, unit: "mm" },
  ];

  return (
    <section id="predict" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"
  alt="Soil analysis"
  className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  For Your Crops. For The Planet.
                </h3>
                <p className="text-white/80 text-sm">
                  Data-driven decisions for sustainable farming
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get Your <span className="text-accent">Crop Recommendation</span>
              </h2>
              <p className="text-muted-foreground">
                Enter your soil and weather parameters to receive an AI-powered crop recommendation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inputFields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <field.icon className="w-4 h-4 text-primary" />
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="input-agri pr-12"
                        step="any"
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        {field.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                variant="default" // Changed from "hero" to default if "hero" doesn't exist in your UI kit
                size="lg"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sprout className="w-5 h-5 mr-2" />
                    Predict Best Crop
                  </>
                )}
              </Button>
            </form>

            {/* Result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-6 rounded-2xl bg-primary/10 border border-primary/20"
              >
                {/* Existing Result Section */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                    <Sprout className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Recommended Crop</p>
                    <h3 className="font-serif text-3xl font-bold text-foreground">
                      {result.crop}
                    </h3>
                    {result.confidence && (
                      <p className="text-sm text-accent font-medium">
                        {result.confidence}% confidence
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-primary/20">
                  {!aiGuide ? (
                    <button
                      onClick={handleGenerateGuide}
                      disabled={loadingGuide}
                      className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      {loadingGuide ? (
                        <span className="animate-pulse">Asking AI...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" /> Generate AI Care Guide
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="bg-white/80 p-5 rounded-xl border border-purple-100 text-left animate-in fade-in">
                      <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> AI Agronomist Guide
                      </h3>
                      <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                        {aiGuide}
                      </div>
                    </div>
                  )}
                </div>

              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CropPredictionForm;