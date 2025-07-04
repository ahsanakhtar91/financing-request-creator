import * as yup from "yup";
import { inputFieldLabels } from "../constants/constants";

// Validation schema for financing request form
export const financingRequestSchema = yup.object({
  firstName: yup
    .string()
    .label(inputFieldLabels.firstName)
    .required()
    .min(2, ({ label }) => `${label} must be at least 2 characters`)
    .max(100, ({ label }) => `${label} must not exceed 100 characters`)
    .matches(
      /^[a-zA-Z\s]+$/,
      ({ label }) => `${label} can only contain letters and spaces`
    ),
  lastName: yup
    .string()
    .label(inputFieldLabels.lastName)
    .required()
    .min(2, ({ label }) => `${label} must be at least 2 characters`)
    .max(100, ({ label }) => `${label} must not exceed 100 characters`)
    .matches(
      /^[a-zA-Z\s]+$/,
      ({ label }) => `${label} can only contain letters and spaces`
    ),
  originCountry: yup.string().label(inputFieldLabels.originCountry).required(),
  projectCode: yup
    .string()
    .label(inputFieldLabels.projectCode)
    .required()
    .matches(
      /^[A-Z]{4}-[1-9]{4}$/,
      ({ label }) => `Invalid format of ${label} (should be like ABCD-1234)`
    ),
  description: yup.string().max(150, "Maximum 150 characters allowed"),
  paymentAmount: yup
    .number()
    .label(inputFieldLabels.paymentAmount)
    .required()
    .positive(({ label }) => `${label} must be positive`),
  paymentCurrency: yup
    .string()
    .label(inputFieldLabels.paymentCurrency)
    .required()
    .length(3, ({ label }) => `${label} must be a 3-letter code`),
  validityStartDate: yup
    .date()
    .label(inputFieldLabels.validityStartDate)
    .required()
    .test(
      "validityStartDate",
      ({ label }) => `${label} must be at least 15 days from now`,
      (validityStartDate) => {
        if (!validityStartDate) return true;
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 15);
        return validityStartDate >= minDate;
      }
    ),
  validityEndDate: yup
    .date()
    .label(inputFieldLabels.validityEndDate)
    .required()
    .test(
      "validityEndDate",
      ({ label }) =>
        `${label} must be between 1 and 3 years after ${inputFieldLabels.validityEndDate}`,
      (validityEndDate, ctx) => {
        const { validityStartDate } = ctx.parent;
        if (!validityEndDate && !validityStartDate) return true;

        const minEndDate = new Date(validityStartDate);
        minEndDate.setFullYear(minEndDate.getFullYear() + 1);
        const maxEndDate = new Date(validityStartDate);
        maxEndDate.setFullYear(maxEndDate.getFullYear() + 3);

        return validityEndDate >= minEndDate && validityEndDate <= maxEndDate;
      }
    ),
});

export type FinancingRequestFormData = yup.InferType<
  typeof financingRequestSchema
>;
