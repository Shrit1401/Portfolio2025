export interface Research {
  title: string;
  description: string;
  date: string;
  image: string;
  markdown: string;
  slug: {
    current: string;
  };
}

export interface Work {
  title: string;
  description: string;
  year: number;
  image: string;
  usefullinks?: Array<{
    name: string;
    link: string;
  }>;
}

export interface Past {
  title: string;
  description: string;
  year: string;
}
