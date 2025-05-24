import React from "react";

interface NewsletterProps {
  className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 relative group ${className}`}>
      <input
        type="email"
        placeholder="Join my cool newsletter..."
        className="px-6 py-3 w-80 border-2 border-gray-300 rounded-full focus:outline-none focus:border-[#37517b] transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md focus:shadow-lg"
      />
      <button
        className="px-8 py-3 bg-[#37517b] text-white rounded-full hover:bg-[#6B46C1] transition-all duration-300 font-medium shadow-sm hover:shadow-md active:scale-95 relative overflow-hidden group-hover:translate-x-1"
        onClick={() => {
          alert("Subscribe to my cool newsletter!");
        }}
      >
        Let's Go
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
      </button>
    </div>
  );
};

export default Newsletter;
