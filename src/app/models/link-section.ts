export type ExternalLink = {
  label: string;
  url: string;
  icon?: string;
  iconDark?: string;
};

export type LinkSection = {
  title: string;
  links: ExternalLink[];
};
