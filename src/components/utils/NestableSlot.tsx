import * as React from "react";
import type { JSX } from "react";

import { composeRefs } from "@radix-ui/react-compose-refs";

/**
 * Code is taken from this pull request: https://github.com/radix-ui/primitives/pull/2197
 *
 * This can be removed once the pull request got merged.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (isSlottable(children)) {
        const slottable = children;

        return (
            <SlotClone {...slotProps} ref={forwardedRef}>
                {React.isValidElement<React.PropsWithChildren<unknown>>(slottable.props.child)
                    ? React.cloneElement(
                          slottable.props.child,
                          undefined,
                          slottable.props.children(slottable.props.child.props.children),
                      )
                    : null}
            </SlotClone>
        );
    }

    return (
        <SlotClone {...slotProps} ref={forwardedRef}>
            {children}
        </SlotClone>
    );
});

Slot.displayName = "Slot";

/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/

interface SlotCloneProps {
    children: React.ReactNode;
}

const SlotClone = React.forwardRef<any, SlotCloneProps>((props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (React.isValidElement<React.RefAttributes<unknown>>(children)) {
        return React.cloneElement(children, {
            ...mergeProps(slotProps, children.props),
            ref: forwardedRef ? composeRefs(forwardedRef, (children as any).ref) : (children as any).ref,
        });
    }

    return React.Children.count(children) > 1 ? React.Children.only(null) : null;
});

SlotClone.displayName = "SlotClone";

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/

type SlottableProps = {
    child: React.ReactNode;
    children: (child: React.ReactNode) => JSX.Element;
};

const Slottable = ({ child, children }: SlottableProps) => {
    return children(child);
};

/* ---------------------------------------------------------------------------------------------- */

type AnyProps = Record<string, any>;

function isSlottable(child: React.ReactNode): child is React.ReactElement<SlottableProps> {
    return React.isValidElement(child) && child.type === Slottable;
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
    // all child props should override
    const overrideProps = { ...childProps };

    for (const propName in childProps) {
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];

        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            // if the handler exists on both, we compose them
            if (slotPropValue && childPropValue) {
                overrideProps[propName] = (...args: unknown[]) => {
                    childPropValue(...args);
                    slotPropValue(...args);
                };
            }
            // but if it exists only on the slot, we use only this one
            else if (slotPropValue) {
                overrideProps[propName] = slotPropValue;
            }
        }
        // if it's `style`, we merge them
        else if (propName === "style") {
            overrideProps[propName] = { ...slotPropValue, ...childPropValue };
        } else if (propName === "className") {
            overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
        }
    }

    return { ...slotProps, ...overrideProps };
}

export { Slot as NestableSlot, Slottable as NestableSlottable };
export type { SlotProps };
