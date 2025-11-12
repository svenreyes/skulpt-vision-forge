// Form types
export interface ContactFormValues {
  name: string;
  email: string;
  projectName: string;
  projectLink: string;
  stage: string;
  investmentLevel: string;
  whyNow: string;
  biggestChallenges: string[];
}

export type ContactFieldKey = keyof ContactFormValues;

export type FieldErrors = Partial<Record<ContactFieldKey, string>>;

export type TouchedFields = Record<ContactFieldKey, boolean>;

// 3D types
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface ThreeSceneProps {
  position?: Position3D;
  positionMd?: Position3D;
}

