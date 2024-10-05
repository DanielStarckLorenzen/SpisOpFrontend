// Import necessary dependencies and components
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getCommunity } from '../api/communityApi.ts';
import { getFoodPostsByCommunity } from '../api/foodPostApi.ts';

// Import custom types
import { CommunityGroup } from '../types/Community.ts';
import { FoodPost } from '../types/FoodPost.ts';
import { useToast } from '@chakra-ui/react';
import { CreateFoodPostModal } from '../components/modals/createFoodPostModal.tsx';
import { User } from '../types/User.ts';

// Define props for SingleCommunity component
export type SingleCommunityProps = {
  user: User;
};

// SingleCommunity component
const SingleCommunity = ({ user }: SingleCommunityProps) => {
  // Get the communityId from the URL parameters
  const { communityId } = useParams();
  
  // State for storing community and food posts data
  const [community, setCommunity] = useState<CommunityGroup>();
  const [foodPosts, setFoodPosts] = useState<FoodPost[]>([]);

  // State for controlling the visibility of the new food post modal
  const [newFoodpostModal, setNewFoodpostModal] = useState(false);
  
  // Hook for displaying toast notifications
  const toast = useToast();

  // Effect to fetch community and food posts data when component mounts or communityId changes
  useEffect(() => {
    if (communityId) {
      // Fetch community data
      getCommunity(parseInt(communityId))
        .then((data) => setCommunity(data))
        .catch(() => {
          toast({
            title: 'Error',
            description: 'Failed to load community data.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });

      // Fetch food posts for the community
      getFoodPostsByCommunity(parseInt(communityId))
        .then((data) => setFoodPosts(data))
        .catch(() => {
          toast({
            title: 'Error',
            description: 'Failed to load food posts.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, [communityId, toast]);

  // Show loading state if community data is not yet loaded
  if (!community) {
    return (
      <Container maxW="container.lg" py={6}>
        <Heading as="h2" size="lg">
          Loading Community...
        </Heading>
      </Container>
    );
  }

  // Render the community page
  return (
    <Container maxW="container.lg" py={6}>
      <VStack spacing={8} align="start">
        {/* Display community name and ID */}
        <Box>
          <Heading as="h2">{community.name}</Heading>
          <Text>ID: {community.id}</Text>
        </Box>

        {/* Display food posts */}
        <Box>
          <Heading as="h3">Food Posts</Heading>
          {foodPosts.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {foodPosts.map((post) => (
                <Box
                  key={post.id}
                  p={6}
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <Heading as="h4" size="md">
                    {post.title}
                  </Heading>
                  <Text>{new Date(post.createdAt).toLocaleDateString()}</Text>
                  <Text mt={4}>{post.description}</Text>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Text>No food posts available.</Text>
          )}
        </Box>
        
        {/* New food post section */}
        <Box>
          <Heading as="h3">New foodpost</Heading>
          <Button onClick={() => setNewFoodpostModal(true)}>New</Button>
          {newFoodpostModal && (
            <CreateFoodPostModal
              communityId={parseInt(communityId as string)}
              authorUser={user}
              isOpen={newFoodpostModal}
              onClose={() => setNewFoodpostModal(false)}
            />
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default SingleCommunity;
