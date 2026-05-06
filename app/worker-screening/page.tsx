import type { Metadata } from "next";
import WorkerScreeningPage from "@/components/WorkerScreeningPage";

export const metadata: Metadata = {
  title: "Worker Screening — Our Commitment to Your Safety",
  description:
    "How we screen every support worker before they begin working with participants, and what the NDIS Worker Screening Check involves.",
};

export default function Page() {
  return <WorkerScreeningPage />;
}
