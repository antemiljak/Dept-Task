import { motion, AnimatePresence } from "framer-motion";
import Flag from "react-world-flags";

const Countries = ({ countries, changeCountriesList, button }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
      <AnimatePresence mode="popLayout">
        {countries.map((country, index) => (
          <motion.div
            key={country.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            layout
            className="relative aspect-square size-32 bg-zinc-100 rounded-2xl p-2 flex flex-col items-center shadow-lg text-black font-semibold text-sm hover:scale-105 ease-in-out duration-300"
          >
            <Flag code={country.code} className="size-12" />
            <p className="text-center">{country.name}</p>
            <button
              onClick={() => changeCountriesList(country)}
              className="absolute bottom-2 right-2 cursor-pointer text-xl font-bold"
            >
              {button}
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Countries;
