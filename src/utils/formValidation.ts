
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export type ValidationRule<T> = (value: T) => string | null;

/**
 * Create a required field validation rule
 */
export const required = (fieldName: string): ValidationRule<any> => {
  return (value: any) => {
    if (value === undefined || value === null || value === '') {
      return `${fieldName} is required`;
    }
    return null;
  };
};

/**
 * Create a minimum length validation rule
 */
export const minLength = (fieldName: string, min: number): ValidationRule<string> => {
  return (value: string) => {
    if (value && value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return null;
  };
};

/**
 * Create a maximum length validation rule
 */
export const maxLength = (fieldName: string, max: number): ValidationRule<string> => {
  return (value: string) => {
    if (value && value.length > max) {
      return `${fieldName} must be no more than ${max} characters`;
    }
    return null;
  };
};

/**
 * Create a numeric range validation rule
 */
export const numericRange = (fieldName: string, min: number, max: number): ValidationRule<number> => {
  return (value: number) => {
    if (value < min) {
      return `${fieldName} must be at least ${min}`;
    }
    if (value > max) {
      return `${fieldName} must be no more than ${max}`;
    }
    return null;
  };
};

/**
 * Validate an object against a set of validation rules
 */
export const validateObject = <T extends Record<string, any>>(
  obj: T,
  validationRules: Record<keyof T, ValidationRule<any>[]>
): ValidationResult => {
  const errors: Record<string, string> = {};
  
  Object.keys(validationRules).forEach((key) => {
    const value = obj[key];
    const rules = validationRules[key as keyof T];
    
    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        errors[key] = error;
        break;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
