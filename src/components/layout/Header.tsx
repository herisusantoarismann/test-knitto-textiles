const Header = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-4 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Todo App
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
