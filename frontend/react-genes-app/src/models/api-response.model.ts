import { Gene } from './gene.model';

export type ApiResponse = {
  items: Array<Gene>;
  total: number;
  page: number;
  page_size: number;
  pages: number;
};
