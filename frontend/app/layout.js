import './globals.css';

export const metadata = {
  title: 'Burns Wedding',
  description: 'Join us for our big day!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Lora:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="vine-layer vine-layer--top" aria-hidden="true"></div>
        <div className="vine-layer vine-layer--bottom" aria-hidden="true"></div>
        <div className="vine-frame">
          {children}
        </div>
      </body>
    </html>
  );
}
