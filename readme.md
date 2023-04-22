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
