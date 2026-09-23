import React, { useId } from "react";

const SelecBtn = React.forwardRef(function SelecBtn(
  {
    label,
    options = [],
    className = "",
    ...props
  },
  ref
) {
  const generatedId = useId();

  const id = props.id || generatedId;

  return (
    <div className="w-full">
      {label && (
        <label
          className="mb-1 block"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none ${className}`}
      >
        {options.map((option) => {
          const value =
            typeof option === "string"
              ? option
              : option.value;

          const text =
            typeof option === "string"
              ? option
              : option.label || option.value;

          return (
            <option
              key={value}
              value={value}
            >
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
});

export default SelecBtn;