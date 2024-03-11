import React, { ChangeEvent, FormEvent } from "react";
import { Button, Modal, Todo } from "@/components";
import { todosApi, useAddNewTodoMutation } from "@/services/todosApi";
import { wrapper } from "@/store";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ITodo } from "@/types/todos";

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [addNewTodo, response] = useAddNewTodoMutation();

  const [showModal, setShowModal] = React.useState<Boolean>(false);
  const [showAlert, setShowAlert] = React.useState<Boolean>();
  const [formData, setFormData] = React.useState<ITodo>({
    title: "",
    completed: false,
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        title: e.target.value,
      };
    });
  };

  const handleChangeStatus = (value: boolean) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        completed: value,
      };
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    addNewTodo(formData)
      .unwrap()
      .then(() => {
        setShowModal(false);
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      })
      .then(() => {
        // console.log(error);
      });
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex justify-end">
          <Button onPress={openModal}>Add Todo</Button>
        </div>
        <div
          className={`${
            showAlert ? "block" : "hidden"
          } p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400`}
          role="alert"
        >
          <span className="font-medium">Success!</span> Data created
          successfully
        </div>
        <Todo data={data ?? []} />
      </div>

      <Modal show={showModal} onClose={closeModal} title="Add Todos">
        <form
          className="p-4 md:p-5 flex flex-col gap-6"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Title"
              onChange={(e) => handleChangeTitle(e)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Completed
            </label>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <input
                  id="default-radio-1"
                  type="radio"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={formData.completed === true}
                  onChange={() => handleChangeStatus(true)}
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="default-radio-2"
                  type="radio"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={formData.completed === false}
                  onChange={() => handleChangeStatus(false)}
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  No
                </label>
              </div>
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Modal>
    </>
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
