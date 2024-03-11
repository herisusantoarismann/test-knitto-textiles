import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const Pagination = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get("_start") ?? "1");
  const [currentPage, setCurrentPage] = React.useState<number>(initialPage);
  const [pages, setPages] = React.useState<Array<number | string>>([]);
  const totalPage = 10;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [currentPage]
  );

  const handleClick = (value: string | number) => {
    if (typeof value === "string") return;

    setCurrentPage(value);
    router.push(pathName + "?" + createQueryString("_start", value.toString()));
  };

  const generatePagePagination = () => {
    let pages: Array<number | string> = [];

    if (totalPage <= 1) {
      pages.push(1);
      return pages;
    }

    pages.push(1);

    if (totalPage <= 6) {
      for (let i = 2; i <= totalPage; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (currentPage <= 4) {
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPage);
    } else if (currentPage > 4 && currentPage < totalPage - 3) {
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPage);
    } else {
      pages.push("...");
      for (let i = totalPage - 4; i <= totalPage; i++) {
        pages.push(i);
      }
    }

    setPages(() => pages);
  };

  const nextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevState) => prevState + 1);

      router.push(
        pathName +
          "?" +
          createQueryString("_start", (currentPage + 1).toString())
      );
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevState) => prevState - 1);

      router.push(
        pathName +
          "?" +
          createQueryString("_start", (currentPage - 1).toString())
      );
    }
  };

  useEffect(() => {
    generatePagePagination();
  }, [currentPage]);

  return (
    <div className="flex items-center gap-2">
      <button
        className="py-1.5 px-2 border border-black rounded flex items-center hover:bg-gray-900 hover:text-white"
        onClick={prevPage}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
            fill="currentColor"
          />
        </svg>
      </button>

      {pages.map((item: number | string, index: number) => {
        return (
          <button
            key={index}
            className={`py-1 px-2.5 text-xs border border-black rounded flex items-center hover:bg-gray-900 hover:text-white ${
              item === currentPage ? "bg-gray-900 text-white" : ""
            }`}
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        );
      })}

      <button
        className="py-1.5 px-2 border border-black rounded flex items-center hover:bg-gray-900 hover:text-white"
        onClick={nextPage}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
