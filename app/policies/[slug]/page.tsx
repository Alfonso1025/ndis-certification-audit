import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PolicyPage from "@/components/PolicyPage";

type SlugConfig = {
  jsonKey: string;
  easyRead: boolean;
  metaTitle: string;
  metaDescription: string;
};

const SLUG_MAP: Record<string, SlugConfig> = {
  "privacy": {
    jsonKey: "privacyPolicy",
    easyRead: true,
    metaTitle: "Privacy Policy",
    metaDescription:
      "How we collect, store, protect, and manage your personal information — and your rights to access and correct it.",
  },
  "complaints-handling": {
    jsonKey: "complaintsPolicy",
    easyRead: true,
    metaTitle: "Complaints Handling Policy",
    metaDescription:
      "How we receive, investigate, and resolve complaints — and how we use them to improve our services.",
  },
  "feedback-and-continuous-improvement": {
    jsonKey: "feedbackPolicy",
    easyRead: true,
    metaTitle: "Feedback and Continuous Improvement Policy",
    metaDescription:
      "How participant feedback enters our quality management system and drives documented improvements.",
  },
  "worker-screening": {
    jsonKey: "workerScreeningPolicy",
    easyRead: false,
    metaTitle: "Worker Screening Policy",
    metaDescription:
      "Our commitment to ensuring every person who works with participants holds a valid NDIS Worker Screening Check.",
  },
  "service-delivery": {
    jsonKey: "serviceDeliveryPolicy",
    easyRead: true,
    metaTitle: "Service Delivery Policy",
    metaDescription:
      "How we assess, plan, deliver, and review your supports at every stage of your time with us.",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = SLUG_MAP[slug];
  if (!config) return { title: "Policy Not Found" };
  return {
    title: config.metaTitle,
    description: config.metaDescription,
  };
}

export function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const config = SLUG_MAP[slug];
  if (!config) notFound();
  return <PolicyPage jsonKey={config.jsonKey} easyRead={config.easyRead} />;
}
