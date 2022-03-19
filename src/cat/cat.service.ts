import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortDirerction } from 'src/enum/sort-direction.enum';
import { DeleteResult, Repository } from 'typeorm';
import { CatList } from './dto/cat-list.dto';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const sameIdCats = await this.catRepository
      .createQueryBuilder()
      .where('cat_id = :cat_id', { cat_id: createCatDto.catId })
      .getCount();

    if (sameIdCats > 0) {
      throw new HttpException('Id is duplicated', HttpStatus.BAD_REQUEST);
    }

    const newCat = new Cat();
    newCat.name = createCatDto.name;
    newCat.weight = createCatDto.weight;
    newCat.breed = createCatDto.breed;
    newCat.cat_id = createCatDto.catId;
    const res = await this.catRepository.save(newCat);
    return res;
  }

  async findAll(
    searchName?: string,
    sortBy?: string,
    sortDirection?: SortDirerction,
    page = 1,
    limit = 20,
  ): Promise<CatList> {
    page = page <= 0 ? 1 : page;
    const offset = (page - 1) * limit;
    let query = await this.catRepository.createQueryBuilder();
    if (searchName) {
      query = query.where('name LIKE :name', { name: `%${searchName}%` });
    }
    const cats = await query
      .orderBy(sortBy ? sortBy : 'name', sortDirection ? sortDirection : 'ASC')
      .offset(offset)
      .limit(limit)
      .getMany();

    const total = await this.catRepository.count();

    return { page, limit, cats, total };
  }

  async findOne(catId: string): Promise<Cat> {
    const cat = await this.catRepository
      .createQueryBuilder()
      .where('cat_id = :cat_id', { cat_id: catId })
      .getOne();

    if (!cat) {
      throw new HttpException('Invalid cat id', HttpStatus.BAD_REQUEST);
    }

    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = await this.catRepository
      .createQueryBuilder()
      .where('id = :id', { id: id })
      .getOne();

    if (!cat) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    cat.name = updateCatDto.name;
    cat.cat_id = updateCatDto.catId;
    cat.breed = updateCatDto.breed;
    cat.weight = updateCatDto.weight;

    const updated = await this.catRepository.save(cat);
    return updated;
  }

  async remove(id: number): Promise<DeleteResult> {
    const res = await this.catRepository.delete(id);
    return res;
  }

  async removeByCatId(catId: string): Promise<DeleteResult> {
    const res = await this.catRepository
      .createQueryBuilder()
      .where('cat_id = :cat_id', { cat_id: catId })
      .delete()
      .execute();

    return res;
  }
}
