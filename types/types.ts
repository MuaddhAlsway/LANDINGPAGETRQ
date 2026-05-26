export interface NavItem {
  id: number;
  label: string;
  href: string;
}

export interface StatusItem {
  id: number;
  value: string;
  label: string;
}

export interface ServiceItem {
  id: number;
  img: string;
  title: string;
}

export interface ProcessItem {
  id: number;
  title: string;
  step: string;
  text: string;
}

export interface BlogItem {
  id: number;
  title: string;
  text: string;
  date: string;
}

export interface FooterItem {
  id: number;
  title: string;
  list: string[];
}
