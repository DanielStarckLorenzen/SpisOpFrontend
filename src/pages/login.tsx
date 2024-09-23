import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Basic validation (you can expand this)
    if (username === "user" && password === "password") {
      sessionStorage.setItem("userId", "user1");
      toast({
        title: "Login successful",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/dashboard"); // Redirect to the dashboard
    } else {
      toast({
        title: "Invalid credentials",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
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
      <Box
        w="full"
        maxW="md"
        bg="white"
        p={8}
        boxShadow="md"
        borderRadius="md"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Login
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleLogin} width="full">
            Login
          </Button>
        </VStack>
        <Text mt={4} textAlign="center" fontSize="sm" color="gray.600">
          Use <strong>user</strong> and <strong>password</strong> to log in.
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
