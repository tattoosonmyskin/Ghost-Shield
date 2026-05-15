import './globals.css';

export const metadata = {
  title: 'GHOST//SHIELD AUDIT',
  description: 'Deterministic Hardware Fingerprint Poisoning Framework',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#020502]">{children}</body>
    </html>
  );
}
