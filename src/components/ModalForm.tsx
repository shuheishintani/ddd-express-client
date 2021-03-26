import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mutation: any;
  labels: string[];
  defaultValues?: string[];
  action: string;
}

export const ModalForm: React.FC<Props> = ({
  isOpen,
  onClose,
  mutation,
  labels,
  defaultValues,
  action,
}) => {
  const {
    handleSubmit,
    errors,
    register,
    formState: { isSubmitting },
  } = useForm();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} colorScheme="white" isCentered>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader>Todoを{action}する</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(mutation)}>
            <ModalBody pb={6}>
              {labels.map((label, i) => (
                <FormControl isInvalid={errors[label]} key={label}>
                  <FormLabel htmlFor={label}>{label}</FormLabel>
                  <Input
                    name={label}
                    placeholder={label}
                    ref={register()}
                    autoComplete="off"
                    defaultValue={defaultValues && defaultValues[i]}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                isLoading={isSubmitting}
                loadingText={action + "中"}
                type="submit"
                mr={3}
              >
                {action}
              </Button>
              <Button onClick={onClose}>キャンセル</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
