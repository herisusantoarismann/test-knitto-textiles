import { ITodo } from "@/types/todos";
import Status from "./Status";

interface IProps {
  data: ITodo;
}

const Item = ({ data }: IProps) => {
  return (
    <li className="p-3 lg:px-4 lg:py-5 shadow rounded-lg flex justify-between gap-4">
      <div className="flex flex-col gap-1 lg:gap-2">
        <p className="lg:text-xl font-semibold">{data.title}</p>
        <Status status={data.completed} />
      </div>
    </li>
  );
};

export default Item;
