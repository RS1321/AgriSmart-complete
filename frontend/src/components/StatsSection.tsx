import { motion } from "framer-motion";
import { BarChart3, Globe, Leaf, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: BarChart3,
    value: "99%",
    label: "Prediction Accuracy",
    description: "Using Random Forest Classifier",
  },
  {
    icon: Leaf,
    value: "22+",
    label: "Crop Types",
    description: "Supported crop recommendations",
  },
  {
    icon: Globe,
    value: "7",
    label: "Parameters Analyzed",
    description: "N, P, K, pH, Temp, Humidity, Rainfall",
  },
  {
    icon: TrendingUp,
    value: "AI",
    label: "Powered by Gemini",
    description: "Intelligent farming assistance",
  },
];

const StatsSection = () => {
  return (
    <section id="features" className="py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Field-Tested. <span className="text-primary">Farmer-Approved.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our AI model is trained on comprehensive agricultural data to provide
            accurate and reliable crop recommendations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="stat-card group hover:shadow-soft transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-serif text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
