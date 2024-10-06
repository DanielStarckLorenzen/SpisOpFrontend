// Import necessary dependencies and components
import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { createFoodPost } from '../../api/foodPostApi.ts';
import { User } from '../../types/User.ts';
import { newFoodPost } from '../../types/FoodPost.ts';
import { Organization } from '../../types/Organization.ts';

// Define the props for the CreateFoodPostModal component
export type CreateFoodPostModalProps = {
  organization: Organization;
  authorUser: User;
  isOpen: boolean;
  onClose: () => void;
};

// CreateFoodPostModal component
export function CreateFoodPostModal({
  organization,
  authorUser,
  isOpen,
  onClose,
}: CreateFoodPostModalProps) {
  // State to manage form values
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    image: '',
    price: 0,
  });

  // Hook to display toast notifications
  const toast = useToast();

  // Handle input changes for form fields
  const handleInputChange = (key: string, value: string | number) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  // Function to create a new food post
  const create = () => {
    // Prepare the new food post object
    const newPost: newFoodPost = {
      title: formValues.title,
      description: formValues.description,
      image: formValues.image,
      price: formValues.price,
      author: authorUser,
      organization: organization,
    };

    // Call the API to create the food post
    createFoodPost(newPost)
      .then(() => {
        // Display success toast and close the modal
        toast({
          title: 'Food post created successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        // Display error toast and log the error
        toast({
          title: 'Error creating food post: ' + error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.error('Error creating food post: ', error);
      });
  };

  // Render the modal
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Food Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Title input */}
          <FormControl isRequired mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Enter the title of the food post"
              value={formValues.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </FormControl>

          {/* Description input */}
          <FormControl isRequired mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Describe the food post"
              value={formValues.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </FormControl>

          {/* Image URL input */}
          <FormControl mb={4}>
            <FormLabel>Image URL</FormLabel>
            <Input
              placeholder="Enter the image URL"
              value={formValues.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
            />
          </FormControl>

          {/* Price input */}
          <FormControl isRequired mb={4}>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              placeholder="Enter the price"
              value={formValues.price}
              onChange={(e) =>
                handleInputChange('price', parseFloat(e.target.value))
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {/* Create button */}
          <Button colorScheme="blue" mr={3} onClick={create}>
            Create
          </Button>
          {/* Cancel button */}
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
