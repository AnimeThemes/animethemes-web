import type { SVGProps } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type FontAwesomeIconProps = SVGProps<SVGSVGElement> & {
    icon: IconDefinition
    title?: string
}

const xmlns = "http://www.w3.org/2000/svg";

export function FontAwesomeIcon(props: FontAwesomeIconProps) {
    const { icon: iconProps, children, className = "", title, ...rest } = props;

    const { prefix, iconName, icon } = iconProps;
    const [width, height, , , svgPathData] = icon;

    const dataFa = `${prefix}-${iconName}`;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            xmlns={xmlns}
            role={"img"}
            aria-hidden="true"
            data-fa={dataFa}
            className={`${className} svg-inline--fa fa-fw`}
            {...rest}
        >
            {title ? (
                <title>{title}</title>
            ) : null}
            {children}
            {Array.isArray(svgPathData) ? (
                <g>
                    <path d={svgPathData[0]}/>
                    <path d={svgPathData[1]}/>
                </g>
            ) : (
                <path fill="currentColor" d={svgPathData}/>
            )}
        </svg>
    );
}
