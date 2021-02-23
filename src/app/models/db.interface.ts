import {IUser} from './user.interface';
import {ICategory} from './category.interface';
import {IEvent} from './event.interface';

export interface IDb {
  users: IUser[];
  bill: {
    value: number;
    currency: string;
  };
  categories: ICategory[];
  events: IEvent[];
}
