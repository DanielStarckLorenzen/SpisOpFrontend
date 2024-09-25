import { useState } from "react";
import { User } from "../types/User";
import { deleteUser } from "../api/userApi.ts";
import { UpdateUserModal } from "../components/modals/updateUserModal.tsx";
import {
  Box,
  Heading,
  Avatar,
  Text,
  Spinner,
  Center,
  Button,
    useToast
} from "@chakra-ui/react";

export type MyProfileProps = {
  user: User;
};

const MyProfile = ({ user }: MyProfileProps) => {
  const [loading, ] = useState(false);
  const toast = useToast();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const deleteSelf = () => {
    deleteUser(user.id)
        .then(() => {
          toast({
            title: "User deleted successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          // Clear session storage and redirect to login, this doesnt work tho
          sessionStorage.removeItem("userId");
          window.location.href = "/login";
        })
        .catch((error) => {
          toast({
            title: error,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
  }

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
      <Box
          maxW="320px"
          w="full"
          bg="white"
          boxShadow="lg"
          rounded="lg"
          p={6}
          textAlign="center"
      >
          <Button onClick={() => setUpdateModalOpen(true)}>Update your profile</Button>
          {updateModalOpen &&
              <UpdateUserModal
                  user={user}
                  isOpen={updateModalOpen}
                  onClose={() => setUpdateModalOpen(false)}
              />
          }

          <Button onClick={() => {
              if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
                  deleteSelf();
              }
            }}>
              Delete your profile
          </Button>
      </Box>
    </Center>
  );
};

export default MyProfile;
