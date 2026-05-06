import type { Metadata } from "next";
import ServiceAgreementPage from "@/components/ServiceAgreementPage";

export const metadata: Metadata = {
  title: "Understanding Your Service Agreement",
  description:
    "What a service agreement is, what it must contain, your rights within it, and what happens when things change.",
};

export default function Page() {
  return <ServiceAgreementPage />;
}
