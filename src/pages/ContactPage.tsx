import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Phone, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    showToast('Your inquiry has been transmitted to our desk', 'success');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Communications Desk
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-white tracking-tight">
            Contact VEXO
          </h1>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            For licensing inquiries, editorial submissions, model verification lookups, or press relations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Info Side */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#111116] border border-white/5 space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Direct Enquiries</h3>
                  <p className="text-xs text-zinc-400 mt-1">curator@nocturne-arts.example</p>
                  <p className="text-xs text-zinc-400">compliance@nocturne-arts.example</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-white/5">
                <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Records Custodian</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    18 U.S.C. 2257 Records Office<br />
                    100 Studio Way, Suite 400<br />
                    Los Angeles, CA 90028
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#131319] border border-white/5 text-xs text-zinc-400 space-y-2">
              <p className="font-medium text-zinc-200">Urgent Removal or Takedown Notice?</p>
              <p className="text-[11px] leading-relaxed">
                If you are a performer or rights holder requesting expedited removal, please proceed directly to our statutory compliance portal:
              </p>
              <a
                href="/takedown"
                className="inline-block text-[#d4af37] hover:underline font-semibold text-xs pt-1"
              >
                Go to Dedicated Takedown Portal →
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#111116] border border-emerald-500/20 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-editorial text-2xl text-white">Message Transmitted</h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto">
                  Thank you, {formData.name}. Our editorial team has received your communication. For licensing and press, response times typically average within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'general', message: '' });
                  }}
                  className="px-5 py-2 bg-[#d4af37] text-black font-semibold text-xs rounded-lg mt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#111116] border border-white/5 space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-[#17171e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full bg-[#17171e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                    Department / Purpose
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#17171e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="general">General Curatorial Inquiry</option>
                    <option value="licensing">Fine Art Print & Video Licensing</option>
                    <option value="press">Press & Media Accreditation</option>
                    <option value="verification">2257 Model Verification Lookup</option>
                    <option value="technical">Platform Technical Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify details, reference IDs, or project proposal..."
                    className="w-full bg-[#17171e] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#d4af37] hover:bg-[#c49e29] text-black font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/10"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
