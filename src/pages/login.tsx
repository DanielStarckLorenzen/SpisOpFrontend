import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { auth } from '../../firebase.ts';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getUser } from '../api/userApi.ts';
import { SignUpModal } from '../components/modals/signUpModal.tsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const toast = useToast();

  const handleLogin = () => {
    setIsLoading(true);
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = await getUser(userCredential.user.uid);
          if (user.error) {
            toast({
              title: 'Cannot log in. Please try again.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return;
          }
          sessionStorage.setItem('userId', JSON.stringify(user.id));
          toast({
            title: 'Logged in successfully!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          window.location.href = '/';
        })
        .catch((error) => {
          toast({
            title: 'Cannot log in. Please try again.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          console.error('Error logging in: ', error);
        });
    } catch (error) {
      toast({
        title: 'Cannot log in. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error logging in: ', error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
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
