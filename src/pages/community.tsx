import { useParams } from 'react-router-dom';
import {Box, Heading, Text, VStack, Container, SimpleGrid, Button} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { getCommunity } from "../api/communityApi.ts";
import  { getFoodPostsByCommunity} from "../api/foodPostApi.ts";

import { CommunityGroup} from "../types/Community.ts";
import { FoodPost} from "../types/FoodPost.ts";
import { useToast } from '@chakra-ui/react';
import { CreateFoodPostModal} from "../components/modals/createFoodPostModal.tsx";
import { User } from "../types/User.ts";

export type SingleCommunityProps = {
    user: User;
}
const SingleCommunity = ({ user }: SingleCommunityProps) => {
    const { communityId } = useParams(); // Get the communityId from the URL
    const [community, setCommunity] = useState<CommunityGroup>();
    const [foodPosts, setFoodPosts] = useState<FoodPost[]>([]);

    const [newFoodpostModal, setNewFoodpostModal] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (communityId) {
            getCommunity(parseInt(communityId))
                .then((data) => setCommunity(data))
                .catch(() => {
                    toast({
                        title: "Error",
                        description: "Failed to load community data.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                });

            // Fetch food posts for the community
            getFoodPostsByCommunity(parseInt(communityId))
                .then((data) => setFoodPosts(data))
                .catch(() => {
                    toast({
                        title: "Error",
                        description: "Failed to load food posts.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                });
        }
    }, [communityId, toast]);

    if (!community) {
        return (
            <Container maxW="container.lg" py={6}>
                <Heading as="h2" size="lg">Loading Community...</Heading>
            </Container>
        );
    }

    return (
        <Container maxW="container.lg" py={6}>
            <VStack spacing={8} align="start">
                <Box>
                    <Heading as="h2">{community.name}</Heading>
                    <Text>ID: {community.id}</Text>
                </Box>

                <Box>
                    <Heading as="h3">Food Posts</Heading>
                    {foodPosts.length > 0 ? (
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            {foodPosts.map((post) => (
                                <Box key={post.id} p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
                                    <Heading as="h4" size="md">{post.title}</Heading>
                                    <Text>{new Date(post.createdAt).toLocaleDateString()}</Text>
                                    <Text mt={4}>{post.description}</Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    ) : (
                        <Text>No food posts available.</Text>
                    )}
                </Box>
                <Box>
                    <Heading as="h3">New foodpost</Heading>
                    <Button onClick={() => setNewFoodpostModal(true)}>New</Button>
                    {newFoodpostModal &&
                        <CreateFoodPostModal
                            communityId={parseInt(communityId as string)}
                            authorUser={user}
                            isOpen={newFoodpostModal}
                            onClose={() => setNewFoodpostModal(false)}
                        />
                    }
                </Box>
            </VStack>
        </Container>
    );
};

export default SingleCommunity;
