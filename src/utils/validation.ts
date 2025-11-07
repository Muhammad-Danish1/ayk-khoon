// Email validation helper
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Password validation helper
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' };
  }
  return { isValid: true };
};

// Form validation types
export type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  matchField?: string;
  custom?: (value: string) => { isValid: boolean; message: string };
};

export type ValidationResult = {
  isValid: boolean;
  errors: Record<string, string>;
};

// Main validation function
export const validateForm = (
  fields: Record<string, { value: string; rules: ValidationRules }>,
  formData?: Record<string, any>
): ValidationResult => {
  const errors: Record<string, string> = {};
  let isValid = true;

  Object.entries(fields).forEach(([fieldName, { value, rules }]) => {
    if (rules.required && !value) {
      errors[fieldName] = 'This field is required';
      isValid = false;
      return;
    }

    if (value) {
      if (rules.minLength && value.length < rules.minLength) {
        errors[fieldName] = `Must be at least ${rules.minLength} characters`;
        isValid = false;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        errors[fieldName] = `Cannot exceed ${rules.maxLength} characters`;
        isValid = false;
      }

      if (rules.isEmail && !validateEmail(value)) {
        errors[fieldName] = 'Please enter a valid email address';
        isValid = false;
      }

      if (rules.matchField && formData && value !== formData[rules.matchField]) {
        errors[fieldName] = 'Passwords do not match';
        isValid = false;
      }

      if (rules.custom) {
        const customValidation = rules.custom(value);
        if (!customValidation.isValid) {
          errors[fieldName] = customValidation.message;
          isValid = false;
        }
      }
    }
  });

  return { isValid, errors };
};

// Field validation helper
export const validateField = (
  name: string,
  value: string,
  rules: ValidationRules,
  formData?: Record<string, any>
): string | undefined => {
  if (rules.required && !value) {
    return 'This field is required';
  }

  if (value) {
    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Cannot exceed ${rules.maxLength} characters`;
    }

    if (rules.isEmail && !validateEmail(value)) {
      return 'Please enter a valid email address';
    }

    if (rules.matchField && formData && value !== formData[rules.matchField]) {
      return 'Passwords do not match';
    }

    if (rules.custom) {
      const customValidation = rules.custom(value);
      if (!customValidation.isValid) {
        return customValidation.message;
      }
    }
  }

  return undefined;
};
