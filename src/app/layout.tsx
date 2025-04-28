import type { Metadata } from "next";
import { Catamaran, Inter, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import WithTransition from "@/animation/pageTransition";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import StoreProvider from "@/redux/storeProvider";
import Script from "next/script";
import { useEffect } from "react";
import TawkToWidget from "@/components/chatTawk";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });
const openSans = localFont({
  src: "../../public/fonts/openSans/OpenSans-VariableFont_wdth,wght.ttf",
  variable: "--font-local-open-sans",
});
const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "auto",
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});
export const metadata: Metadata = {
  title: "Octar",
  description: "Learning through Imagination",
  
};
// const catamaran = Catamaran({
//   subsets: ["latin"],
//   display: "auto",
//   variable: "--font-catamaran",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });
// const poppins = Poppins({
//   subsets: ["latin"],
//   display: "auto",
//   variable: "--font-poppins",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const CrispWithNoSSR = dynamic(() => import("../components/chatBot"));
  return (
    <html lang="en" className={`${openSans.className} ${openSans.variable}`}>
      <head>
      <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="lziSOzvWTWFOuMLTTCYvmA"
          strategy="afterInteractive"
        />
        <meta name="google-site-verification" content="Vvvhha5ULuRNSI7KP7PZLKiucU3VQfTRbBPkGw4fwNI" />
      </head>
      <body className={`${openSans.className} ${openSans.variable}`}>
        <ToastContainer />
        {/* <CrispWithNoSSR /> */}

        <WithTransition>
          <StoreProvider>{children}</StoreProvider>
          <Script id="clarity-script" strategy="afterInteractive">
            {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "orvc3qelk8");
          `}
          </Script>
          <GoogleAnalytics gaId="G-VWY0773N6D" />
        </WithTransition>
      </body>
    </html>
  );
}
