import { useState } from "react";
import InputField from "./components/Input";
import { toast } from "react-toastify";
import { SUPPORTED_TYPES } from "./constant";
import capitalize from "lodash/capitalize";
import { IComponent, IEditElement } from "./interface";
import { getComponent, getComponentObj } from "./helper/getComponentObj";

function App() {
  const [componentList, setComponentList] = useState<IComponent[]>([]);
  const handleSubmit = (type: string) => {
    if (
      !SUPPORTED_TYPES.find((val) => val?.toLowerCase() === type?.toLowerCase())
    ) {
      toast.error("Invalid type", { position: "top-center", autoClose: 1000 });
      return;
    }
    const parsedType = capitalize(type);
    setComponentList([...componentList, getComponentObj(parsedType)]);
    toast.success(`Added ${parsedType}`, {
      position: "top-center",
      autoClose: 1000,
    });
  };

  const handleEdit: IEditElement = (
    identifier,
    type,
    value,
    props,
    childrenNodes
  ) => {
    const index = componentList.findIndex(
      (component) => component.identifier === identifier
    );
    if (index === -1) {
      toast.error("Invalid identifier", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
    const newList = [...componentList];
    newList[index].value = value;
    newList[index].props = { ...newList[index].props, ...props };
    newList[index].childrenNodes = childrenNodes;
    setComponentList(newList);
  };

  const onSave = () => {
    window.confirm(
      `Creating Api Request with Data ${JSON.stringify(componentList)}`
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <InputField
        onSubmit={handleSubmit}
        autoCompleteValues={SUPPORTED_TYPES}
      />
      <div className="flex flex-wrap justify-center mt-10">
        {componentList.map((component) => {
          return getComponent(component, handleEdit);
        })}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onSave}
      >
        Save Configuration
      </button>
    </div>
  );
}

export default App;
