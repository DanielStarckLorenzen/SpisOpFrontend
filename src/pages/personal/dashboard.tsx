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
import { getAllFoodPosts } from '../../api/foodPostApi.ts';
import { useEffect, useState } from 'react';
import { FoodPost } from '../../types/FoodPost.ts';
import { User } from '../../types/User.ts';

export type DashboardProps = {
  user: User;
};

const Dashboard = () => {
  const [posts, setPosts] = useState<FoodPost[]>([]);

  useEffect(() => {
    getAllFoodPosts().then((data) => setPosts(data));
  }, []);

  console.log(posts);

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={6}>
        <Heading mb={6}>Dashboard</Heading>
        <Tabs>
          <TabList>
            <Tab>All Posts</Tab>
            <Tab>Companies</Tab>
            <Tab>Community</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack spacing={4}>
                {posts &&
                  posts.map((post) => (
                    <Box
                      key={post.id}
                      p={4}
                      shadow="md"
                      borderWidth="1px"
                      borderRadius="md"
                    >
                      <Flex justify="space-between" align="center">
                        <HStack>
                          <Avatar src={post.authorUser?.profilePicture ?? ''} name={post.authorUser?.firstName ?? post.autherCompany?.name} />
                          <VStack align="start">
                            <Heading size="sm">{post.title}</Heading>
                            <Text fontSize="sm">{new Date(post.lastUpdated).toDateString()}</Text>
                          </VStack>
                        </HStack>
                        <Badge
                          colorScheme={post.price === 0 ? 'green' : 'blue'}
                        >
                          {post.price === 0 ? 'Free' : `${post.price} DKK`}
                        </Badge>
                      </Flex>
                      <Text mt={4}>{post.description}</Text>
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
            <TabPanel>
              <VStack spacing={4}>
                {posts &&
                  posts
                    .filter((post) => post.autherCompany)
                    .map((post) => (
                      <Box
                        key={post.id}
                        p={4}
                        shadow="md"
                        borderWidth="1px"
                        borderRadius="md"
                      >
                        <Flex justify="space-between" align="center">
                          <HStack>
                            <Avatar
                              name={post.autherCompany.name ?? ''}
                            />
                            <VStack align="start">
                              <Heading size="sm">{post.title ?? ''}</Heading>
                              <Text fontSize="sm">
                                {new Date(post.lastUpdated).toDateString() ?? 'No data'}
                              </Text>
                            </VStack>
                          </HStack>
                          <Badge
                            colorScheme={post.price === 0 ? 'green' : 'blue'}
                          >
                            {post.price === 0 ? 'Free' : `${post.price} DKK`}
                          </Badge>
                        </Flex>
                        <Text mt={4}>{post.description}</Text>
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
            <TabPanel>
              <VStack spacing={4}>
                {posts &&
                  posts
                    .filter((post) => post.authorUser)
                    .map((post) => (
                      <Box
                        key={post.id}
                        p={4}
                        shadow="md"
                        borderWidth="1px"
                        borderRadius="md"
                      >
                        <Flex justify="space-between" align="center">
                          <HStack>
                            <Avatar
                              src={post.authorUser.profilePicture ?? ''}
                              name={post.authorUser.firstName ?? ''}
                            />
                            <VStack align="start">
                              <Heading size="sm">
                                {post.title?? ''}
                              </Heading>
                              <Text fontSize="sm">
                                {new Date(post.lastUpdated).toDateString() ?? 'No data'}
                              </Text>
                            </VStack>
                          </HStack>
                          <Badge
                            colorScheme={post.price === 0 ? 'green' : 'blue'}
                          >
                            {post.price === 0 ? 'Free' : `${post.price} DKK`}
                          </Badge>
                        </Flex>
                        <Text mt={4}>{post.description}</Text>
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
