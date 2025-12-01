import React from "react";
import {
  Dialog,
  Portal,
  Input,
  Stack,
  Button,
  Box,
  Icon,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

export interface AdminEditProductProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  fields: {
    name: string;
    description: string;
    price: string;
    group: string;
    image: string;
  };
  setFields: (updater: any) => void;
  onSave: () => Promise<void> | void;
  onDelete: () => Promise<void> | void;
}

/**
 * Default-exported React component wrapper for the edit dialog.
 * Use it like: <AdminEditProduct isOpen={isOpen} onClose={...} fields={fields} setFields={setFields} onSave={handleSave} product={product} />
 */
const AdminEditProduct: React.FC<AdminEditProductProps> = ({
  isOpen,
  onClose,
  product,
  fields,
  setFields,
  onSave,
  onDelete,
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
              <Dialog.Title>Editing: {product?.name}</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Stack gap={4}>
                {/* <Text fontSize="sm" color="gray.600">
                  Editing: {product?.name}
                </Text> */}

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
              <Button
                variant={"link"}
                onClick={async () => {
                  await onDelete();
                }}
              >
                <Icon as={FaTrash} padding={0} />
              </Button>
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
                    await onSave();
                  }}
                >
                  Save
                </Button>
              </Box>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AdminEditProduct;
