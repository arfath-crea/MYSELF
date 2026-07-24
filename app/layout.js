import './globals.css';

export const metadata = {
  title: 'Arfath Developer | Portfolio',
  description: 'A polished portfolio experience blending immersive 3D visuals with modern web design.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
