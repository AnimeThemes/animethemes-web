export default function transientProps(props, filterNonStandard = true) {
    return {
        shouldForwardProp: (prop, defaultValidator) => {
            if (props.includes(prop)) {
                return false;
            }

            if (filterNonStandard) {
                return defaultValidator(prop)
            }

            return true;
        }
    };
}
