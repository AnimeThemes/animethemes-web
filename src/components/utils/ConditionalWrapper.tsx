interface ConditionalWrapperProps {
    condition: boolean
    wrap: (children: JSX.Element) => JSX.Element
    children: JSX.Element
}

export function ConditionalWrapper({ condition, wrap, children }: ConditionalWrapperProps) {
    return condition ? wrap(children) : children;
}
