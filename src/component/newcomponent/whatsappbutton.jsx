import React from "react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919314346148"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 lg:bottom-20 right-10 lg:right-20 lg:w-20 lg:h-20 h-14 w-14 z-50"
    >
      <img
        src="/whatsapp2.png"
        alt="WhatsApp"
        className="w-full h-full rounded-xl shadow-lg transition-transform transform hover:scale-110"
      />
    </a>
  );
};

export default WhatsAppButton;
