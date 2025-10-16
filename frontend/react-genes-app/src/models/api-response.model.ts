import { Gene } from './gene.model';

//Todo: rename
export type ApiResponse = {
  items: Array<Gene>;
  total: number;
  page_index: number;
  page_size: number;
  pages: number;
};
