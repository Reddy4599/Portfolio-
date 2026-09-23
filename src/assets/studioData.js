// Presentation metadata summarizes the existing resume-backed project content.
export const projectStories = {
  "fincore-banking-platform": {
    kind: "banking",
    shortTitle: "FinCore",
    category: "Backend engineering",
    color: "#b8edcf",
    repository: "https://github.com/Reddy4599/fincore-banking-platform",
    problem:
      "Keep account balances and transaction records consistent across transfers, reversals, and repeated requests.",
    architecture: [
      "JWT authentication",
      "NestJS services",
      "Atomic transfers",
      "PostgreSQL ledger",
    ],
    result: "98.61% line coverage",
    resultLabel: "Jest + Supertest + integration tests",
  },
  "xai-health-screening": {
    kind: "health",
    shortTitle: "Explainable health",
    category: "Machine learning / Mobile",
    color: "#c4b7f2",
    repository:
      "https://github.com/Reddy4599/XAI-for-interconnected-chronic-diseases",
    problem:
      "Make early health-risk assessment accessible and interpretable for patients and doctors.",
    architecture: [
      "Python / TensorFlow",
      "TFLite inference",
      "Flutter app",
      "Firebase workflows",
    ],
    result: "4 risk modules",
    resultLabel: "Diabetes, stroke, pneumonia, skin lesions",
  },
  "iot-energy-conservation": {
    kind: "energy",
    shortTitle: "Intelligent energy",
    category: "Computer vision / IoT",
    color: "#edb995",
    problem:
      "Control appliances based on actual room occupancy, with remote visibility and configurable timeouts.",
    architecture: [
      "YOLOv5 detection",
      "Jetson Nano",
      "Timeout logic",
      "Appliance control",
    ],
    result: "Real-time control",
    resultLabel: "Occupancy detection + remote REST APIs",
  },
};

export const systemModules = [
  {
    id: "backend",
    name: "Backend",
    number: "01",
    detail: "APIs, transactions & data",
    color: "#b8edcf",
  },
  {
    id: "intelligence",
    name: "Intelligence",
    number: "02",
    detail: "Models, inference & explainability",
    color: "#c4b7f2",
  },
  {
    id: "edge",
    name: "Edge systems",
    number: "03",
    detail: "Vision, sensing & automation",
    color: "#edb995",
  },
];

export function getSkillEvidence(skill, data) {
  const aliases = {
    JavaScript: ["Node.js"],
    TypeScript: ["NestJS"],
    SQL: ["PostgreSQL"],
    "Machine Learning": ["TensorFlow"],
    Git: ["GitHub Actions"],
    GitHub: ["GitHub Actions"],
  };
  const terms = [skill, ...(aliases[skill] || [])];
  const projects = data.projects.filter((project) =>
    terms.some(
      (term) =>
        project.tech.includes(term) ||
        project.detailsPoints.some((point) => point.includes(term)),
    ),
  );
  if (projects.length)
    return {
      text: `Explore how ${skill} connects to my project work.`,
      projects,
    };
  if (skill === "ServiceNow")
    return {
      text: "Certified System Administrator and Certified Application Developer. View the credentials in the certifications section.",
      section: "certifications",
      label: "Explore certifications",
      projects: [],
    };
  return {
    text: `${skill} is part of my ${data.skills.find((group) => group.items.includes(skill))?.category.toLowerCase()} toolkit, as listed in my resume.`,
    projects: [],
  };
}
