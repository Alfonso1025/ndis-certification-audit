import type { Metadata } from "next";
import ComplaintsFormPage from "@/components/ComplaintsFormPage";

export const metadata: Metadata = {
  title: "Make a Complaint",
  description:
    "Submit a complaint about your NDIS supports. You can remain anonymous. Your complaint will not affect your services.",
};

export default function Page() {
  return <ComplaintsFormPage />;
}
