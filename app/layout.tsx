import type { Metadata } from "next";
import { DM_Serif_Display, Atkinson_Hyperlegible } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import Navbar from "@/components/Navbar";
import FloatingToolbar from "@/components/FloatingToolbar";
import Footer from "@/components/Footer";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NDIS Provider – Daily Activities Home Care",
  description: "NDIS registered provider dedicated to daily activities and home care support.",
};

// Runs synchronously before React hydrates, restoring saved accessibility
// settings to the <html> element so there is no flash of unstyled content.
// Must be plain JS — no module imports, no JSX.
const RESTORE_A11Y = `
(function () {
  try {
    var p = JSON.parse(localStorage.getItem('a11y-prefs') || '{}');
    var el = document.documentElement;
    if (p.fontScale) el.style.setProperty('--font-scale', String(p.fontScale));
    if (p.highContrast)  el.classList.add('high-contrast');
    if (p.dyslexiaFont)  el.classList.add('dyslexia-font');
    if (p.reduceMotion)  el.classList.add('reduce-motion');
  } catch (_) {}
}());
`.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${atkinsonHyperlegible.variable}`}
    >
      <head>
        {/* Blocking script — no async/defer — must fire before first paint */}
        <script dangerouslySetInnerHTML={{ __html: RESTORE_A11Y }} />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <AccessibilityProvider>
            <Navbar />
            <FloatingToolbar />
            {children}
            <Footer />
          </AccessibilityProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
