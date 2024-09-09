import { Badge, Box, Button, Container, Flex, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, Avatar } from '@chakra-ui/react';
import {DollarSignIcon} from "lucide-react";

const Dashboard = () => {
  const posts = [
    {
      id: 1,
      author: 'Green Bakery',
      type: 'company',
      content: 'We have 20 loaves of bread that will expire tomorrow. First come, first served!',
      timestamp: '2 hours ago',
      avatar: '/placeholder.svg?height=40&width=40',
      price: 0,
    },
    {
      id: 2,
      author: 'Sarah',
      type: 'community',
      content: 'I made too much lasagna. Anyone want to pick up a portion?',
      timestamp: '3 hours ago',
      avatar: '/placeholder.svg?height=40&width=40',
      price: 2,
    },
    {
      id: 3,
      author: 'Fresh Foods Market',
      type: 'company',
      content: 'Slightly bruised apples available. Still perfect for cooking!',
      timestamp: '5 hours ago',
      avatar: '/placeholder.svg?height=40&width=40',
      price: 1,
    },
    {
      id: 4,
      author: 'Local Restaurant',
      type: 'company',
      content: 'Surplus prepared meals available. Help us reduce waste!',
      timestamp: '1 hour ago',
      avatar: '/placeholder.svg?height=40&width=40',
      price: 3,
    },
    {
      id: 5,
      author: 'Community Garden',
      type: 'community',
      content: 'Excess vegetables from our garden. Free to good homes!',
      timestamp: '4 hours ago',
      avatar: '/placeholder.svg?height=40&width=40',
      price: 0,
    },
  ];

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
                {posts.map((post) => (
                  <Box key={post.id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                    <Flex justify="space-between" align="center">
                      <HStack>
                        <Avatar src={post.avatar} name={post.author} />
                        <VStack align="start">
                          <Heading size="sm">{post.author}</Heading>
                          <Text fontSize="sm">{post.timestamp}</Text>
                        </VStack>
                      </HStack>
                      <Badge colorScheme={post.price === 0 ? 'green' : 'blue'}>
                        {post.price === 0 ? 'Free' : `${post.price} DKK`}
                      </Badge>
                    </Flex>
                    <Text mt={4}>{post.content}</Text>
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
                {posts
                  .filter((post) => post.type === 'company')
                  .map((post) => (
                    <Box key={post.id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                      <Flex justify="space-between" align="center">
                        <HStack>
                          <Avatar src={post.avatar} name={post.author} />
                          <VStack align="start">
                            <Heading size="sm">{post.author}</Heading>
                            <Text fontSize="sm">{post.timestamp}</Text>
                          </VStack>
                        </HStack>
                        <Badge colorScheme={post.price === 0 ? 'green' : 'blue'}>
                          {post.price === 0 ? 'Free' : `${post.price} DKK`}
                        </Badge>
                      </Flex>
                      <Text mt={4}>{post.content}</Text>
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
                {posts
                  .filter((post) => post.type === 'community')
                  .map((post) => (
                    <Box key={post.id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                      <Flex justify="space-between" align="center">
                        <HStack>
                          <Avatar src={post.avatar} name={post.author} />
                          <VStack align="start">
                            <Heading size="sm">{post.author}</Heading>
                            <Text fontSize="sm">{post.timestamp}</Text>
                          </VStack>
                        </HStack>
                        <Badge colorScheme={post.price === 0 ? 'green' : 'blue'}>
                          {post.price === 0 ? 'Free' : `${post.price} DKK`}
                        </Badge>
                      </Flex>
                      <Text mt={4}>{post.content}</Text>
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
