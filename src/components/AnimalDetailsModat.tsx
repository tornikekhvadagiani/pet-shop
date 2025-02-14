import { useEffect, useState } from "react";
import { useDolarToGel } from "../customHooks/useDolarToGel";

interface AnimalDetailsProps {
  name: string;
  priceUSD: number;
  description: string;
  isPopular: boolean;
  stock: number;
  onClose: () => void;
}

const AnimalDetailsModal: React.FC<AnimalDetailsProps> = ({
  onClose,
  name,
  description,
  priceUSD,
  isPopular,
  stock,
}) => {
  const [gelPrice, setGelPrice] = useState<number>();
  useEffect(() => {
    useDolarToGel().then((rate) => setGelPrice(rate));
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0303036b] bg-opacity-50 z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        {gelPrice ? (
          <>
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500"
              onClick={onClose}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">{name}</h2>
            <p className="text-gray-700">
              <strong>Description:</strong> {description}
            </p>
            <p className="text-gray-700">
              <strong>Aviable Stock:</strong> {stock}
            </p>
            <p className="text-gray-700">
              <strong>Price (USD):</strong> ${priceUSD}
            </p>
            <p className="text-gray-700">
              <strong>Price (GEL):</strong> ₾{(gelPrice * priceUSD).toFixed(2)}
            </p>
            <p
              className={`text-lg font-semibold mt-3 text-center ${
                isPopular ? "text-green-600" : "text-gray-500"
              }`}
            >
              {isPopular ? "🔥 Popular Animal" : "Not Popular"}
            </p>{" "}
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default AnimalDetailsModal;
