import type IBaseModel from "./IBaseModel";

interface IUserDbModel extends IBaseModel {
  email: string;
  password: string;
  role: string;
  active: boolean;
  firstName: string;
  lastName: string;
  phone_number: string;
  location: string;
  birth_date: number;
  deleted: boolean;
}

export default IUserDbModel;
