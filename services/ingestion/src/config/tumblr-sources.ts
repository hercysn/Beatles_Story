export type TumblrSourceConfig = {
  blogIdentifier: string;
  title: string;
  enabled: boolean;
  reliabilityTier: 1 | 2 | 3 | 4 | 5;
  defaultLimit: number;
  rightsNotes: string;
};

export const tumblrSources: TumblrSourceConfig[] = [];

export function getEnabledTumblrSources() {
  return tumblrSources.filter((source) => source.enabled);
}
