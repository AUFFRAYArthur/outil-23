import { FileText, BarChart3, Banknote, Users, FileInput, Presentation } from 'lucide-react';

export const projectData = {
  projectName: "Transmission SCOP 'Innov&Co'",
  editor: "Cabinet AuditPlus",
  date: new Date(),
  recipients: "Comité de pilotage, Dirigeant, Salariés",
};

export let keyMetrics = {
  employeeEngagement: 78,
  securedFinancing: 350000,
  totalFinancing: 500000,
  stepsCompleted: 4,
  totalSteps: 7,
};

export const updateKeyMetrics = (updates: Partial<typeof keyMetrics>) => {
  keyMetrics = { ...keyMetrics, ...updates };
};

export const updateProjectData = (updates: Partial<typeof projectData>) => {
  Object.assign(projectData, updates);
};

export const updateAnalysis = (updates: Partial<typeof analysis>) => {
  Object.assign(analysis, updates);
};

export const updateDocuments = (updates: typeof documents) => {
  documents.splice(0, documents.length, ...updates);
};

export const updateNextSteps = (updates: typeof nextSteps) => {
  nextSteps.splice(0, nextSteps.length, ...updates);
};
export const documents = [
  { id: 1, title: "Diagnostic initial", status: "completed", icon: FileText },
  { id: 2, title: "Évaluation de l’entreprise", status: "completed", icon: BarChart3 },
  { id: 3, title: "Plan de financement provisoire", status: "completed", icon: Banknote },
  { id: 4, title: "Analyse organisationnelle", status: "in_progress", icon: Users },
  { id: 5, title: "Retours des entretiens salariés", status: "completed", icon: FileInput },
  { id: 6, title: "Lettres d’intention bancaires", status: "pending", icon: Presentation },
];

export const analysis = {
  strengths: [
    "Forte cohésion d'équipe et motivation des salariés.",
    "Savoir-faire unique et reconnu sur le marché.",
    "Carnet de commandes stable pour les 12 prochains mois.",
    "Premiers accords de principe obtenus de partenaires bancaires.",
  ],
  vigilancePoints: [
    "Dépendance à un client majeur (35% du CA).",
    "Nécessité de renforcer les compétences en gestion/finance.",
    "Le plan de financement n'est pas encore bouclé.",
    "Certains salariés clés hésitent encore à investir.",
  ],
};

export const nextSteps = [
    { id: 1, task: "Finaliser le tour de table financier", deadline: "3 semaines", completed: false },
    { id: 2, task: "Rédiger les statuts définitifs de la SCOP", deadline: "5 semaines", completed: false },
    { id: 3, task: "Organiser la formation des futurs associés", deadline: "6 semaines", completed: false },
    { id: 4, task: "Préparer l'assemblée générale constitutive", deadline: "8 semaines", completed: false },
];
