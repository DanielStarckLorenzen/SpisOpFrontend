// Import necessary components and hooks from Chakra UI
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Container,
  useToast,
  SimpleGrid,
} from '@chakra-ui/react';
// Import Link for navigation
import { Link } from 'react-router-dom';
// Import React hooks
import { useEffect, useState } from 'react';
// Import types and API functions
import { CommunityGroup, newCommunityGroup } from '../../types/Community.ts';
import {

  getAllCommunities,
} from '../../api/communityApi.ts';
import { User } from '../../types/User.ts';

// Define props for the Communities component
export type CommunitiesProps = {
  user: User;
};

// Communities component
const Communities = ({ user }: CommunitiesProps) => {
  // Get userId from session storage
  const userId = sessionStorage.getItem('userId')?.replace(/"/g, '');
  // State for communities
  const [communities, setCommunites] = useState<
    CommunityGroup[]
  >([]);

  // Hook for displaying toast notifications
  const toast = useToast();

  // Effect to fetch user's communities on component mount
  useEffect(() => {
    if (!userId) {
      return;
    }
    // Fetch communities
    getAllCommunities().then((data) => setCommunites(data));
  }, [user, userId]);

  return (
    <Container maxW="container.lg" py={6}>
      <VStack spacing={8} align="start">
        {/* Side by side community boxes */}
        <HStack spacing={8} align="start" width="100%">
          {/* Owned Communities Section */}
          <Box width="50%">
            <Heading as="h2" size="lg" mb={4}>
              Communities
            </Heading>
            {communities.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {communities.map((community) => (
                  <Box
                    key={community.id}
                    p={6}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                    bg="white"
                  >
                    <Link to={`/community/${community.id}`}>
                      <Heading
                        as="h4"
                        size="md"
                        mb={2}
                        color="blue.500"
                        _hover={{ textDecoration: 'underline' }}
                      >
                        {community.name}
                      </Heading>
                    </Link>
                    <Text fontSize="sm">ID: {community.id}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Text>No communities available</Text>
            )}
          </Box>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Communities;
