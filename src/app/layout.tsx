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
          {/* Meta Pixel */}
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1377677380553276');
                fbq('track', 'PageView');
              `,
            }}
          />
          {/* TikTok Pixel */}
          <Script
            id="tiktok-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function (w, d, t) {
                  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
                  ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                  ttq.load('D9FKE2BC77UA9BUUDBNG');
                  ttq.page();
                }(window, document, 'ttq');
              `,
            }}
          />
          <GoogleAnalytics gaId="G-VWY0773N6D" />
        </WithTransition>
      </body>
    </html>
  );
}
