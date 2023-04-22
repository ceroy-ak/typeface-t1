export interface IComponent {
    identifier: string
    type: string
    value?: string
    props?: Record<string, unknown>
    parentIdentifier?: string
    childrenNodes?: IComponent[]
}

export type IEditElement = (id: string, type: string, value: string, props?: Record<string, boolean | number | string>, childrenNodes?: IComponent[]) => void