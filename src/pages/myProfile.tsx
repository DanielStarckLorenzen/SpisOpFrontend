import { useEffect, useState } from "react";
import { User } from "../types/User";
import { getUser } from "../api/userApi";
import {
  Box,
  Heading,
  Avatar,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";

const MyProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId")?.replace(/"/g, '');
    if (userId) {
      getUser(userId).then((userData) => {
        setUser(userData);
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!user) {
    return (
      <Center h="100vh">
        <Text fontSize="lg">No user data found</Text>
      </Center>
    );
  }

  return (
    <Center py={6}>
      <Box
        maxW="320px"
        w="full"
        bg="white"
        boxShadow="lg"
        rounded="lg"
        p={6}
        textAlign="center"
      >
        <Avatar size="xl" src={user.profilePicture} mb={4} />
        <Heading fontSize="2xl" fontFamily="body">
          {user.firstName} {user.lastName}
        </Heading>
        <Text fontWeight={600} color="gray.500" mb={4}>
          {user.email}
        </Text>
      </Box>
    </Center>
  );
};

export default MyProfile;
