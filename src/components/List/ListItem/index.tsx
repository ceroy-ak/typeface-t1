import { FC, PropsWithChildren, useRef, useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import { IEditElement } from "../../../interface";

export interface IListItemField extends PropsWithChildren {
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
  fontSize?: number;
  identifier: string;
  parentIdentifier?: string;
  onEdit: IEditElement;
}
const ListItemField: FC<IListItemField> = ({
  children,
  identifier,
  bold,
  fontSize,
  italic,
  underline,
  onEdit,
}) => {
  return (
    <li
      className={`
            ${bold ? "font-bold" : ""}
            ${underline ? "underline" : ""}
            ${italic ? "italic" : ""}
            text-2xl
            py-1
        `}
      key={identifier}
    >
      {children}
    </li>
  );
};

export default ListItemField;
