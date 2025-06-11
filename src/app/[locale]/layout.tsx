import ClientProvider from "@/components/VerifyWarning";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <section lang={locale}>
      <ToastContainer />
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </section>
  );
}
