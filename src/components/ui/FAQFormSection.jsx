import { useState } from "react";
import { ChevronDown, Send, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import { content } from "../../data/content";

export default function FAQFormSection() {
  const { faq } = content;
  const [activeFaq, setActiveFaq] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Website Development",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Work email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid work email";
    }
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.message.trim()) errs.message = "Please share project details or goals";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 600);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <section
      id="faq-section"
      className="site-section bg-gradient-to-b from-[#040814] via-[#060D24] to-[#040814] text-white"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,180,255,0.1)_0%,transparent_70%)] blur-[90px] pointer-events-none z-0" />

      <div className="site-container relative z-10">
        {/* Two Columns with 64px gap (gap-16), stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Accordion FAQ */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/30 text-[#00B4FF] text-xs font-bold tracking-widest uppercase mb-4 w-fit shadow-[0_0_15px_rgba(0,180,255,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{faq.badge}</span>
            </div>

            <h2 className="font-['Cinzel'] text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase mb-3">
              {faq.heading}
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#CBD5E1] font-normal mb-8 leading-relaxed">
              {faq.subheading}
            </p>

            {/* Accordion List with 12px gap (gap-3) */}
            <div className="flex flex-col gap-3">
              {faq.items.map((item, index) => {
                const isOpen = activeFaq === index;
                const questionId = `faq-q-${index}`;
                const answerId = `faq-a-${index}`;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                      isOpen
                        ? "bg-[#0A1530]/85 border-[#00B4FF] shadow-[0_0_20px_rgba(0,180,255,0.2)]"
                        : "bg-[#0A1530]/35 border-white/10 hover:border-[#2E7BFF]/40"
                    }`}
                  >
                    <button
                      type="button"
                      id={questionId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
                    >
                      <span className="font-['Cinzel'] text-base md:text-lg font-bold text-white">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#00B4FF] shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div
                        id={answerId}
                        role="region"
                        aria-labelledby={questionId}
                        className="p-5 text-sm md:text-base text-[#CBD5E1] font-normal leading-relaxed border-t border-white/10"
                      >
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Inquiry Form */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1530]/75 border border-[#2E7BFF]/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,180,255,0.15)]">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00B4FF]/20 border border-[#00B4FF] flex items-center justify-center text-[#00B4FF] mb-6 shadow-[0_0_30px_rgba(0,180,255,0.5)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-['Cinzel'] text-2xl md:text-3xl font-black text-white mb-3">
                    INQUIRY RECEIVED
                  </h3>
                  <p className="text-sm md:text-base text-[#CBD5E1] max-w-sm leading-relaxed mb-6">
                    Thank you, {formData.name}. Our Growth Director has received your specifications and will respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        service: "Website Development",
                        message: "",
                      });
                    }}
                    className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#040814] border border-[#00B4FF]/40 hover:border-[#00B4FF] transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="flex flex-col mb-1">
                    <span className="text-xs font-bold tracking-widest uppercase text-[#00B4FF] mb-1">
                      Direct Growth Inquiry
                    </span>
                    <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-white">
                      REQUEST A PROPOSAL
                    </h3>
                  </div>

                  {/* Name Input with px-4 py-3 */}
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="inquiry-name"
                      name="name"
                      type="text"
                      placeholder="e.g. Alexander Vance"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "inquiry-name-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-[#040814]/90 border text-white placeholder-white/30 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#00B4FF] focus:border-[#00B4FF] ${
                        errors.name ? "border-red-500" : "border-white/15"
                      }`}
                    />
                    {errors.name && (
                      <span id="inquiry-name-error" className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="inquiry-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-2"
                      >
                        Work Email *
                      </label>
                      <input
                        id="inquiry-email"
                        name="email"
                        type="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "inquiry-email-error" : undefined}
                        className={`w-full px-4 py-3 rounded-xl bg-[#040814]/90 border text-white placeholder-white/30 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#00B4FF] focus:border-[#00B4FF] ${
                          errors.email ? "border-red-500" : "border-white/15"
                        }`}
                      />
                      {errors.email && (
                        <span id="inquiry-email-error" className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="inquiry-phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "inquiry-phone-error" : undefined}
                        className={`w-full px-4 py-3 rounded-xl bg-[#040814]/90 border text-white placeholder-white/30 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#00B4FF] focus:border-[#00B4FF] ${
                          errors.phone ? "border-red-500" : "border-white/15"
                        }`}
                      />
                      {errors.phone && (
                        <span id="inquiry-phone-error" className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Service Dropdown */}
                  <div>
                    <label
                      htmlFor="inquiry-service"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-2"
                    >
                      Primary Service of Interest
                    </label>
                    <select
                      id="inquiry-service"
                      name="service"
                      value={formData.service}
                      onChange={(e) => handleInputChange("service", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#040814]/90 border border-white/15 text-white text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#00B4FF] focus:border-[#00B4FF] cursor-pointer"
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="SEO / Local SEO">SEO / Local SEO</option>
                      <option value="Social Media Marketing">Social Media Marketing</option>
                      <option value="Professional Shoots">Professional Shoots</option>
                      <option value="Paid Campaigns">Paid Campaigns (Meta/Google/TikTok)</option>
                      <option value="Branding">Branding & Visual Identity</option>
                      <option value="Content & Reels">Content & Viral Reels</option>
                      <option value="Full-Funnel Growth Retainer">Full-Funnel Growth Retainer</option>
                    </select>
                  </div>

                  {/* Message Input: min-height 128px, px-4 py-3 padding, resizable vertically */}
                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-2"
                    >
                      Project Details / Goals *
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your brand, current monthly ad spend or traffic, and target metrics..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "inquiry-message-error" : undefined}
                      className={`w-full min-h-[128px] px-4 py-3 rounded-xl bg-[#040814]/90 border text-white placeholder-white/30 text-sm outline-none transition-all duration-300 resize-y focus:ring-2 focus:ring-[#00B4FF] focus:border-[#00B4FF] ${
                        errors.message ? "border-red-500" : "border-white/15"
                      }`}
                    />
                    {errors.message && (
                      <span id="inquiry-message-error" className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2E7BFF] to-[#00B4FF] hover:from-[#00B4FF] hover:to-[#2E7BFF] transition-all duration-300 shadow-[0_0_25px_rgba(0,180,255,0.5)] hover:shadow-[0_0_40px_rgba(0,180,255,0.8)] hover:scale-[1.01] flex items-center justify-center gap-2 mt-2 disabled:opacity-60 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
                  >
                    <span>{isSubmitting ? "Transmitting..." : "Submit Proposal Request"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
