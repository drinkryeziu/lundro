import './globals.css';

export const metadata = {
  title: 'Lundro · Boat rentals on NC lakes',
  description: 'Rent a boat on Lake Norman. Book and pay online.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
