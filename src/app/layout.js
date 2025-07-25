// src/app/layout.js

import '../styles/globals.css'; // Optional, if using global styles

export const metadata = {
  title: 'Employee of the Month',
  description: 'Nominate and celebrate top performers!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}