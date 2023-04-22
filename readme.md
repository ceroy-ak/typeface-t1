# Typeface Round 1

### Requirements

> 1. Input field, user can input what type of data block they want (Title, text, list)
> 2. Autocomplete(later)
> 3. Insert the type of block in the UI, and keep on inserting
> 4. Save in memory, how many text block, paragraph, list ==> API 
> 5. 
> 
> 
> * Have a input text where slash commands can be given to create new blocks.. when user clicks enter.
> /text -> creates text block
> /title -> creates title block etc.
> * Optional - light up - autocomplete - /t should show /text and /title as possible > options..
> * Create following block types - Text, Title, List and Image.
> * Data in the block will be editable. For image block, image from local box can be > uploaded..
> * For "text content" type blocks, add support for Bold, Italic, Underline etc type of > text customization.
> * A "save" button - will capture current contents in the blocks that were created and > edited and converts to a JSON object.
> * The JSON object when provided as input to the component, the same UI should be > re-rendered.
> Deliverables
> * Add any other optional features that improve the usability.
> * Share a write up on high level design decisions.
> * Share a zip / git repo with functional code.
---

### Object Interface

The JSON object for each object have the following interface

```typescript
export interface IComponent {
    identifier: string
    type: string
    value?: string
    props?: Record<string, unknown>
    parentIdentifier?: string
    childrenNodes?: IComponent[]
}
```

- **Identifier** is the unique identifier for the component
- **Type** is the type of the component
- **Value** is the value of the component
- **Props** is the props of the component like Bold, Underline and italics
- **ParentIdentifier** is the parent identifier of the component which can be used to nested components
- **ChildrenNodes** is the children nodes of the component which can be used to nested components and are have the value of parentIdentifier of the same value as the value of the identifier of the parent component

---

## High Level Working

Each of the components gets an onEdit function through prop drilling

```typescript
export type IEditElement = (id: string, type: string, value: string, props?: Record<string, boolean | number | string>, childrenNodes?: IComponent[]) => void
```

Which takes an identifier, component type, props and any childrennodes and then mutate the value to the global object in the *`App.tsx`* file

![image](https://typeface-r-1.netlify.app/typefaceT1-D1.png)

In the Props:

```typescript
export interface ITextField extends PropsWithChildren {
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
  fontSize?: number;
  identifier: string;
  onEdit: IEditElement;
}
```
For example, the textfield component has the following props

```typescript
export const TextField: React.FC<ITextField> = ({
  bold,
  underline,
  italic,
  fontSize,
  identifier,
  onEdit,
  children,
}) => {
  
};
```

If relevant props are supplied or is changed then the props change and the relevant styles also change, and the onEdit function is used to make the changes based on the button click for Bold, Underline and Italic

For editing we have used 2 approaches:

1. For **List** component, onDoubleClick in any on the LI items (due to bubbling up of event), the onDoubleClick handler in UL element is called and a Modal pops up to add, and remove the list item
2. For **Text** and **Title** elements I have used contentEditable field to edit the innerText directly in the DOM and then the onBlur event is used to update the value in the global object which passes the value to the onEdit function

---

## Features

1. **Nested Components** - I have used a recursive function to render the nested components and the childrenNodes array is used to render the nested components
2. **ContentEditable** - I have used contentEditable field to edit the innerText directly in the DOM and then the onBlur event is used to update the value in the global object which passes the value to the onEdit function
3. **List** - onDoubleClick in any on the LI items (due to bubbling up of event), the onDoubleClick handler in UL element is called and a Modal pops up to add, and remove the list item
4. **AutoComplete** - on input onChange event, the autocomplete function uses the .includes() method and renders a div with the relevant suggestions
---
## Future Improvements

1. Props and currently not verified for any of the components, it is just assumed that the props are correct
2. we can use useContxt to pass on the onEdit function to avoid prop drilling
3. For state management currently I am using a global object with useState, we can use Redux to manage the state
4. The Autocomplete does not work with arrows and enter key, we can use the arrow keys to navigate through the suggestions and enter key to select the suggestion

