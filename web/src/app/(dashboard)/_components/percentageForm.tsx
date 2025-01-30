import { sendPercentageData } from "@/app/services/requestService";
import { useState } from "react";

interface PercentageFormProps {
  selectedIds: string[];
}


const PercentageForm: React.FC<PercentageFormProps> = ({ selectedIds }) => {
  const [percentage, setPercentage] = useState<number>(0);
  const [type, setType] = useState<"positive" | "negative" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === null) {
      alert("Select the type (Positive or Negative)");
      return;
    }

    const jsonData = {
      percent: percentage,
      modify: type,
      ids: selectedIds.map(id => id),
    };

    try {
      const result = await sendPercentageData(jsonData);

      if (result) {
        alert("Data send sucessfully! Verify your email address");
      } else {
        alert("Fail to send data.");
      }
    } catch (error) {
      console.error('Fail to send data:', error);
      alert('Fail to send data.');
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white flex items-end space-x-4">
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Percentage</label>
            <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="p-0 border rounded  w-full"
            placeholder="Digite a porcentagem"
            />
        </div>

        <div className="flex items-end space-x-2">
            <button
            type="button"
            className={`px-2 py-0 text-sm rounded border-2 ${
                type === "positive" ? "bg-indigo-600 text-white" : "border-indigo-600 text-indigo-600"
            } hover:bg-indigo-700 hover:text-white focus:outline-none`}
            onClick={() => setType("positive")}
            >
            Positive
            </button>

            <button
            type="button"
            className={`px-2 py-0 text-sm rounded border-2 ${
                type === "negative" ? "bg-red-600 text-white" : "border-red-600 text-red-600"
            } hover:bg-red-700 hover:text-white focus:outline-none`}
            onClick={() => setType("negative")}
            >
            Negative
            </button>
        </div>

        <button
            type="submit"
            className="bg-blue-600 text-white px-2 py-0 rounded hover:bg-blue-700"
        >
            Enviar
        </button>
        </form>

  );
};

export default PercentageForm;
