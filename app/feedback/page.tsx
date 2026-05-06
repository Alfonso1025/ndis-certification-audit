import type { Metadata } from "next";
import FeedbackPage from "@/components/FeedbackPage";

export const metadata: Metadata = {
  title: "Share Your Feedback",
  description:
    "Share your experience with our NDIS home care services. Your feedback directly improves the supports we deliver.",
};

export default function Page() {
  return <FeedbackPage />;
}
