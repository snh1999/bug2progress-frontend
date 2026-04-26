export enum FeatureType {
  MAINTAINED = "MAINTAINED",
  ACTIVE = "ACTIVE",
  OBSOLETE = "OBSOLETE",
  PROPOSED = "PROPOSED",
}

export type TCreateFeatureDto = {
  title: string;
  description: string;
  featureType?: FeatureType;
  projectId: string;
};

export type TFeature = {
  id: string;
  title: string;
  description: string;
  necessaryLinks: string[]
  process?: string | null;
  featureType: FeatureType;
  projectId: string;
  ownerId: string;
  _count: {
    ticket: number;
  }
};

export type TUpdateFeatureDto = Partial<TCreateFeatureDto> & TDeleteFeatureDto;

export type TDeleteFeatureDto = {
  id: string;
  projectId: string;
};
