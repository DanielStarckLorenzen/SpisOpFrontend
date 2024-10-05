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
  getUserCommunities,
  createCommunity,
  getUserOwnedCommunities,
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
  // State for communities the user is a member of
  const [membershipCommunities, setMembershipCommunities] = useState<
    CommunityGroup[]
  >([]);
  // State for communities owned by the user
  const [ownedCommunities, setOwnerCommunities] = useState<CommunityGroup[]>(
    []
  );
  // Hook for displaying toast notifications
  const toast = useToast();

  // Effect to fetch user's communities on component mount
  useEffect(() => {
    if (!userId) {
      return;
    }
    // Fetch communities user is a member of
    getUserCommunities(userId).then((data) => setMembershipCommunities(data));
    // Fetch communities owned by the user
    getUserOwnedCommunities(userId).then((data) => setOwnerCommunities(data));
  }, [user, userId]);

  // Object for creating a new community
  const communityGroup: newCommunityGroup = {
    name: 'Opgang',
    createdBy: user,
  };

  // Function to create a new community
  const create = async () => {
    try {
      await createCommunity(communityGroup);
      // Display success toast
      toast({
        title: 'Community created.',
        description: "Your community 'Opgang' has been created successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch {
      // Display error toast if creation fails
      toast({
        title: 'Error',
        description: 'There was an issue creating the community.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.lg" py={6}>
      <VStack spacing={8} align="start">
        {/* Side by side community boxes */}
        <HStack spacing={8} align="start" width="100%">
          {/* Owned Communities Section */}
          <Box width="50%">
            <Heading as="h2" size="lg" mb={4}>
              Your Owned Communities
            </Heading>
            {ownedCommunities.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {ownedCommunities.map((community) => (
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
              <Text>No owned communities.</Text>
            )}
          </Box>

          {/* Membership Communities Section */}
          <Box width="50%">
            <Heading as="h2" size="lg" mb={4}>
              Membership Communities
            </Heading>
            {membershipCommunities.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {membershipCommunities.map((community) => (
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
              <Text>No membership communities.</Text>
            )}
          </Box>
        </HStack>

        {/* Button to create a new community */}
        <Button onClick={create} colorScheme="blue" size="lg" w="full">
          Create New Community
        </Button>
      </VStack>
    </Container>
  );
};

export default Communities;
