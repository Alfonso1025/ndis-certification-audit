import type { Metadata } from "next";
import PoliciesPage from "@/components/PoliciesPage";

export const metadata: Metadata = {
  title: "Policy Library",
  description:
    "Our policies are reviewed regularly, held to the NDIS Practice Standards, and available to every participant, family member, and support coordinator.",
};

export default function Page() {
  return <PoliciesPage />;
}
