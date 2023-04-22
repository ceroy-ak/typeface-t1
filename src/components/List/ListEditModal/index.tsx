import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { IComponent } from "../../../interface";
import { nanoid } from "nanoid";
import { COMPONENT_TYPE } from "@/constant";

interface IListEditModal {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  childrenListItems: IComponent[];
  parentIdentifier: string;
  onSaveClick: (newListItems: IComponent[]) => void;
}
const ListEditModal: FC<IListEditModal> = ({
  openModal,
  setOpenModal,
  childrenListItems,
  parentIdentifier,
  onSaveClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [listItems, setlistItems] = useState<IComponent[]>([
    ...childrenListItems,
  ]);

  useEffect(() => {
    setlistItems([...childrenListItems]);
  }, [childrenListItems]);

  useEffect(() => {
    if (openModal) {
      onOpen();
    } else {
      setlistItems([...childrenListItems]);
    }
  }, [openModal]);

  const closeModal = () => {
    setOpenModal(false);
    onClose();
  };

  const handleOnAddItem = () => {
    setlistItems([
      ...listItems,
      {
        parentIdentifier,
        type: COMPONENT_TYPE.LIST_ITEM,
        identifier: nanoid(),
      },
    ]);
  };

  const saveItems = () => {
    onSaveClick(listItems);
    closeModal();
  };

  const onInputChange = (value: string, identifier: string) => {
    setlistItems(
      listItems.map((item) => {
        if (item.identifier === identifier) {
          return { ...item, value };
        }
        return item;
      })
    );
  };

  const onDeleteItem = (identifier: string) => {
    if (listItems.length === 1) return;
    setlistItems(listItems.filter((item) => item.identifier !== identifier));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit List Items</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {listItems.map((item) => (
              <div className="flex gap-2 items-center">
                <input
                  key={item.identifier}
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={item.value}
                  onChange={(e) =>
                    onInputChange(e.target.value, item.identifier)
                  }
                  placeholder="Enter Something..."
                />
                <button
                  className="bg-red-500 text-white p-1 rounded-full w-8 h-8"
                  onClick={() => onDeleteItem(item.identifier)}
                >
                  -
                </button>
              </div>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              variant={"outline"}
              mr={3}
              onClick={handleOnAddItem}
            >
              Add Item
            </Button>
            <Button variant="solid" colorScheme="blue" onClick={saveItems}>
              Save Items
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListEditModal;
