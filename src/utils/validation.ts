import type { ValidationError } from "@/utils/errorHandling";

type ValidationResult<Data extends object> = { valid: true } | { valid: false; errors: ValidationError<Data> };

type ValidationFields<Data extends object> = {
    [Field in keyof Data]?: ValidationRules;
};

type ValidationRules = {
    [Error in string]: boolean;
};

export function validate<Data extends object>(fields: ValidationFields<Data>): ValidationResult<Data> {
    const errors: ValidationError<Data> = {};
    for (const field in fields) {
        const fieldErrors: Array<string> = [];
        for (const error in fields[field]) {
            if (fields[field][error]) {
                fieldErrors.push(error);
            }
        }
        if (fieldErrors.length > 0) {
            errors[field] = fieldErrors;
        }
    }
    if (Object.keys(errors).length > 0) {
        return { valid: false, errors };
    }
    return { valid: true };
}
