import { FormEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, Send, X, Minus, Upload, Loader2, CheckCircle } from 'lucide-react';

type ChatMessage = {
  id: string;
  role: 'agent' | 'user';
  text: string;
  fileUrl?: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'agent',
    text: '👋 Welcome to OPCIEAS!\n\nHello! I\'m the OPCIEAS AI Assistant. I can help you with our products, government tender furniture, export services, quotations, and company information.',
  },
];

const quickQuestions = [
  'Product Inquiry',
  'Tender Inquiry',
  'Export Inquiry',
  'Quotation',
  'Dealer',
  'Distributor',
];

function getAIResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes('hello') || msg.includes('hi')) {
    return 'Hello! Welcome to OPCIEAS. How can I help you today?';
  }

  if (msg.includes('product') || msg.includes('manufacture') || msg.includes('what do you make')) {
    return 'OPCIEAS manufactures Office Furniture, Educational Furniture, Hospital Furniture, Industrial Storage, Hostel Furniture, Auditorium Chairs, Stadium Chairs, Play Equipment and Commercial Furniture.';
  }

  if (msg.includes('export')) {
    return 'Yes, OPCIEAS supplies products across India and international markets.';
  }

  if (msg.includes('quote') || msg.includes('quotation') || msg.includes('price') || msg.includes('get a quote')) {
    return 'Certainly. Please click the Request Quote button or share your requirements here.';
  }

  if (msg.includes('minimum') || msg.includes('moq')) {
    return 'We mainly handle bulk orders for institutions, government projects and exports.';
  }

  if (msg.includes('location') || msg.includes('where are you') || msg.includes('located') || msg.includes('factory') || msg.includes('head office')) {
    return 'Bangalore, Karnataka, India';
  }

  if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('sales')) {
    return 'Phone: +91 9845579049\nEmail: opcieas.opcieas4@gmail.com';
  }

  if (msg.includes('tender') || msg.includes('government')) {
    return 'Yes, OPCIEAS specialises in government tender furniture supply.';
  }

  if (msg.includes('catalogue') || msg.includes('catalog') || msg.includes('download')) {
    return 'Sure! You can request a catalogue from our team or download from our website.';
  }
  if (msg.includes('dealer') || msg.includes('distributor') || msg.includes('partner')) {
    return 'We support distributor and dealer partnerships. Please share your region and product interest and our team will follow up.';
  }
  if (msg.includes('certification') || msg.includes('certified') || msg.includes('iso')) {
    return 'OPCIEAS maintains high quality standards and is ISO certified.';
  }

  return 'Thank you for your query. Our sales team will contact you shortly.';
}

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [agentTyping, setAgentTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
  });
  const [uploadingFile, setUploadingFile] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setAgentTyping(true);

    // Check if we need to show lead form
    const keywords = ['quote', 'quotation', 'bulk', 'tender', 'export', 'dealer'];
    const needsLeadForm = keywords.some((k) => trimmed.toLowerCase().includes(k));

    window.setTimeout(() => {
      const aiResponse = getAIResponse(trimmed);
      const agentMessage: ChatMessage = {
        id: `agent-${Date.now()}`,
        role: 'agent',
        text: aiResponse,
      };
      setMessages((prev) => [...prev, agentMessage]);

      if (needsLeadForm) {
        setShowLeadForm(true);
      }

      setAgentTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = async (question: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setAgentTyping(true);

    window.setTimeout(() => {
      const aiResponse = getAIResponse(question);
      const agentMessage: ChatMessage = {
        id: `agent-${Date.now()}`,
        role: 'agent',
        text: aiResponse,
      };
      setMessages((prev) => [...prev, agentMessage]);

      // Check if we need to show lead form
      const keywords = ['quote', 'quotation', 'bulk', 'tender', 'export', 'dealer'];
      const needsLeadForm = keywords.some((k) => question.toLowerCase().includes(k));
      if (needsLeadForm) {
        setShowLeadForm(true);
      }

      setAgentTyping(false);
    }, 1000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    setTimeout(() => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        text: `Uploaded file: ${file.name}`,
      };
      setMessages((prev) => [...prev, userMessage]);
      console.log('Demo mode: File uploaded', file.name);
      setUploadingFile(false);
    }, 1000);
  };

  const handleLeadSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Demo mode: Lead submitted', leadForm);
    setLeadSubmitted(true);
  };

  return (
    <>
      <AnimatePresence>
        {minimized && !open && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            type="button"
            onClick={() => setOpen(true)}
            className="fixed bottom-20 right-4 z-[910] flex min-h-[64px] w-[min(92vw,360px)] items-center justify-between gap-3 rounded-3xl border border-white/10 bg-[#081526]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#E8C766] to-[#B8932B] text-navy shadow-[0_10px_30px_rgba(212,175,55,0.35)]">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-white">Live Chat</p>
                <p className="text-xs text-white/70">Tap to continue your conversation.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMinimized(false)}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {!open && (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setMinimized(false);
          }}
          className="fixed bottom-20 right-6 z-[910] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E8C766] text-navy shadow-[0_18px_40px_rgba(212,175,55,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(212,175,55,0.45)]"
          aria-label="Open live chat"
        >
          <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#E8C766]/20" />
          <MessageSquare className="relative h-7 w-7" />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-20 right-4 z-[910] w-[min(92vw,420px)] rounded-[28px] border border-white/10 bg-[#091828]/95 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">AI Live Chat</p>
                <p className="text-xs text-white/60">Powered by OPCIEAS</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setMinimized(true);
                  }}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10"
                  aria-label="Minimize chat"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setMinimized(false);
                  }}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex max-h-[58vh] flex-col gap-4 overflow-hidden rounded-[24px] border border-white/10 bg-[#0F1C35]/90 p-4 shadow-inner">
              <div className="flex flex-col gap-3 overflow-y-auto pr-1" style={{ maxHeight: 'calc(58vh - 120px)' }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-3xl px-4 py-3 text-sm shadow-[0_10px_30px_rgba(0,0,0,0.18)] ${
                      message.role === 'agent'
                        ? 'self-start bg-white/10 text-white'
                        : 'self-end bg-gradient-to-br from-[#D4AF37]/15 to-[#E8C766]/15 text-white'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                    {message.fileUrl && (
                      <a
                        href={message.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs text-[#D4AF37]"
                      >
                        📎 View Attachment
                      </a>
                    )}
                  </div>
                ))}
                {agentTyping && (
                  <div className="self-start rounded-3xl bg-white/10 px-4 py-3 text-sm text-white/80">
                    Typing...
                  </div>
                )}

                {/* Quick Questions */}
                {messages.length === 1 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {quickQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickQuestion(q)}
                        className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white border border-white/10 hover:bg-white/10 transition"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Lead Form */}
                {showLeadForm && !leadSubmitted && (
                  <div className="self-start rounded-3xl bg-white/10 px-4 py-3 text-sm text-white">
                    <h4 className="font-semibold mb-2">Please fill in your details:</h4>
                    <form onSubmit={handleLeadSubmit} className="space-y-2">
                      <input
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="Name *"
                        className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 transition focus:ring-[#D4AF37]"
                      />
                      <input
                        value={leadForm.companyName}
                        onChange={(e) => setLeadForm({ ...leadForm, companyName: e.target.value })}
                        placeholder="Company Name"
                        className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 transition focus:ring-[#D4AF37]"
                      />
                      <input
                        required
                        type="email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        placeholder="Email *"
                        className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 transition focus:ring-[#D4AF37]"
                      />
                      <input
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        placeholder="Phone Number"
                        className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 transition focus:ring-[#D4AF37]"
                      />
                      <input
                        value={leadForm.country}
                        onChange={(e) => setLeadForm({ ...leadForm, country: e.target.value })}
                        placeholder="Country"
                        className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 transition focus:ring-[#D4AF37]"
                      />
                      <button
                        type="submit"
                        className="w-full rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E8C766] px-4 py-2 text-sm font-semibold text-navy hover:brightness-110 transition"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                )}

                {leadSubmitted && (
                  <div className="self-start rounded-3xl bg-green-500/10 px-4 py-3 text-sm text-white flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Thank you! Our sales team will contact you shortly.
                  </div>
                )}

                <div ref={scrollRef} />
              </div>

              <form onSubmit={handleSend} className="mt-2 flex items-center gap-3 rounded-3xl bg-[#0F1C35]/90 p-3">
                <label className="cursor-pointer">
                  <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg,.dwg,.dxf" onChange={handleFileUpload} disabled={uploadingFile} />
                  <div className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition">
                    {uploadingFile ? <Loader2 className="h-4 w-4 text-white/70 animate-spin" /> : <Upload className="h-4 w-4 text-white/70" />}
                  </div>
                </label>
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-3xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#E8C766] text-navy transition hover:brightness-110"
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
