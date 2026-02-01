import { motion } from "framer-motion";
import { Bot, Send, User, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "How do I improve soil nitrogen levels?",
  "Best practices for rice cultivation?",
  "How to manage crop pests organically?",
  "When is the best time to plant wheat?",
];

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI Agronomist, powered by advanced AI. Ask me anything about farming, crops, soil management, or agricultural best practices. I'm here to help you grow!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate API call - replace with actual Gemini API call
    setTimeout(() => {
      const responses = [
        "Great question! For optimal crop yield, it's important to maintain balanced NPK levels in your soil. Regular soil testing every 6 months is recommended to track nutrient levels.",
        "Based on your query, I recommend focusing on crop rotation to maintain soil health. This practice helps prevent nutrient depletion and reduces pest buildup.",
        "For sustainable farming, consider implementing drip irrigation systems. They can reduce water usage by up to 60% while improving crop yields significantly.",
        "Organic pest management includes companion planting, neem oil sprays, and introducing beneficial insects. These methods are environmentally friendly and cost-effective.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <section id="ai-assistant" className="py-24 bg-forest">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-white/80 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            Powered by Google Gemini
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            Your AI <span className="text-accent">Agronomist</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Get personalized farming advice, crop care guides, and expert answers to all your agricultural questions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-dark rounded-3xl p-6 md:p-8"
        >
          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto mb-6 space-y-4 scrollbar-thin">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" ? "bg-accent" : "bg-primary"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-5 h-5 text-forest" />
                  ) : (
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.role === "user"
                      ? "bg-accent text-forest"
                      : "bg-white/10 text-white"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="bg-white/10 p-4 rounded-2xl">
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="px-3 py-1.5 text-xs font-medium text-white/70 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about crops, soil, weather, or farming tips..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/40 border border-white/10 focus:outline-none focus:border-accent/50 transition-colors"
            />
            <Button
              type="submit"
              variant="accent"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="h-12 w-12"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAssistant;
