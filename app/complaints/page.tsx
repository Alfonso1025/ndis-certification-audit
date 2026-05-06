import type { Metadata } from "next";
import ComplaintsPage from "@/components/ComplaintsPage";

export const metadata: Metadata = {
  title: "How to Make a Complaint",
  description:
    "How to make a complaint about your NDIS supports. You can complain to us or directly to the NDIS Commission at any time.",
};

export default function Page() {
  return <ComplaintsPage />;
}
