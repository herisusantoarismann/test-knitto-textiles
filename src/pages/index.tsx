import { todosApi, useTodosQuery } from "@/services/todosApi";
import { wrapper } from "@/store";
import { ITodo } from "@/types/todos";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="mx-auto max-w-screen-xl">
      {data.map((item: ITodo, index: number) => {
        return (
          <div key={index}>
            <p>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const res = await store.dispatch(todosApi.endpoints.todos.initiate(0));
    const data = res?.isSuccess ? res?.data : [];

    // Pass data to the page via props
    return { props: { data } };
  }
) satisfies GetServerSideProps<{ data: ITodo[] }>;

export default Home;
