import Select, { components } from "react-select";
import React, { useState } from "react";

import { Genres } from "../../enums/Genres.js";

function MultiSelectDropdown({ onChangeHandler, defaultValue = [] }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  function handleChange(options) {
    if (!onChangeHandler(options)) {
      if (Array.isArray(options)) {
        setSelectedOptions(options.map((opt) => opt.value));
      }
    }
  }

  const ValueContainer = ({ children, getValue, ...props }) => {
    var values = getValue();
    var valueLabel = "";

    if (values.length > 0)
      valueLabel += props.selectProps.getOptionLabel(values[0]);
    if (values.length > 1) valueLabel += ` и ${values.length - 1} още`;

    // Keep standard placeholder and input from react-select
    var childsToRender = React.Children.toArray(children).filter(
      (child) =>
        ["Input", "DummyInput", "Placeholder"].indexOf(child.type.name) >= 0
    );

    return (
      <components.ValueContainer {...props}>
        {!props.selectProps.inputValue && valueLabel}
        {childsToRender}
      </components.ValueContainer>
    );
  };

  const MultiSelectComponent = (
    <>
      <Select
        readOnly
        className="basic-multi-select"
        placeholder="Изберете жанр"
        defaultValue={defaultValue}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        onChange={(value) => handleChange(value)}
        options={Genres}
        components={{
          ValueContainer,
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "LavenderBlush",
            primary: "darkorange",
          },
        })}
      />
    </>
  );

  return { selectedOptions, MultiSelectComponent };
}

export default MultiSelectDropdown;
