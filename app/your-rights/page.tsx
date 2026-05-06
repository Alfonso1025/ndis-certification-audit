import type { Metadata } from "next";
import YourRightsPage from "@/components/YourRightsPage";

export const metadata: Metadata = {
  title: "Your Rights as an NDIS Participant",
  description:
    "Your rights as an NDIS participant receiving supports from our service. Every right listed here is guaranteed under the NDIS Practice Standards.",
};

export default function Page() {
  return <YourRightsPage />;
}
