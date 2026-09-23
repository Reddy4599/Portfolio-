export const portfolioData = {
  name: "Medagam V S Manjunadha Reddy",
  roleCycle: ["Software Engineer", "AI/ML Developer", "Backend Engineer"],
  heroStatement:
    "Technically driven Software Engineer and B.Tech CSE graduate focused on end-to-end software delivery, scalable backend systems, and machine learning pipelines.",
  shortBio:
    "I specialize in building data-driven software products by combining backend architecture, API engineering, and practical AI integration. My work spans RESTful services, database optimization, and deployment of intelligent models to cloud and edge environments for real-world impact.",
  contact: {
    email: "saimanjunadhareddy1309@gmail.com",
    phone: "+91 9121407582",
    location: "Hyderabad, India",
    github: "https://github.com/Reddy4599",
    linkedin: "https://www.linkedin.com/in/manjunadha-reddy-3b5878252",
  },
  profilePhoto: "/images/profile-photo.webp",
  quickStats: [
    { label: "CGPA", value: "8.78/10" },
    { label: "Patent Filed", value: "1" },
    { label: "Certifications", value: "6" },
    { label: "Major Projects", value: "3" },
  ],
  statsObject: {
    profile: "software_engineer",
    cgpa: "8.78/10",
    projectsBuilt: 3,
    internships: 1,
    patentsFiled: 1,
    certifications: 6,
    focus: ["Backend Systems", "Machine Learning", "Data Engineering"],
  },
  skills: [
    {
      category: "Programming Languages",
      items: ["Python", "JavaScript", "TypeScript", "SQL", "C++"],
    },
    {
      category: "Backend and Databases",
      items: [
        "Node.js",
        "NestJS",
        "Express.js",
        "REST APIs",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
      ],
    },
    {
      category: "Data Engineering and AI",
      items: [
        "Machine Learning",
        "Data Pipelines",
        "Feature Engineering",
        "NLP",
      ],
    },
    {
      category: "Tools and Platforms",
      items: ["Git", "GitHub", "Docker", "Firebase", "ServiceNow"],
    },
    {
      category: "Languages",
      items: ["English", "Gujarati", "Telugu", "Tamil", "Hindi"],
    },
  ],
  highlights: [
    "Filed a patent for a Dual Interface Explainable AI system for multi chronic disease risk prediction and clinical validation.",
    "Delivered an Employee Email Database Management System for TANGEDCO with role-based secure access.",
    "Built FinCore, a modular core banking API with JWT authentication, atomic transfers, audit logs, and CI-backed test coverage.",
    "Built an XAI-enabled health screening app across Diabetes, Stroke, Pneumonia, and Skin Lesion risk modules.",
  ],
  patents: [
    {
      title:
        "XAI-Based System for Multi-Chronic Disease Risk Prediction and Clinical Validation",
      status: "Patent Application Filed",
      description:
        "Filed a patent application for an explainable AI system that predicts multiple chronic-disease risks using clinical data, AI models, and clinician validation.",
      impact:
        "Designed interpretable model outputs and patient-friendly explanations to support transparent healthcare decision-making.",
    },
  ],
  timeline: [
    {
      title: "Software Engineer Intern - TANGEDCO",
      date: "Jun 2024 - Jul 2024",
      location: "Chennai, Tamil Nadu",
      type: "experience",
      document: "/certificates/tangedco-internship-certificate.pdf",
      description:
        "Built an Employee Email Database Management System for Tamil Nadu government operations using PHP backend, role-based authentication, and encrypted access controls.",
    },
    {
      title:
        "B.Tech Computer Science and Engineering - SRM IST, Kattankulathur",
      date: "2022 - 2026",
      location: "Kattankulathur, TN | CGPA: 8.78/10",
      type: "education",
      description:
        "Built strong foundations in software engineering, backend systems, databases, data engineering and machine-learning application development.",
    },
    {
      title: "Class XII (CBSE) - The Velammal International School",
      date: "2022",
      location: "Ponneri, TN | Percentage: 80.2%",
      type: "education",
      description:
        "Focused on mathematics, problem solving, and core computing concepts while building early technical project experience.",
    },
    {
      title: "Class X (CBSE) - Divine Child School, Mehsana",
      date: "2020",
      location: "Mehsana, GJ | Percentage: 81.4%",
      type: "education",
      description:
        "Completed foundational schooling with strong academic performance and early interest in technology.",
    },
  ],
  projects: [
    {
      id: "fincore-banking-platform",
      title: "FinCore Banking Platform",
      description:
        "Modular core banking API with JWT authentication, atomic transfers, immutable ledgering, and CI-backed tests.",
      details:
        "Built a modular core banking API supporting JWT authentication, accounts, transfers, statements, reversals, immutable ledgering, idempotent processing, audit logs, and PostgreSQL-backed transactional safety.",
      detailsPoints: [
        "Built a modular core banking API with JWT authentication, accounts, transfers, statements, and reversals.",
        "Implemented an immutable double-entry ledger with atomic transactions, idempotency, audit logs, and row locking.",
        "Achieved 98.61% line coverage using Jest, Supertest, PostgreSQL integration tests, Docker, and GitHub Actions.",
      ],
      tech: ["Node.js", "NestJS", "PostgreSQL", "Docker", "Jest", "Supertest"],
    },
    {
      id: "xai-health-screening",
      title: "XAI-Based Mobile Health Screening System",
      description:
        "Explainable AI mobile platform for early risk assessment of diabetes, stroke, pneumonia, and skin lesion conditions.",
      details:
        "Developed machine-learning models in Python and TensorFlow, deployed them through Flutter and TFLite for on-device inference, and integrated Firebase authentication and cloud synchronization with role-based workflows.",
      detailsPoints: [
        "Developed an Explainable AI mobile platform for early risk assessment of diabetes, stroke, pneumonia, and skin lesion conditions.",
        "Built machine-learning models using Python and TensorFlow and deployed them through Flutter and TFLite for on-device inference.",
        "Integrated Firebase authentication and cloud synchronization with role-based workflows for patients and doctors.",
      ],
      tech: ["Python", "TensorFlow", "Flutter", "TFLite", "Firebase"],
    },
    {
      id: "iot-energy-conservation",
      title: "IoT-Based Automated Energy Conservation System",
      description:
        "Occupancy-based appliance automation system using Jetson Nano, YOLOv5, and Python.",
      details:
        "Engineered an occupancy-based appliance automation system using Jetson Nano, YOLOv5 and Python, with real-time detection, configurable timeout logic and REST APIs for remote monitoring and control.",
      detailsPoints: [
        "Engineered an occupancy-based appliance automation system using Jetson Nano, YOLOv5 and Python.",
        "Automated appliance control using real-time occupancy detection and configurable timeout logic.",
        "Developed REST APIs for remote monitoring and real-time system control.",
      ],
      tech: ["Python", "Jetson Nano", "YOLOv5", "Computer Vision", "REST APIs"],
    },
  ],
  certifications: [
    {
      issuer: "Oracle",
      name: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
      issued: "October 07, 2025",
      validUntil: "October 07, 2027",
      credentialId: "312359890OCI25DSOCP",
      document: "/certificates/oracle-cloud-data-science-professional.pdf",
    },
    {
      issuer: "ServiceNow",
      name: "Certified System Administrator",
      issued: "January 23, 2025",
      credentialId: "26606060",
      document: "/certificates/servicenow-certified-system-administrator.pdf",
    },
    {
      issuer: "Oracle",
      name: "Oracle Agentic AI Certified Foundations Associate",
    },
    {
      issuer: "Oracle",
      name: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
      issued: "September 12, 2025",
      validUntil: "September 12, 2027",
      credentialId: "312359890OCI25DOPOCP",
      document: "/certificates/oracle-cloud-devops-professional.pdf",
    },
    {
      issuer: "ServiceNow",
      name: "Certified Application Developer",
      issued: "May 08, 2025",
      credentialId: "27099443",
      document: "/certificates/servicenow-certified-application-developer.pdf",
    },
    {
      issuer: "NISM",
      name: "SEBI Investor Awareness Certification",
    },
  ],
};
