import { SearchIcon } from '@chakra-ui/icons';
import {Container, Flex, HStack, IconButton, Input, InputGroup, InputLeftElement, Text} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {UserIcon} from "lucide-react";
import {User} from "../types/User.ts";

export type NavbarProps = {
  user: User;
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <Flex as="header" bg="white" shadow="md" position="sticky" top={0} zIndex={10} py={4}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <HStack spacing={6}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/companies">Companies</Link>
            <Link to="/community">Community</Link>
          </HStack>
          <HStack spacing={4}>
            {user.admin && (
              <Text fontStyle="italic">Admin View</Text>
            )}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input placeholder="Search" size="md" />
            </InputGroup>
            <Link to="/myProfile">
              <IconButton icon={<UserIcon />} aria-label="Profile" />
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
