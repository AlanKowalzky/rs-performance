export interface Country {
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  cca3: string; // Unikalny kod kraju, który będzie używany jako klucz
}

export type SortDirection = 'asc' | 'desc';

export type SortField = 'name' | 'population';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}
