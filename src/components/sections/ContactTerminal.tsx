import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { copyToClipboard } from '../../utils/helpers';
import { soundManager } from '../../utils/audio';
import { Mail, Phone, Copy, Check, Send, MessageSquare } from 'lucide-react';

export const ContactTerminal: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState<string[]>([
    "CONNECTED TO YOKESH S DIRECT COMMUNICATION LINE",
    "STATUS: AVAILABLE FOR ML / DATA SYSTEMS ENGINEERING OPPORTUNITIES",
    "TYPE 'email', 'phone', OR USE THE FORM BELOW TO SEND A MESSAGE"
  ]);

  const handleCopy = async (text: string, field: string) => {
    soundManager.playClick();
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2500);
    }
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliInput.trim()) return;
    soundManager.playClick();
    const cmd = cliInput.trim().toLowerCase();
    const newHistory = [...cliHistory, `> ${cliInput}`];

    if (cmd === 'help') {
      newHistory.push("AVAILABLE COMMANDS: 'email', 'phone', 'github', 'linkedin', 'clear', 'status'");
    } else if (cmd === 'email') {
      newHistory.push(`EMAIL: ${portfolioData.personal.email}`);
    } else if (cmd === 'phone') {
      newHistory.push(`PHONE: ${portfolioData.personal.phone}`);
    } else if (cmd === 'github') {
      newHistory.push(`GITHUB: ${portfolioData.personal.github}`);
    } else if (cmd === 'linkedin') {
      newHistory.push(`LINKEDIN: ${portfolioData.personal.linkedin}`);
    } else if (cmd === 'status') {
      newHistory.push("STATUS: READY TO ENGAGE IN PRODUCTION ML & DATA ROLES");
    } else if (cmd === 'clear') {
      setCliHistory([]);
      setCliInput('');
      return;
    } else {
      newHistory.push(`UNKNOWN COMMAND: '${cmd}'. TYPE 'help' FOR ASSISTANCE.`);
    }

    setCliHistory(newHistory);
    setCliInput('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSwitch();
    const mailtoUrl = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(
      subject || "Inquiry for Yokesh S"
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        code="// 07. COMMUNICATION LOUNGE"
        title="Get in Touch"
        subtitle="Direct channel for machine learning engineering opportunities, data architecture roles, and technical collaborations."
        badge="OPEN FOR INQUIRIES"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info & Quick Query Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="cyber-panel p-6 rounded-3xl border-slate-200/90 relative overflow-hidden bg-white/85 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4 text-xs font-mono-tech">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-beacon" />
                <span className="font-semibold text-slate-800">Direct Comms Relay</span>
              </div>
              <span className="text-indigo-600 font-medium">ONLINE</span>
            </div>

            {/* Quick Query Log */}
            <div className="h-40 overflow-y-auto space-y-1.5 font-mono-tech text-xs text-slate-600 pr-1 scrollbar-thin bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
              {cliHistory.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.startsWith('>')
                      ? 'text-indigo-900 font-bold'
                      : line.includes('STATUS')
                      ? 'text-emerald-700 font-medium'
                      : 'text-slate-600'
                  }
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Interactive Query Input */}
            <form onSubmit={handleCliSubmit} className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-indigo-600 font-mono-tech text-xs font-bold">$</span>
              <input
                type="text"
                placeholder="type 'email', 'phone', 'status'..."
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                className="w-full bg-transparent border-none font-mono-tech text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </form>
          </div>

          {/* Quick Direct Telemetry Cards */}
          <div className="space-y-2.5">
            {/* Email */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono-tech text-slate-400 uppercase font-semibold">Direct Email</div>
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="text-xs font-mono-tech text-slate-800 hover:text-indigo-600 font-medium transition-colors"
                  >
                    {portfolioData.personal.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(portfolioData.personal.email, 'email')}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                title="Copy Email"
                data-cursor="COPY"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono-tech text-slate-400 uppercase font-semibold">Phone Contact</div>
                  <a
                    href={`tel:${portfolioData.personal.phone}`}
                    className="text-xs font-mono-tech text-slate-800 hover:text-indigo-600 font-medium transition-colors"
                  >
                    {portfolioData.personal.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(portfolioData.personal.phone, 'phone')}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                title="Copy Phone"
                data-cursor="COPY"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm flex items-center gap-2.5 text-xs font-mono-tech text-slate-700 hover:text-indigo-600 transition-all shadow-2xs"
                data-cursor="GITHUB"
              >
                <GithubIcon className="w-4 h-4 text-slate-900" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm flex items-center gap-2.5 text-xs font-mono-tech text-slate-700 hover:text-indigo-600 transition-all shadow-2xs"
                data-cursor="LINKEDIN"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-600" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Message Dispatch Form */}
        <div className="lg:col-span-7">
          <div className="cyber-panel p-6 sm:p-8 rounded-3xl border-slate-200/90 relative overflow-hidden bg-white/85 shadow-sm">
            <div className="border-b border-slate-200 pb-4 mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                  <span>Send a Direct Message</span>
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-1">
                  Transmits directly to Yokesh's inbox.
                </p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-tech text-slate-700 mb-1.5 font-semibold">
                  SUBJECT:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ML Systems Engineer Opportunity / Collaboration"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm text-slate-900 placeholder-slate-400 font-mono-tech focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-slate-700 mb-1.5 font-semibold">
                  MESSAGE:
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Hello Yokesh, we reviewed your work on hazardous substance detection with YOLOv9/ResNet and VIKI Tamil Voice Assistant..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm text-slate-900 placeholder-slate-400 font-mono-tech focus:outline-none transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] font-mono-tech text-slate-500">
                  RECIPIENT: <span className="text-indigo-800 font-bold">{portfolioData.personal.email}</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  data-cursor="SEND"
                >
                  <span>Dispatch Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
