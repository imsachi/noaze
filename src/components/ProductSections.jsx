import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ProductDetailsSections({ sections }) {
  return (
    <div className="mt-12 space-y-4">
      {sections.map((section, index) => (
        <SectionItem key={index} section={section} />
      ))}
    </div>
  );
}

function SectionItem({ section }) {
  const [open, setOpen] = useState(false);
  console.log(section);
  return (
    <div className="border-b border-gray-400 rounded shadow-xs bg-white  overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-lg font-medium text-gray-800">
          {section.heading}
        </span>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-gray-600" />
        </motion.div>
      </button>

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-gray-700 leading-relaxed">
              {/* Content text */}
              {section.content && (
                <p className="text-gray-700 whitespace-pre-line">
                  {section.content}
                </p>
              )}

              {/* Subsections */}
              {section.items && (
                <div className="space-y-3">
                  {section.items.map((sub, i) => (
                    <div key={i} className="mt-4">
                      <h4 className="font-semibold text-gray-900">
                        {sub.title}
                      </h4>
                      <p className="text-gray-600 mt-1">{sub.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
