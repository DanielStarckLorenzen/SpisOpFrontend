// Import necessary dependencies and components
import { useState } from 'react';
import { User } from '../../types/User.ts';
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
  useToast,
} from '@chakra-ui/react';
import { putUser } from '../../api/userApi.ts';

// Define props for UpdateUserModal component
export type UpdateUserModalProps = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};

// UpdateUserModal component
export function UpdateUserModal({
  user,
  isOpen,
  onClose,
}: UpdateUserModalProps) {
  // State to manage form values
  const [formValues, setFormValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
  });

  // Hook to display toast notifications
  const toast = useToast();

  // Handle input changes for form fields
  const handleInputChange = (key: string, value: string) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  // Function to update user information
  const updateUser = () => {
    // Prepare updated user object
    const updatedUser: User = {
      id: user.id,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      username: formValues.userName,
      email: formValues.email,
      profilePicture: formValues.profilePicture,
    };
    // Call API to update user
    putUser(updatedUser)
      .then(() => {
        // Show success toast
        toast({
          title: 'User updated successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
        // Redirect to user profile page
        window.location.href = '/myProfile';
      })
      .catch((error) => {
        // Show error toast
        toast({
          title: 'Error updating user: ' + error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.error('Error updating user in database: ', error);
      });
  };

  // Render the modal
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Form controls for user information */}
          <FormControl isRequired mb={4}>
            <FormLabel>First Name</FormLabel>
            <Input
              value={formValues.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              value={formValues.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              value={formValues.userName}
              onChange={(e) => handleInputChange('userName', e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={formValues.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Profile picture URL</FormLabel>
            <Input
              value={formValues.profilePicture}
              onChange={(e) =>
                handleInputChange('profilePicture', e.target.value)
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {/* Update and Cancel buttons */}
          <Button colorScheme="blue" mr={3} onClick={updateUser}>
            Update
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
