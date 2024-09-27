import { useState } from "react";
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
} from "@chakra-ui/react";
import { createFoodPost } from "../../api/foodPostApi.ts";
import { User } from "../../types/User.ts";
import {newFoodPost} from "../../types/FoodPost.ts";

export type CreateFoodPostModalProps = {
    communityId: number,
    authorUser: User,
    isOpen: boolean;
    onClose: () => void;
};

export function CreateFoodPostModal({ communityId, authorUser, isOpen, onClose }: CreateFoodPostModalProps) {
    // Form values for creating a new food post
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        image: '',
        price: 0,
        allergies: '', // A comma-separated string of allergies
    });

    const toast = useToast();

    // Handle input changes for form fields
    const handleInputChange = (key: string, value: string | number) => {
        setFormValues({
            ...formValues,
            [key]: value
        });
    };

    // Create food post function
    const create = () => {
        const newPost : newFoodPost = {
            title: formValues.title,
            description: formValues.description,
            image: formValues.image,
            price: formValues.price,
            author: authorUser,
            spaceId: communityId,
            type: 'community',
            allergies: formValues.allergies.split(',').map(allergy => allergy.trim()) // Convert comma-separated string to array
        };

        createFoodPost(newPost).then(() => {
            toast({
                title: "Food post created successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onClose();
        }).catch(error => {
            toast({
                title: "Error creating food post: " + error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            console.error("Error creating food post: ", error);
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Food Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired mb={4}>
                        <FormLabel>Title</FormLabel>
                        <Input
                            placeholder="Enter the title of the food post"
                            value={formValues.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                        />
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder="Describe the food post"
                            value={formValues.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Image URL</FormLabel>
                        <Input
                            placeholder="Enter the image URL"
                            value={formValues.image}
                            onChange={(e) => handleInputChange("image", e.target.value)}
                        />
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Price</FormLabel>
                        <Input
                            type="number"
                            placeholder="Enter the price"
                            value={formValues.price}
                            onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Allergies (comma-separated)</FormLabel>
                        <Input
                            placeholder="E.g. Nuts, Gluten"
                            value={formValues.allergies}
                            onChange={(e) => handleInputChange("allergies", e.target.value)}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={create}>
                        Create
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
