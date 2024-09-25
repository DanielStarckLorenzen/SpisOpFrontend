import { useState } from "react";
import { User } from "../../types/User.ts";
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
} from "@chakra-ui/react";
import {putUser} from "../../api/userApi.ts";

export type UpdateUserModalProps = {
    user : User,
    isOpen: boolean;
    onClose: () => void;
};

export function UpdateUserModal({ user, isOpen, onClose }: UpdateUserModalProps) {
    const [formValues, setFormValues] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.username,
        email: user.email
    });

    const toast = useToast();

    const handleInputChange = (key: string, value: string) => {
        setFormValues({
            ...formValues,
            [key]: value
        });
    };

    const updateUser = () => {
        const updatedUser: User = {
            id: user.id,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            username: formValues.userName,
            email: formValues.email,
        };
        putUser(updatedUser).then(() => {
            toast({
                title: "User updated successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onClose();
            window.location.href = "/myProfile";
        }).catch(error => {
            toast({
                title: "Error updating user: " + error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            console.error("Error updating user in database: ", error);
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired mb={4}>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            value={formValues.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                        />
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            value={formValues.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                        />
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            value={formValues.userName}
                            onChange={(e) => handleInputChange("userName", e.target.value)}
                        />
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={formValues.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
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
