import { FC, PropsWithChildren, useRef, useState } from "react";
import { IComponent, IEditElement } from "../../interface";
import { Tooltip, Modal } from "@chakra-ui/react";
import ListEditModal from "./ListEditModal";
import { COMPONENT_TYPE } from "@/constant";

export interface IListField extends PropsWithChildren {
  identifier: string;
  childrenNodes?: IComponent[];
  onEdit: IEditElement;
}
const ListField: FC<IListField> = ({
  children,
  onEdit,
  identifier,
  childrenNodes,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const handleDoubleClick = () => {
    setOpenModal(true);
  };
  const onSaveClick = (newListItems: IComponent[]) => {
    onEdit(identifier, COMPONENT_TYPE.LIST, "", {}, newListItems);
  };
  return (
    <div className="flex gap-10 w-full items-center justify-center relative">
      <Tooltip label="Double Click to edit">
        <ul
          className="cursor-text list-disc py-5"
          onDoubleClick={handleDoubleClick}
        >
          {children}
        </ul>
      </Tooltip>
      <ListEditModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        childrenListItems={childrenNodes || []}
        parentIdentifier={identifier}
        onSaveClick={onSaveClick}
      />
    </div>
  );
};

export default ListField;
