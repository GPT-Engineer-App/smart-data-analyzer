import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, Input, Button, FormControl, FormLabel, useToast, Text } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-gsxl.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        toast({
          title: "Login successful",
          description: "You are now logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Login failed",
          description: errorData.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Unable to login.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async () => {
    // Similar to handleLogin, but with the /signup endpoint.
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <VStack spacing={4} align="flex-start">
          <Heading>Login</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
            Log in
          </Button>
          <Text>or</Text>
          <Button leftIcon={<FaUserPlus />} onClick={handleSignup}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
