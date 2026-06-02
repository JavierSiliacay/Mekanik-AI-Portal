export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  badge?: string;
  description: string;
  details: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ComparisonRow {
  feature: string;
  mekanik: {
    supported: boolean;
    text: string;
  };
  generic: {
    supported: boolean;
    text: string;
  };
}

export interface DevProject {
  title: string;
  description: string;
  tags: string[];
  role: string;
}

export interface VersionInfo {
  version: string;
  size: string;
  date: string;
  compatibility: string;
  apkName: string;
  releaseNotes: string[];
}

export interface DiagnosticTestCase {
  id: string;
  title: string;
  category: "OBD-II" | "Multimodal" | "Visual" | "Symptom";
  input: string;
  imageType?: "dashboard" | "engine" | "sparkplug";
  response: string;
}
