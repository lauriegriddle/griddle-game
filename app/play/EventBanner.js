"use client";
export default function EventBanner() {
  return (
    <div className="max-w-lg mx-auto mb-3 mt-1">
      <a
        href="https://fridaythe13th.heysummit.com/?spc=TSSe8M7I"
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl overflow-hidden shadow-lg border border-amber-500/30 transition-all hover:shadow-xl"
        style={{
          background: "linear-gradient(135deg, #1e1b2e 0%, #2d2540 50%, #1a1520 100%)"
        }}
      >
        <div className="px-4 py-3 text-center">
          <p className="text-amber-300 text-xs font-semibold tracking-wide uppercase mb-1">
            Friday the 13th Summit - March 13-15
          </p>
          <p
            className="text-slate-200 text-sm leading-relaxed"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Letter Griddle is a proud sponsor of the Friday the 13th Summit!
            Delve into the topics of Life, After Life, and the Bridge Between,
            plus play special Letter Griddle puzzles as part of the event.
          </p>
          <p
            className="text-amber-200/70 text-xs italic mt-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Did you know? Friday the 13th occurs one to three times every year. This Friday is one of them!
          </p>
          <p className="text-amber-400 text-xs font-bold mt-2 tracking-wide">
            Register Now
          </p>
        </div>
      </a>
    </div>
  );
}