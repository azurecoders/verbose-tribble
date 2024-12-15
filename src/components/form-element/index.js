import React from "react";
import { Input } from "../ui/input";

const CommonFormElement = ({ currentItem, value, onChange }) => {
  let content = null;
  switch (currentItem.componentType) {
    case "input":
      content = (
        <Input
          name={currentItem.name}
          placeholder={currentItem.placeholder}
          id={currentItem.name}
          value={value}
          onChange={onChange}
          type={currentItem.type}
        />
      );
      break;

    default:
      content = (
        <Input
          name={currentItem.name}
          placeholder={currentItem.placeholder}
          id={currentItem.name}
          value={value}
          onChange={onChange}
          type={currentItem.type}
        />
      );
      break;
  }
  return content;
};

export default CommonFormElement;
