import { FilterQuery, Model, SortOrder, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<TEntity> {
  protected constructor(protected readonly model: Model<TEntity>) {}

  findAll(filter: FilterQuery<TEntity> = {}, sort: Record<string, SortOrder> = {}): Promise<TEntity[]> {
    return this.model.find(filter).sort(sort).lean<TEntity[]>().exec();
  }

  findById(id: string): Promise<TEntity | null> {
    return this.model.findById(id).lean<TEntity>().exec();
  }

  async create(data: Partial<TEntity>): Promise<TEntity> {
    const created = await this.model.create(data);
    return created.toObject<TEntity>();
  }

  updateById(id: string, update: UpdateQuery<TEntity>): Promise<TEntity | null> {
    return this.model.findByIdAndUpdate(id, update).lean<TEntity>().exec();
  }
}
