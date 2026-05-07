import { contactInquiryTypes } from "@/content/contact";

export type ContactFormValues = {
  name: string;
  email: string;
  organization: string;
  inquiryType: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedInquiryTypes = new Set<string>(contactInquiryTypes);

export const contactFormLimits = {
  name: 80,
  email: 254,
  organization: 120,
  inquiryType: 80,
  message: 3000,
} as const;

export function normalizeContactFormValues(values: ContactFormValues): ContactFormValues {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    organization: values.organization.trim(),
    inquiryType: values.inquiryType.trim(),
    message: values.message.trim(),
  };
}

export function validateContactForm(values: ContactFormValues) {
  const normalized = normalizeContactFormValues(values);
  const errors: ContactFormErrors = {};

  if (!normalized.name) {
    errors.name = "Name is required.";
  } else if (normalized.name.length > contactFormLimits.name) {
    errors.name = `Name must be ${contactFormLimits.name} characters or fewer.`;
  }

  if (!normalized.email) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(normalized.email)) {
    errors.email = "Use a valid email address.";
  } else if (normalized.email.length > contactFormLimits.email) {
    errors.email = "Email is too long.";
  }

  if (!normalized.organization) {
    errors.organization = "Organization is required.";
  } else if (normalized.organization.length > contactFormLimits.organization) {
    errors.organization = `Organization must be ${contactFormLimits.organization} characters or fewer.`;
  }

  if (!normalized.inquiryType) {
    errors.inquiryType = "Choose an inquiry type.";
  } else if (normalized.inquiryType.length > contactFormLimits.inquiryType) {
    errors.inquiryType = "Inquiry type is too long.";
  } else if (!allowedInquiryTypes.has(normalized.inquiryType)) {
    errors.inquiryType = "Choose an inquiry type.";
  }

  if (!normalized.message) {
    errors.message = "Message is required.";
  } else if (normalized.message.length > contactFormLimits.message) {
    errors.message = `Message must be ${contactFormLimits.message} characters or fewer.`;
  }

  return errors;
}

export function hasContactFormErrors(errors: ContactFormErrors) {
  return Object.keys(errors).length > 0;
}
