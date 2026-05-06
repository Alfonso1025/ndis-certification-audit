import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";

type SlugConfig = {
  jsonKey: string;
  metaTitle: string;
  metaDescription: string;
};

const SLUG_MAP: Record<string, SlugConfig> = {
  "daily-personal-care": {
    jsonKey: "dailyPersonalCare",
    metaTitle: "Daily Personal Care",
    metaDescription:
      "Respectful, person-centred support with bathing, showering, dressing, grooming, and personal hygiene delivered in your home.",
  },
  "meal-preparation": {
    jsonKey: "mealPreparation",
    metaTitle: "Meal Preparation and Eating",
    metaDescription:
      "Nutritious, culturally appropriate meals planned and prepared in your kitchen, to your taste and dietary requirements.",
  },
  "domestic-assistance": {
    jsonKey: "domesticAssistance",
    metaTitle: "Domestic Assistance",
    metaDescription:
      "A clean, safe, and comfortable home maintained to your standard — delivered around your routines and preferences.",
  },
  "medication-support": {
    jsonKey: "medicationSupport",
    metaTitle: "Medication Support",
    metaDescription:
      "Safe, documented, and individually planned medication prompting, assistance, and administration for NDIS participants.",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = SLUG_MAP[slug];
  if (!config) return { title: "Service Not Found" };
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
  return <ServicePage jsonKey={config.jsonKey} />;
}
