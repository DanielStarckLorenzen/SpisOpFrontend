// Import necessary dependencies and components
import { useState } from 'react';
import {
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Box,
  Text,
  VStack,
} from '@chakra-ui/react';
import { auth } from '../../firebase.ts';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getUser } from '../api/userApi.ts';
import { SignUpModal } from '../components/modals/signUpModal.tsx';

// Define the Login component
const Login = () => {
  // State variables for email, password, loading state, and sign-up modal visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  
  // Hook for displaying toast notifications
  const toast = useToast();

  // Function to handle the login process
  const handleLogin = () => {
    setIsLoading(true);
    try {
      // Attempt to sign in with email and password
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Fetch user data from the backend
          const user = await getUser(userCredential.user.uid);
          if (user.error) {
            // Display error toast if user data fetch fails
            toast({
              title: 'Cannot log in. Please try again.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return;
          }
          // Store user ID in session storage
          sessionStorage.setItem('userId', JSON.stringify(user.id));
          // Display success toast
          toast({
            title: 'Logged in successfully!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          // Redirect to home page
          window.location.href = '/';
        })
        .catch((error: Error) => {
          // Display error toast if login fails
          toast({
            title: 'Cannot log in. Please try again.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          console.error('Error logging in: ', error);
        });
    } catch (error) {
      // Display error toast if an exception occurs
      toast({
        title: 'Cannot log in. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error logging in: ', error);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  // Render the login form
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      px={6}
    >
      <Box w="full" maxW="md" bg="white" p={8} boxShadow="md" borderRadius="md">
        <VStack spacing={6}>
          <Heading size="xl" textAlign="center">
            Login
          </Heading>
          <Text textAlign="center" color="gray.500">
            Enter your email and password to access your account.
          </Text>
          {/* Email input field */}
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          {/* Password input field */}
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {/* Login button */}
          <Button
            isLoading={isLoading}
            loadingText="Logging in..."
            colorScheme="teal"
            onClick={handleLogin}
          >
            Login
          </Button>
          {/* Register link */}
          <Text fontSize="sm">
            Don't have an account?{' '}
            <Button
              variant="link"
              colorScheme="teal"
              onClick={() => setSignUpModalOpen(true)}
            >
              Register
            </Button>
          </Text>
        </VStack>
      </Box>
      {/* Sign-up modal */}
      {signUpModalOpen && (
        <SignUpModal
          isOpen={signUpModalOpen}
          onClose={() => setSignUpModalOpen(false)}
          login={() => handleLogin()}
          setLoginEmail={setEmail}
          setLoginPassword={setPassword}
        />
      )}
    </Box>
  );
};

export default Login;
