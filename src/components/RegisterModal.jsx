import Register from "../pages/Register";
import { useNavigate } from "react-router-dom";

export default function RegisterModal({ onClose }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl h-[90%]  w-full max-w-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => navigate(-1)}
        >
          ✖
        </button>

        <Register insideModal={true} onClose={onClose} />
      </div>
    </div>
  );
}
