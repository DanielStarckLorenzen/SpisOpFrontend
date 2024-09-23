import { useState } from "react";
import { View } from "lucide-react";
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
  InputRightElement, useToast,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../../firebase.ts";
import {postUser} from "../../api/userApi.ts";

export type SignUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  login: () => void;
  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;
};

export function SignUpModal({ isOpen, onClose, login, setLoginEmail, setLoginPassword }: SignUpModalProps) {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleInputChange = (key: string, value: string) => {
    setFormValues({
      ...formValues,
      [key]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const saveUser = () => {
    if (formValues.firstName && formValues.lastName && formValues.userName && formValues.email && formValues.password) {
      createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
        .then((userCredential) => {
          const user = userCredential.user;
          createUser(user);
          onClose();
        })
        .catch((error) => {
          console.error("Error creating user: ", error);
        });
    }
  };

  const createUser = (user: User) => {
    const newUser = {
      id: user.uid,
      email: user.email ?? '',
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      username: formValues.userName,
      isAdmin: false
    }

    postUser(newUser).then(() => {
      toast({
        title: "User created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setLoginEmail(formValues.email);
      setLoginPassword(formValues.password);
      login();
      onClose();
    }).catch(error => {
      toast({
        title: "Error creating user in database: " + error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error creating user in database: ", error);
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired mb={4}>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="Enter your first name"
              value={formValues.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Enter your last name"
              value={formValues.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter your username"
              value={formValues.userName}
              onChange={(e) => handleInputChange("userName", e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email"
              type="email"
              value={formValues.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={formValues.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <InputRightElement>
                <Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
                  {showPassword ? <View /> : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={saveUser}>
            Sign Up
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
