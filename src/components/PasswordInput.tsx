import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { CustomElement, FieldElement, FieldValues, Ref } from "react-hook-form";

interface Props {
  idprop: string;
  name: string;
  placeholder: string;
  autoComplete: string;
  refprop: (
    ref:
      | (HTMLSelectElement &
          HTMLTextAreaElement &
          CustomElement<FieldValues> &
          CustomElement<Record<string, any>> &
          HTMLInputElement)
      | null
  ) => void;
}

export const PasswordInput: React.FC<Props> = ({
  idprop,
  name,
  placeholder,
  autoComplete,
  refprop,
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        id={idprop}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        ref={refprop}
        pr="4.5rem"
        type={show ? "text" : "password"}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
