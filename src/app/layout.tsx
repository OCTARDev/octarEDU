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
          {/* <Script id="newChat">
            {`
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    var lang = navigator.language || navigator.userLanguage || "en"; // Fallback to "en" if no language detected
if (!lang) {
		return '000000000001/DEFAULT_WIDGET';
	}

(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/67399ba62480f5b4f59f3ac6/1icsgg12q';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
      s1.setAttribute('data-tawk-language', lang); // Set widget language
s0.parentNode.insertBefore(s1,s0);
})();
          `}
          </Script> */}
          {/* <TawkToWidget /> */}
        </WithTransition>
      </body>
    </html>
  );
}
