export interface Note {
  id: string;
  title: string;
  content?: string;
  isdeleted: boolean;
  createdat: string;
  updatedat: string;
}

export interface Setting {
  id: number;
  key: string;
  value: string
}
