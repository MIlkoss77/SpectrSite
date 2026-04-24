import { BookOpen, BrainCircuit, Zap, Lock, PlayCircle } from "lucide-react";

const courses = [
  {
    title: "Dopamine Loops & FOMO Management",
    duration: "45 Min",
    icon: <BrainCircuit className="w-6 h-6 text-[#00FFFF]" />,
    category: "Psychology",
    description: "Understand the neurochemistry of overtrading. Learn how to break the destructive dopamine cycle and regain emotional control.",
    color: "from-[#00FFFF]/20 to-transparent",
    borderColor: "border-[#00FFFF]/20",
  },
  {
    title: "Magnesium L-Threonate: The Anti-Tilt Protocol",
    duration: "30 Min",
    icon: <Zap className="w-6 h-6 text-[#00E396]" />,
    category: "Supplements",
    description: "Discover how this specific form of magnesium crosses the blood-brain barrier to reduce stress and prevent tilt during volatile markets.",
    color: "from-[#00E396]/20 to-transparent",
    borderColor: "border-[#00E396]/20",
  },
  {
    title: "Semax: Peak Focus for Scalping",
    duration: "35 Min",
    icon: <BookOpen className="w-6 h-6 text-purple-400" />,
    category: "Nootropics",
    description: "A deep dive into peptide protocols for achieving laser-like focus and sustained concentration without the jitters of caffeine.",
    color: "from-purple-400/20 to-transparent",
    borderColor: "border-purple-400/20",
  }
];

export default function SpectrAcademy() {
  return (
    <section id="academy" className="relative py-32 px-6 overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FFFF]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00E396]/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00E396] animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wider text-[#00E396]">The Mind</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Spectr <span className="text-[#00E396] glow-green-text">Academy</span>
            </h2>
            <p className="text-white/60">
              Exclusive masterclasses blending advanced trading tactics with cutting-edge biohacking. Because the ultimate edge is you.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white/[0.03] border border-white/10 hover:border-[#00E396]/50 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-[#00E396]/10">
            <Lock className="w-4 h-4 text-[#00E396]" />
            <span>Unlock All Courses</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div 
              key={index}
              className={`glass-panel p-6 rounded-2xl border ${course.borderColor} relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${course.color} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-black/40 backdrop-blur-md">
                    {course.icon}
                  </div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-white/70">
                    {course.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {course.title}
                </h3>
                
                <p className="text-white/50 text-sm mb-6 line-clamp-3">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <span className="text-sm text-white/40 flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" />
                    {course.duration}
                  </span>
                  <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors flex items-center gap-1">
                    Preview
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
