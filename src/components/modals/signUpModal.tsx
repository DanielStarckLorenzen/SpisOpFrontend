// Import necessary dependencies and components
import { useState } from 'react';
import { View } from 'lucide-react';
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
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from '../../../firebase.ts';
import { postUser } from '../../api/userApi.ts';

// Define props for SignUpModal component
export type SignUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  login: () => void;
  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;
};

// SignUpModal component
export function SignUpModal({
  isOpen,
  onClose,
  login,
  setLoginEmail,
  setLoginPassword,
}: SignUpModalProps) {
  // State to manage form values
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // Hook to display toast notifications
  const toast = useToast();

  // Handle input changes for form fields
  const handleInputChange = (key: string, value: string) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Save user to Firebase Authentication
  const saveUser = () => {
    if (
      formValues.firstName &&
      formValues.lastName &&
      formValues.userName &&
      formValues.email &&
      formValues.password
    ) {
      createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          createUser(user);
          onClose();
        })
        .catch((error) => {
          console.error('Error creating user: ', error);
        });
    }
  };

  // Create user in the database
  const createUser = (user: User) => {
    const newUser = {
      id: user.uid,
      email: user.email ?? '',
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      username: formValues.userName,
      admin: false,
    };

    postUser(newUser)
      .then(() => {
        // Display success toast
        toast({
          title: 'User created successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Set login credentials and perform login
        setLoginEmail(formValues.email);
        setLoginPassword(formValues.password);
        login();
        onClose();
      })
      .catch((error) => {
        // Display error toast
        toast({
          title: 'Error creating user in database: ' + error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.error('Error creating user in database: ', error);
      });
  };

  // Render the SignUpModal component
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* First Name input */}
          <FormControl isRequired mb={4}>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="Enter your first name"
              value={formValues.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </FormControl>

          {/* Last Name input */}
          <FormControl isRequired mb={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Enter your last name"
              value={formValues.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </FormControl>

          {/* Username input */}
          <FormControl isRequired mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter your username"
              value={formValues.userName}
              onChange={(e) => handleInputChange('userName', e.target.value)}
            />
          </FormControl>

          {/* Email input */}
          <FormControl isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email"
              type="email"
              value={formValues.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </FormControl>

          {/* Password input */}
          <FormControl isRequired mb={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                value={formValues.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
              <InputRightElement>
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <View /> : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {/* Sign Up button */}
          <Button colorScheme="blue" mr={3} onClick={saveUser}>
            Sign Up
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
