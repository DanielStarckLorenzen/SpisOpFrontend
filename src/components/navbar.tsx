// Import necessary components and icons from Chakra UI
import { SearchIcon } from '@chakra-ui/icons';
import {
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';

// Import Link component for navigation
import { Link } from 'react-router-dom';

// Import UserIcon from Lucide React
import { UserIcon } from 'lucide-react';

// Import User type
import { User } from '../types/User.ts';

// Define props for Navbar component
export type NavbarProps = {
  user: User;
};

// Navbar component
const Navbar = ({ user }: NavbarProps) => {
  return (
    // Main Flex container for the navbar
    <Flex
      as="header"
      bg="white"
      shadow="md"
      position="sticky"
      top={0}
      zIndex={10}
      py={4}
    >
      <Container maxW="container.xl">
        {/* Flex container for navbar content */}
        <Flex justify="space-between" align="center">
          {/* Left side of navbar with navigation links */}
          <HStack spacing={6}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/companies">Companies</Link>
            <Link to="/community">Community</Link>
          </HStack>
          {/* Right side of navbar with search and profile */}
          <HStack spacing={4}>
            {/* Conditional rendering for admin view */}
            {user.admin && <Text fontStyle="italic">Admin View</Text>}
            {/* Search input group */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input placeholder="Search" size="md" />
            </InputGroup>
            {/* Profile link with icon button */}
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
