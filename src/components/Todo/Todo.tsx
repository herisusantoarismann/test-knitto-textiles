import Pagination from "../Pagination";
import Item from "./Item";

import { ITodo } from "@/types/todos";

interface IProps {
  data: ITodo[] | [];
}

const Todo = ({ data }: IProps) => {
  return (
    <>
      <ul className="flex flex-col gap-4">
        {data.map((item: ITodo, index: number) => {
          return <Item data={item} key={index} />;
        })}
      </ul>
      <div className="mt-4 flex justify-end">
        <Pagination />
      </div>
    </>
  );
};

export default Todo;
