// Import necessary dependencies and components
import { useState } from 'react';
import { User } from '../../types/User.ts';
import { deleteUser } from '../../api/userApi.ts';
import { UpdateUserModal } from '../../components/modals/updateUserModal.tsx';
import {
  Box,
  Heading,
  Avatar,
  Text,
  Spinner,
  Center,
  Button,
  useToast,
} from '@chakra-ui/react';

// Define props for MyProfile component
export type MyProfileProps = {
  user: User;
};

// MyProfile component
const MyProfile = ({ user }: MyProfileProps) => {
  // State for loading indicator
  const [loading] = useState(false);
  // Hook for displaying toast notifications
  const toast = useToast();
  // State for controlling the visibility of the update modal
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  // Function to delete the user's account
  const deleteSelf = () => {
    deleteUser(user.id)
      .then(() => {
        // Show success toast on successful deletion
        toast({
          title: 'User deleted successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Clear session storage and redirect to login page
        // Note: This redirection doesn't work as expected
        sessionStorage.removeItem('userId');
        window.location.href = '/login';
      })
      .catch((error) => {
        // Show error toast if deletion fails
        toast({
          title: error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  // Show message if no user data is found
  if (!user) {
    return (
      <Center h="100vh">
        <Text fontSize="lg">No user data found</Text>
      </Center>
    );
  }

  // Render user profile
  return (
    <Center py={6}>
      {/* User information box */}
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
      {/* User actions box */}
      <Box
        maxW="320px"
        w="full"
        bg="white"
        boxShadow="lg"
        rounded="lg"
        p={6}
        textAlign="center"
      >
        {/* Button to open update modal */}
        <Button onClick={() => setUpdateModalOpen(true)}>
          Update your profile
        </Button>
        {/* Render UpdateUserModal when updateModalOpen is true */}
        {updateModalOpen && (
          <UpdateUserModal
            user={user}
            isOpen={updateModalOpen}
            onClose={() => setUpdateModalOpen(false)}
          />
        )}

        {/* Button to delete user profile */}
        <Button
          onClick={() => {
            if (
              window.confirm(
                'Are you sure you want to delete your profile? This action cannot be undone.'
              )
            ) {
              deleteSelf();
            }
          }}
        >
          Delete your profile
        </Button>
      </Box>
    </Center>
  );
};

export default MyProfile;
