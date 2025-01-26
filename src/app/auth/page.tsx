'use client';

import { Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import { AuthRepository } from '@lib/domains/auth/repository';
import { AxiosService } from '@lib/Network/AxiosService';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const repository = new AuthRepository(new AxiosService());

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { replace } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await repository.login({ data: { username, password } });
    if (res.status === 200) {
      console.log('Redirecting to leads page');
      replace('/leads');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Flex direction="column" justify="center" alignItems="center" w="100%" minH="100vh">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap={4} maxW="400px" justify="center" alignItems="center" minH="100vh">
          <Image src="logo-alma.png" objectFit="contain" width="100px" alt="Alma logo" />
          <Input type="text" value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
          <Input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
          {error && <Text color="red.500">{error}</Text>}
          <Button type="submit">Login</Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default LoginPage;
