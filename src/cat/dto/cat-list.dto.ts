import { Cat } from '../entities/cat.entity';

export class CatList {
  page: number;
  limit: number;
  cats: Cat[];
  total: number;
}
