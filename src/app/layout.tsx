import './globals.css';
import '../components/Navbar.css';
import '../components/Hero.css';
import '../components/About.css';
import '../components/Amenities.css';
import '../components/Rooms.css';
import '../components/Gallery.css';
import '../components/BookingModal.css';

export const metadata = {
  title: 'Point of Dev Hotel',
  description: 'Premium Hotel Web Experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
