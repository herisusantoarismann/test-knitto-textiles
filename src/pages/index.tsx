import { todosApi, useTodosQuery } from "@/services/todosApi";
import { wrapper } from "@/store";
import { ITodo } from "@/types/todos";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.map((item: ITodo, index: number) => {
        return (
          <div key={index}>
            <p>{item.title}</p>
          </div>
        );
      })}
    </main>
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
