const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 p-6">
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © {new Date().getFullYear()} All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
