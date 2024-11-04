import { ChangeEventHandler, FC } from "react";
import { FormattedMessage } from "react-intl";
import StyledSelect from "@components/atoms/Select/Select.styled.tsx";

export interface Option {
  translationKey: string;
  value: string;
}

export interface SelectProps {
  onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
  options: Option[];
  value: string | number | readonly string[] | undefined;
}

const Select: FC<SelectProps> = ({ onChange, options, value }) => {
  return (
    <StyledSelect aria-label={"Language"} value={value} onChange={onChange}>
      {options.map((option, index) => {
        return (
          <option key={index} value={option.value}>
            <FormattedMessage id={option.translationKey} />
          </option>
        );
      })}
    </StyledSelect>
  );
};

export default Select;
