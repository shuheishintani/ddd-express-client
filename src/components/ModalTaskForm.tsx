import { TaskInput } from "@/dto/TaskInput";
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
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mutation: (taskInput: TaskInput) => void;
  defaultValues?: string[];
  action: string;
}

export const ModalTaskForm: React.FC<Props> = ({
  isOpen,
  onClose,
  mutation,
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
              <FormControl isInvalid={errors.title} key="title">
                <FormLabel htmlFor="title">タイトル</FormLabel>
                <Input
                  name="title"
                  placeholder="タイトル"
                  ref={register()}
                  autoComplete="off"
                  defaultValue={defaultValues && defaultValues[0]}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description} key="description">
                <FormLabel htmlFor="description">メモ</FormLabel>
                <Textarea
                  name="description"
                  placeholder="メモ"
                  ref={register()}
                  autoComplete="off"
                  defaultValue={defaultValues && defaultValues[1]}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
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
