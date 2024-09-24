import { useState } from "react";
import { User } from "../types/User";
import {
  Box,
  Heading,
  Avatar,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";

export type MyProfileProps = {
  user: User;
};

const MyProfile = ({ user }: MyProfileProps) => {
  const [loading, ] = useState(false);

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
