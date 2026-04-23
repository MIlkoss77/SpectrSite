import { useState } from "react";
import { Link } from "react-router";
import { Mail, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { trpc } from "@/providers/trpc";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general" as "general" | "support" | "partnership" | "billing",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createContact = trpc.contact.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "general", message: "" });
    },
    onError: (err) => {
      setErrors({ submit: err.message });
    },
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.message.trim() || formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    createContact.mutate(formData);
  };

  return (
    <main className="relative z-10 pt-[72px]">
      <section className="min-h-[calc(100dvh-72px)] flex items-center px-6 py-20">
        <div className="max-w-[1000px] mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Left Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-1 rounded-full bg-[#00FFFF]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#00FFFF]/60">
                Get in Touch
              </span>
            </div>
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold text-white tracking-[-0.015em] mb-4">
              Let&apos;s talk.
            </h2>
            <p className="text-base text-white/50 leading-relaxed mb-8">
              Questions about Spectr Trading? Want to partner? We&apos;re here.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 text-[#00FFFF]" />
                support@spectr.trading
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Clock className="w-4 h-4 text-[#00E396]" />
                Usually within 2 hours
              </div>
              <Link
                to="/messages"
                className="flex items-center gap-3 text-sm text-[#00FFFF] hover:text-[#00E396] transition-colors mt-6"
              >
                <MessageSquare className="w-4 h-4" />
                View admin messages
              </Link>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="md:col-span-3">
            <div className="bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.08] rounded-2xl p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-12 h-12 text-[#00E396] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Message sent.</h3>
                  <p className="text-sm text-white/50">We&apos;ll be in touch.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-[#00FFFF] hover:text-[#00E396] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className={`w-full bg-white/[0.03] border ${errors.name ? "border-red-500" : "border-white/[0.08]"} rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#00FFFF]/50 transition-colors`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className={`w-full bg-white/[0.03] border ${errors.email ? "border-red-500" : "border-white/[0.08]"} rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#00FFFF]/50 transition-colors`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value as typeof formData.subject })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-[#00FFFF]/50 transition-colors"
                    >
                      <option value="general">General</option>
                      <option value="support">Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="billing">Billing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What's on your mind?"
                      rows={5}
                      className={`w-full bg-white/[0.03] border ${errors.message ? "border-red-500" : "border-white/[0.08]"} rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#00FFFF]/50 transition-colors resize-none`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {errors.submit && <p className="text-xs text-red-500">{errors.submit}</p>}

                  <button
                    type="submit"
                    disabled={createContact.isPending}
                    className="w-full bg-[#00FFFF] text-[#050505] font-semibold text-sm py-3.5 rounded-lg hover:bg-[#00E396] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {createContact.isPending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
