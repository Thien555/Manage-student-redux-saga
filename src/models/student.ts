export interface Student {
  id?: number | string;
  name: string;
  age: string;
  mark: number;
  gender: string;
  city: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface listParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: string; //tang dan va giam dan

  [key: string]: any;
}
