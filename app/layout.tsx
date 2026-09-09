import "./globals.css";
export const metadata = {
  title: "All In One Trust",
  description: "All In One Trust Website"
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
