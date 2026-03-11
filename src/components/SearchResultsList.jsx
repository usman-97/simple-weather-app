import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const SearchResultsList = ({ results, handleSelectCity }) => {
  if (!results || results.length === 0) {
    return;
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col absolute px-5 w-full bg-off-white text-custom-black rounded-bl-xl rounded-br-xl z-10"
    >
      {results.map((city, i) => {
        return (
          <motion.button
            key={city.id}
            variants={item}
            className="py-3 text-left hover:font-semibold"
            type="button"
            onClick={() =>
              handleSelectCity(`${city.lat},${city.lon}`, city.name)
            }
          >
            {city.name}, {city.country}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default SearchResultsList;
