export interface ITodo {
  userId?: Number;
  id?: Number;
  title: string | number | readonly string[] | undefined;
  completed: Boolean;
}
