import { IComponent, IEditElement } from "../interface";
import { nanoid } from "nanoid";
import React from "react";
import TextField from "../components/Text";
import TitleField from "../components/Title";
import ListField from "../components/List";
import ListItemField from "../components/List/ListItem";
import { COMPONENT_TYPE } from "@/constant";

export function getComponentObj(type: string): IComponent {
  switch (type) {
    case COMPONENT_TYPE.TEXT:
      return {
        type: COMPONENT_TYPE.TEXT,
        identifier: nanoid(),
      };
    case COMPONENT_TYPE.TITLE:
      return {
        type: COMPONENT_TYPE.TITLE,
        identifier: nanoid(),
      };
    case COMPONENT_TYPE.LIST:
      const identifier = nanoid();
      return {
        type: COMPONENT_TYPE.LIST,
        identifier,
        childrenNodes: [
          {
            parentIdentifier: identifier,
            type: COMPONENT_TYPE.LIST_ITEM,
            identifier: nanoid(),
          },
        ],
      };
    default:
      return {
        type: "Default",
        identifier: nanoid(),
      };
  }
}

export function getComponent(
  obj: IComponent,
  onEdit: IEditElement
): React.ReactElement {
  switch (obj.type) {
    case COMPONENT_TYPE.TEXT:
      return (
        <TextField identifier={obj.identifier} onEdit={onEdit} {...obj.props}>
          {obj.value || "I am Paragraph"}
        </TextField>
      );
    case COMPONENT_TYPE.TITLE:
      return (
        <TitleField identifier={obj.identifier} onEdit={onEdit} {...obj.props}>
          {obj.value || "I am Heading"}
        </TitleField>
      );
    case COMPONENT_TYPE.LIST:
      return (
        <ListField
          identifier={obj.identifier}
          onEdit={onEdit}
          childrenNodes={obj.childrenNodes}
          {...obj.props}
        >
          {obj.childrenNodes?.map((node) => {
            return getComponent(node, onEdit);
          })}
        </ListField>
      );
    case COMPONENT_TYPE.LIST_ITEM:
      return (
        <ListItemField
          identifier={obj.identifier}
          parentIdentifier={obj.parentIdentifier}
          onEdit={onEdit}
          {...obj.props}
        >
          {obj.value || "I am List Item"}
        </ListItemField>
      );
    default:
      return <div>Default</div>;
  }
}
