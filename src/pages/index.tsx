import { Todo } from "@/components";
import { todosApi } from "@/services/todosApi";
import { wrapper } from "@/store";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <Todo data={data ?? []} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const page = context.query._start ?? 0;
    const res = await store.dispatch(todosApi.endpoints.todos.initiate(page));
    const data = res?.isSuccess ? res?.data : [];

    // Pass data to the page via props
    return {
      props: {
        data,
      },
    };
  }
) satisfies GetServerSideProps<{}>;

export default Home;
