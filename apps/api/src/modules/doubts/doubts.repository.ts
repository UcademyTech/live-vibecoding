import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { Doubt } from './doubt.schema';

@Injectable()
export class DoubtsRepository extends BaseRepository<Doubt> {
  constructor(@InjectModel(Doubt.name) model: Model<Doubt>) {
    super(model);
  }
}
