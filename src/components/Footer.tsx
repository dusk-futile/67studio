'use client';

import React from 'react';
import { Globe } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    'Audio Description',
    'Help Center',
    'Gift Cards',
    'Media Center',
    'Investor Relations',
    'Jobs',
    'Terms of Use',
    'Privacy Statement',
    'Legal Notices',
    'Cookie Preferences',
    'Corporate Information',
    'Contact Us',
  ];

  return (
    <footer className="w-full max-w-6xl mx-auto px-4 md:px-12 py-12 md:py-16 text-neutral-500 text-xs space-y-6">
      <div className="flex items-center space-x-2 text-neutral-400">
        <span className="font-bold text-sm text-netflix-red">67studio</span>
        <span>— The Premier Cinematic Streaming Experience</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {footerLinks.map((link) => (
          <a
            key={link}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hover:underline hover:text-neutral-400 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      <div className="pt-2 flex items-center space-x-4">
        <div className="flex items-center space-x-2 border border-neutral-700 px-3 py-1.5 rounded text-neutral-300 hover:border-neutral-500 cursor-pointer">
          <Globe className="w-4 h-4 text-neutral-400" />
          <span className="text-xs">English</span>
        </div>

        <button className="border border-neutral-700 hover:border-neutral-500 text-neutral-400 px-2.5 py-1 text-[11px] rounded">
          Service Code
        </button>
      </div>

      <p className="text-[11px] text-neutral-600">
        © 2026 67studio Entertainment, Inc. Netflix design language recreation. Pluggable API Architecture.
      </p>
    </footer>
  );
}
