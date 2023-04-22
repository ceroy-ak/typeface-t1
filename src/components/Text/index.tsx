import { FC, PropsWithChildren, useRef, useState } from "react";
import { IEditElement } from "../../interface";
import { Tooltip } from "@chakra-ui/react";

export interface ITextField extends PropsWithChildren {
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
  fontSize?: number;
  identifier: string;
  onEdit: IEditElement;
}
const TextField: FC<ITextField> = ({
  children,
  bold,
  fontSize,
  italic,
  underline,
  onEdit,
  identifier,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (e: React.FocusEvent<HTMLParagraphElement>) => {
    const { innerText } = e.target;
    onEdit(identifier, "Text", innerText);
    setIsEditing(false);
  };

  const onBoldClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { innerText } = ref.current as HTMLParagraphElement;
    onEdit(identifier, "Text", innerText, { bold: !bold });
  };

  const onUnderlineClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { innerText } = ref.current as HTMLParagraphElement;
    onEdit(identifier, "Text", innerText, { underline: !underline });
  };

  const onItalicClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { innerText } = ref.current as HTMLParagraphElement;
    onEdit(identifier, "Text", innerText, { italic: !italic });
  };

  return (
    <div className="flex gap-10 w-full items-center justify-center relative">
      <div>
        <Tooltip label="Double Click to edit">
          <p
            style={{
              fontWeight: bold ? "bold" : "normal",
              textDecoration: underline ? "underline" : "none",
              fontStyle: italic ? "italic" : "normal",
              fontSize: `${fontSize || "30"}px`,
              height: "fit-content",
              padding: "0.5rem 2rem",
            }}
            ref={ref}
            className="cursor-text"
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onClick={() => setIsEditing(true)}
            onBlur={handleEdit}
          >
            {children}
          </p>
        </Tooltip>
      </div>
      <div
        className={`${"visible transition-all duration-500 -right-10"} flex gap-2`}
      >
        <button
          onClick={onBoldClick}
          className="font-bold text-white bg-gray-800 p-2 w-10 rounded-lg"
        >
          B
        </button>
        <button
          onClick={onUnderlineClick}
          className="underline text-white bg-gray-800 p-2 w-10 rounded-lg"
        >
          U
        </button>
        <button
          onClick={onItalicClick}
          className="italic text-white bg-gray-800 p-2 w-10 rounded-lg"
        >
          I
        </button>
      </div>
    </div>
  );
};

export default TextField;
