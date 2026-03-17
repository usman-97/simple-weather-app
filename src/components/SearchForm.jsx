import { useState } from "react";
import SearchResultsList from "./SearchResultsList";
import { motion, AnimatePresence } from "motion/react";

const SearchForm = ({
  handleSubmit,
  handleOnChange,
  value = "",
  searchResult = [],
  resetSearchResult,
  handleSelectCity,
}) => {
  const [isClickingButton, setIsClickingButton] = useState(false);

  const handleFocusOut = () => {
    if (!isClickingButton) {
      resetSearchResult();
    }
  };

  return (
    <>
      <form
        className="w-full px-5 relative md:px-0"
        onSubmit={handleSubmit}
        action="POST"
        onBlur={handleFocusOut}
        onMouseDown={() => setIsClickingButton(true)}
        onMouseUp={() => setIsClickingButton(false)}
      >
        <div className="md:flex md:flex-col">
          <div className="flex flex-col md:flex-row md:space-y-0">
            <div className="w-full relative">
              <input
                type="text"
                name="searchCity"
                placeholder="Search City . . ."
                className="w-full pl-5 py-2 bg-off-white text-custom-black text-xl placeholder:text-light-grey rounded-lg focus:outline-2 focus:outline-blue md:rounded-none md:rounded-l-lg"
                onChange={handleOnChange}
                value={value}
              />

              <AnimatePresence>
                {searchResult && searchResult.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <SearchResultsList
                      results={searchResult}
                      handleSelectCity={handleSelectCity}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.input
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9, y: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 50 }}
              type="submit"
              value="Search"
              className="mt-1 py-2 px-5 bg-custom-black text-xl font-medium cursor-pointer rounded-lg hover:bg-light-charcoal transition-colors duration-300 md:mt-0 md:rounded-none md:rounded-r-lg"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
