import { FC, PropsWithChildren, useState } from "react";
import { Input } from "@chakra-ui/react";

interface IInput extends PropsWithChildren {
  onSubmit: (type: string) => void;
  autoCompleteValues?: string[];
}

const InputField: FC<IInput> = ({ onSubmit, autoCompleteValues }) => {
  const [value, setValue] = useState<string>("");
  const [autoCompleteItems, setAutoCompleteItems] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (!e.target.value) {
      setAutoCompleteItems([]);
      return;
    }
    const newAutoCompleteItems = autoCompleteValues?.filter((item) =>
      item.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAutoCompleteItems(newAutoCompleteItems || []);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <div className="flex flex-col justify-center m-9">
      <Input
        width={"50vw"}
        borderColor={"gray.800"}
        placeholder="Enter Element type"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {autoCompleteItems?.length > 0 && (
        <div className=" w-[50vw] bg-white border border-gray-300 rounded-md">
          {autoCompleteItems.map((item) => (
            <div
              key={item}
              className="cursor-pointer capitalize font-semibold text-lg p-2 hover:bg-gray-200"
              onClick={() => {
                onSubmit(item);
                setValue("");
                setAutoCompleteItems([]);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputField;
