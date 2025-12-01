import React from "react";
import { Dialog, Portal, Input, Stack, Button, Box } from "@chakra-ui/react";

export interface NewProductProps {
  isOpen: boolean;
  onClose: () => void;
  fields: {
    name: string;
    description: string;
    price: string;
    group: string;
    image: string;
  };
  setFields: (updater: any) => void;
  onAdd: () => Promise<void> | void;
}

const AddNewProduct: React.FC<NewProductProps> = ({
  isOpen,
  onClose,
  fields,
  setFields,
  onAdd,
}) => {
  const handleChange = (key: keyof typeof fields, value: string) => {
    setFields((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} placement={"center"}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            maxW="560px"
            width="full"
            borderRadius="md"
            boxShadow="lg"
            background="white"
          >
            <Dialog.Header>
              <Dialog.Title>New Product</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Stack gap={4}>
                <Input
                  placeholder="Name"
                  value={fields.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />

                <Input
                  placeholder="Description"
                  value={fields.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />

                <Input
                  placeholder="Price"
                  value={fields.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />

                <Input
                  placeholder="Category / Group"
                  value={fields.group}
                  onChange={(e) => handleChange("group", e.target.value)}
                />

                <Input
                  placeholder="Image URL"
                  value={fields.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                />
              </Stack>
            </Dialog.Body>

            <Dialog.Footer>
              <Box
                display="flex"
                gap={3}
                justifyContent="flex-end"
                width="100%"
              >
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                    await onAdd();
                  }}
                >
                  Add
                </Button>
              </Box>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AddNewProduct;
