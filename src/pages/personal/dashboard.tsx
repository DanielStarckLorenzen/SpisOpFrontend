// Import necessary components and icons from Chakra UI and Lucide React
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Avatar,
} from '@chakra-ui/react';
import { DollarSignIcon } from 'lucide-react';

// Import API function and React hooks
import { getAllFoodPosts } from '../../api/foodPostApi.ts';
import { useEffect, useState } from 'react';

// Import custom types
import { FoodPost } from '../../types/FoodPost.ts';
import { User } from '../../types/User.ts';

// Define props for Dashboard component
export type DashboardProps = {
  user: User;
};

// Dashboard component
const Dashboard = () => {
  // State to store food posts
  const [posts, setPosts] = useState<FoodPost[]>([]);

  // Fetch food posts when component mounts
  useEffect(() => {
    getAllFoodPosts().then((data) => setPosts(data));
  }, []);

  // Log posts to console (for debugging)
  console.log(posts);

  return (
    // Main container for the dashboard
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={6}>
        <Heading mb={6}>Dashboard</Heading>
        {/* Tabs for different post categories */}
        <Tabs>
          <TabList>
            <Tab>All Posts</Tab>
            <Tab>Companies</Tab>
            <Tab>Community</Tab>
          </TabList>

          <TabPanels>
            {/* All Posts Tab */}
            <TabPanel>
              <VStack spacing={4}>
                {posts &&
                  posts.map((post) => (
                    // Individual post card
                    <Box
                      key={post.id}
                      p={4}
                      shadow="md"
                      borderWidth="1px"
                      borderRadius="md"
                    >
                      {/* Post header with author info and price */}
                      <Flex justify="space-between" align="center">
                        <HStack>
                          <Avatar
                            src={post.authorUser?.profilePicture ?? ''}
                            name={
                              post.authorUser?.firstName ??
                              post.autherCompany?.name
                            }
                          />
                          <VStack align="start">
                            <Heading size="sm">{post.title}</Heading>
                            <Text fontSize="sm">
                              {new Date(post.lastUpdated).toDateString()}
                            </Text>
                          </VStack>
                        </HStack>
                        <Badge
                          colorScheme={post.price === 0 ? 'green' : 'blue'}
                        >
                          {post.price === 0 ? 'Free' : `${post.price} DKK`}
                        </Badge>
                      </Flex>
                      {/* Post description */}
                      <Text mt={4}>{post.description}</Text>
                      {/* Action buttons */}
                      <Flex justify="space-between" mt={4}>
                        <Button variant="outline">Contact</Button>
                        <Button variant="ghost" leftIcon={<DollarSignIcon />}>
                          {post.price === 0 ? 'Claim' : 'Purchase'}
                        </Button>
                      </Flex>
                    </Box>
                  ))}
              </VStack>
            </TabPanel>
            {/* Companies Tab */}
            <TabPanel>
              <VStack spacing={4}>
                {posts &&
                  posts
                    .filter((post) => post.autherCompany)
                    .map((post) => (
                      // Individual company post card
                      <Box
                        key={post.id}
                        p={4}
                        shadow="md"
                        borderWidth="1px"
                        borderRadius="md"
                      >
                        {/* Post header with company info and price */}
                        <Flex justify="space-between" align="center">
                          <HStack>
                            <Avatar name={post.autherCompany.name ?? ''} />
                            <VStack align="start">
                              <Heading size="sm">{post.title ?? ''}</Heading>
                              <Text fontSize="sm">
                                {new Date(post.lastUpdated).toDateString() ??
                                  'No data'}
                              </Text>
                            </VStack>
                          </HStack>
                          <Badge
                            colorScheme={post.price === 0 ? 'green' : 'blue'}
                          >
                            {post.price === 0 ? 'Free' : `${post.price} DKK`}
                          </Badge>
                        </Flex>
                        {/* Post description */}
                        <Text mt={4}>{post.description}</Text>
                        {/* Action buttons */}
                        <Flex justify="space-between" mt={4}>
                          <Button variant="outline">Contact</Button>
                          <Button variant="ghost" leftIcon={<DollarSignIcon />}>
                            {post.price === 0 ? 'Claim' : 'Purchase'}
                          </Button>
                        </Flex>
                      </Box>
                    ))}
              </VStack>
            </TabPanel>
            {/* Community Tab */}
            <TabPanel>
              <VStack spacing={4}>
                {posts &&
                  posts
                    .filter((post) => post.authorUser)
                    .map((post) => (
                      // Individual community post card
                      <Box
                        key={post.id}
                        p={4}
                        shadow="md"
                        borderWidth="1px"
                        borderRadius="md"
                      >
                        {/* Post header with user info and price */}
                        <Flex justify="space-between" align="center">
                          <HStack>
                            <Avatar
                              src={post.authorUser.profilePicture ?? ''}
                              name={post.authorUser.firstName ?? ''}
                            />
                            <VStack align="start">
                              <Heading size="sm">{post.title ?? ''}</Heading>
                              <Text fontSize="sm">
                                {new Date(post.lastUpdated).toDateString() ??
                                  'No data'}
                              </Text>
                            </VStack>
                          </HStack>
                          <Badge
                            colorScheme={post.price === 0 ? 'green' : 'blue'}
                          >
                            {post.price === 0 ? 'Free' : `${post.price} DKK`}
                          </Badge>
                        </Flex>
                        {/* Post description */}
                        <Text mt={4}>{post.description}</Text>
                        {/* Action buttons */}
                        <Flex justify="space-between" mt={4}>
                          <Button variant="outline">Contact</Button>
                          <Button variant="ghost" leftIcon={<DollarSignIcon />}>
                            {post.price === 0 ? 'Claim' : 'Purchase'}
                          </Button>
                        </Flex>
                      </Box>
                    ))}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default Dashboard;
