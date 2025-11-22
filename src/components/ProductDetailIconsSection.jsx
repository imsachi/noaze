import return_policy_icon from "../assets/vector-design-return-policy.PNG";
import warranty_icon from "../assets/warranty.png";
import cod_icon from "../assets/cod.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function InfoIconsSection() {
  const [selected, setSelected] = useState(null);

  const items = [
    {
      id: "return",
      label: "Return Policy",
      icon: return_policy_icon,
      description:
        "You can return products within 7 days if unused and in original condition.",
    },
    {
      id: "warranty",
      label: "Warranty",
      icon: warranty_icon,
      description:
        "This product comes with a 6‑month warranty covering manufacturing defects.",
    },
    {
      id: "cod",
      label: "Cash on Delivery",
      icon: cod_icon,
      description:
        "Pay after delivery with our secure Cash on Delivery option.",
    },
  ];

  return (
    <div className="flex items-center justify-around border border-gray-200 bg-gray-50 p-4 rounded-2xl h-36  relative ">
      <AnimatePresence>
        {selected === null &&
          items.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => setSelected(item)}
              className="flex flex-col items-center space-y-1 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img src={item.icon} alt={item.label} className="w-8 h-8" />
              <span className="text-xs font-bold text-gray-600 ">
                {item.label}
              </span>
            </motion.button>
          ))}
      </AnimatePresence>

      {/* Selected Section */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="details"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-start p-4 space-y-2"
          >
            <button onClick={() => setSelected(null)} className="text-sm ">
              <ArrowRight />
            </button>

            <motion.h3 className=" text-xs font-bold border-0">
              <img
                src={selected.icon}
                alt={selected.label}
                className="w-8 h-8"
              />
            </motion.h3>

            <motion.div
              className=" bg-black "
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
            />

            <p className="text-sm text-gray-700">{selected.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
