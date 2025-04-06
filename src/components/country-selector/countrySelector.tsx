import React, { useMemo } from "react";
import Select, {
  components,
  GroupBase,
  OptionProps,
  SingleValueProps,
  InputProps,
  StylesConfig,
} from "react-select";
import { useTheme } from "@providers/theme-provider/ThemeProvider";

export interface CountryOption {
  value: string;
  label: string;
  code: string;
}

interface CountrySelectorProps {
  onChange?: (value: string | null) => void;
  value?: string;
  className?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onChange, value, className = "" }) => {
  const { theme } = useTheme();

  const countries = useMemo(
    () => [
      { code: "us", name: "United States" },
      { code: "gb", name: "United Kingdom" },
      // ... rest of the countries
    ],
    []
  );

  const options: CountryOption[] = useMemo(
    () =>
      countries.map((country) => ({
        value: country.code,
        label: country.name,
        code: country.code.toUpperCase(),
      })),
    [countries]
  );

  const selectedOption = useMemo(
    () => (value ? options.find((opt) => opt.value === value) : null),
    [value, options]
  );

  // Custom Option component for displaying flag and label
  const FlagOption: React.FC<
    OptionProps<CountryOption, false, GroupBase<CountryOption>> & { theme: string }
  > = ({ innerRef, innerProps, label, data, isFocused, isSelected, theme: themeProp }) => {
    const bgColor =
      themeProp === "dark"
        ? isSelected
          ? "bg-gray-600"
          : isFocused
            ? "bg-gray-700"
            : "bg-gray-800"
        : isSelected
          ? "bg-blue-100"
          : isFocused
            ? "bg-gray-100"
            : "bg-white";

    return (
      <div
        ref={innerRef}
        {...innerProps}
        className={`flex items-center px-3 py-2 cursor-pointer transition-colors ${bgColor} text-gray-800 dark:text-gray-100`}
      >
        <img
          src={`https://flagsapi.com/${data.code}/flat/32.png`}
          alt={`${label} flag`}
          className="w-5 h-4 mr-2 object-cover"
          loading="lazy"
        />
        <span className="text-sm">{label}</span>
      </div>
    );
  };

  // Fixed FlagSingleValue component for proper vertical centering
  const FlagSingleValue: React.FC<
    SingleValueProps<CountryOption, false, GroupBase<CountryOption>>
  > = ({ data }) => (
    <div className="flex items-center h-full py-1">
      <img
        src={`https://flagsapi.com/${data.code}/flat/32.png`}
        alt={`${data.label} flag`}
        className="w-5 h-4 mr-2 object-cover"
      />
      <span className="text-sm">{data.label}</span>
    </div>
  );

  // NoInput component that renders nothing
  const NoInput: React.FC<InputProps<CountryOption, false>> = () => null;

  const customStyles: StylesConfig<CountryOption, false> = {
    control: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#1f2937" : "white",
      borderColor: theme === "dark" ? "#374151" : "#d1d5db",
      borderRadius: "0.375rem",
      height: "3rem",
      fontSize: "0.875rem",
      boxShadow: "none",
      minHeight: "3rem",
      "&:hover": {
        borderColor: theme === "dark" ? "#4b5563" : "#cbd5e1",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.375rem",
      overflow: "hidden",
      backgroundColor: theme === "dark" ? "#1f2937" : "white",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    }),
    option: (base) => ({
      ...base,
      padding: 0,
    }),
    singleValue: (base) => ({
      ...base,
      padding: 0,
      margin: 0,
      height: "100%",
      display: "flex",
      alignItems: "center",
      color: theme === "dark" ? "#f9fafb" : "#1f2937",
      transform: "translateY(0)",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 8px",
      height: "100%",
      display: "flex",
      alignItems: "center",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: "100%",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "8px",
    }),
  };

  const handleChange = (selected: CountryOption | null) => {
    onChange?.(selected ? selected.value : null);
  };

  return (
    <div className={`relative ${className}`}>
      <Select<CountryOption, false, GroupBase<CountryOption>>
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select a country"
        className="text-sm"
        components={{
          Input: NoInput,
          Option: (props) => <FlagOption {...props} theme={theme} />,
          SingleValue: FlagSingleValue,
        }}
        styles={customStyles}
        isSearchable={false}
        classNames={{
          control: () =>
            theme === "dark"
              ? "bg-gray-900 border-gray-700 text-sm rounded-md"
              : "bg-white border-gray-300 text-sm rounded-md",
          menu: () => (theme === "dark" ? "bg-gray-900" : "bg-white"),
        }}
      />
    </div>
  );
};

export default CountrySelector;
