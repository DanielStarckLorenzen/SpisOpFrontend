import { useState, useEffect } from 'react';
import { User } from '../types/User.ts';
import { Company } from '../types/Company.ts';
import { getCompanies } from '../api/companyApi.ts';
import { Box, Heading, VStack, Text, Container } from '@chakra-ui/react';

export type CompaniesProps = {
  user: User;
};

const Companies = ({ user }: CompaniesProps) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const fetchedCompanies = await getCompanies();
        setCompanies(fetchedCompanies);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <Text>Loading companies...</Text>;
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" mb={6}>Companies</Heading>
      <VStack spacing={4} align="stretch">
        {companies.map((company) => (
          <Box key={company.id} p={4} borderWidth={1} borderRadius="md">
            <Heading as="h2" size="md">{company.name}</Heading>
            <Text>{company.description}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Companies;
