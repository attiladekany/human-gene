import { Gene } from './gene.model';

export type ApiResponse = {
  items: Array<Gene>;
  total: number;
  page_index: number;
  page_size: number;
  pages: number;
};
