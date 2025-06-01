import React from "react";

const Substack = () => {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-4xl px-4 z-20">
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-10 tracking-tight text-left w-full">
          Join the Newsletter
        </h2>
        <div className="flex flex-col gap-10 md:gap-14 w-full">
          <div className="group relative flex items-stretch rounded-xl transition-all duration-300 border border-neutral-200 hover:shadow-xl hover:bg-white/70 w-full overflow-hidden">
            {/* Accent bar */}
            <span
              className="absolute left-0 top-0 h-full w-1 rounded-full"
              style={{ background: "#2C7A7B", opacity: 0.22 }}
            />
            <div className="flex flex-col justify-center pl-6 pr-4 py-8 w-full">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-900">
                  Stay Updated
                </h3>
                <p className="text-neutral-600 text-lg">
                  Subscribe to receive my latest thoughts, insights, and updates
                  directly in your inbox.
                </p>
                <a
                  href="https://shrit.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-full bg-black/5 text-neutral-700 font-semibold text-base tracking-wide border border-black/10 shadow-sm backdrop-blur-md hover:bg-sky-400 hover:text-white hover:border-sky-400 hover:shadow-lg transition-all duration-200 w-fit mt-2"
                >
                  Subscribe to Newsletter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Substack;
