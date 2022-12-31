import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const tabs = ["Phim", "Tv show"];
const TabItem = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className="window">
      <nav>
        <ul className="flex mb-5 gap-x-4">
          {tabs.map((item, index) => (
            <motion.li
              key={index}
              className={item === selectedTab ? "selected" : ""}
              onClick={() => setSelectedTab(item)}
            >
              {item}
              {item == selectedTab ? (
                <motion.div
                  className="h-1 underline bg-red-400"
                  layoutId="underline"
                />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main>
        {/* <AnimatePresence exitBeforeEnter>
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab ? selectedTab.icon : "😋"}
          </motion.div>
        </AnimatePresence> */}
      </main>
    </div>
  );
};

export default TabItem;
