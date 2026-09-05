import { MessagesSquare, ClipboardX, PhoneCall, ReceiptText } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";

/**
 * The operator's day.
 *
 * The old copy here framed the problem as "too many tools" — which is the
 * pitch for replacing every one of them, and every ops director has already
 * survived one rip-and-replace. The real, narrower, truer problem is that the
 * operating data never arrives in a system at all: it arrives as messages, and
 * a person is the integration layer. That framing is what PashX Autopilot
 * actually addresses, and it does not require the buyer to abandon anything.
 */

const PROBLEMS = [
  {
    icon: MessagesSquare,
    title: "The real order book is a chat thread",
    desc: "Confirmations, rate revisions and delivery dates arrive on WhatsApp and email. Nothing that matters starts life as a record.",
  },
  {
    icon: PhoneCall,
    title: "Chasing is a full-time job nobody was hired for",
    desc: "Unconfirmed POs, missing test certificates, silent subcontractors. Someone re-reads the same thread every morning to work out who to nudge.",
  },
  {
    icon: ClipboardX,
    title: "Re-keying is where the errors get in",
    desc: "A quantity typed from a PDF into the ERP, a rate copied from a quote sent three weeks ago. The mistake surfaces at reconciliation, not at entry.",
  },
  {
    icon: ReceiptText,
    title: "Exceptions are found after the money moves",
    desc: "Short delivery, price drift against the quote, a duplicate invoice. All visible in the messages at the time — all caught at month-end.",
  },
];

export default function ProblemSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-slate-50 py-20 md:py-24">
      <Container>
        <div className="reveal mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-brand-green">
            THE OPERATOR&apos;S DAY
          </p>
          <h2 className="mb-5 text-[28px] font-extrabold leading-[1.1] tracking-tight text-brand-navy sm:text-[32px] md:text-[40px]">
            Your team is the{" "}
            <span className="bg-gradient-to-r from-brand-green-mid to-brand-green-light bg-clip-text text-transparent">
              integration layer
            </span>
          </h2>
          <p className="text-base leading-relaxed text-slate-500 md:text-lg">
            Not because the systems are bad — because the work arrives as
            messages, and only a human can read a message, decide what it means,
            and put it somewhere.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {PROBLEMS.map((p, i) => (
            <div
              key={p.title}
              className={`reveal reveal-delay-${(i % 4) + 1} group relative rounded-2xl border border-slate-200/60 bg-white/70 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-brand-green-mid/30 hover:shadow-xl md:p-6`}
            >
              <div className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 transition group-hover:scale-110 md:mb-5 md:h-11 md:w-11">
                <p.icon className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="relative mb-2 text-[15px] font-semibold text-brand-navy">
                {p.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-slate-500">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
