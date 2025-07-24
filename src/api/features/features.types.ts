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
}

export type TFeature = {
  id: string;
  title: string;
  description: string;
  featureType: FeatureType;
  projectId: string;
  ownerId: string;
}

export type TUpdateFeatureDto = Partial<TCreateFeatureDto> & TDeleteFeatureDto

export type TDeleteFeatureDto = {
  id: string;
  projectId: string;
}