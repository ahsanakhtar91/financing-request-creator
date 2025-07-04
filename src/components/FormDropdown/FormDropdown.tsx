import "../../components/FormInput/FormInput.css";
import { FinancingRequestFormData } from "../../schemas/financingRequestSchema";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Select } from "antd";
import { ComponentProps } from "react";

type FormDropdownProps = {
  name: keyof FinancingRequestFormData;
  label: string;
  options: ComponentProps<typeof Select>["options"];
  placeholder?: string;
  disabled?: boolean;
  control: Control<FinancingRequestFormData>;
  errors: FieldErrors<FinancingRequestFormData>;
};

export const FormDropdown = ({
  name,
  label,
  options = [],
  placeholder,
  disabled,
  control,
  errors,
}: FormDropdownProps) => {
  return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="form-input-container">
            <div className="form-input-label">{label}</div>
            <Select
              {...field}
              placeholder={placeholder ?? `Select ${label}`}
              disabled={disabled}
              status={errors[name] ? "error" : ""}
              className="form-input"
              options={options}
              showSearch
              allowClear
            />
            {errors[name] && (
              <div className="error-message">{errors[name]?.message}</div>
            )}
          </div>
        )}
      />
  );
};
