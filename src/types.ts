export interface Skill {
  id: string;
  name: string;
  proficiency: number; // 1-10 scale
}

export interface LearningMaterial {
  id: string;
  title: string;
  type: 'video' | 'article' | 'interactive';
  url: string;
  duration?: number; // in minutes
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number; // percentage
}

export interface Module {
  id: string;
  title: string;
  description: string;
  materials: LearningMaterial[];
  quiz: Quiz;
  isLocked: boolean;
}

export interface CareerPath {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
  modules: Module[];
}

export interface UserProgress {
  completedModules: string[]; // array of module IDs  currentPathId?: string;
}