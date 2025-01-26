'use client';

import { Button } from '@chakra-ui/react';
import { AuthRepository } from '@lib/domains/auth/repository';
import { AxiosService } from '@lib/Network/AxiosService';
import { useRouter } from 'next/navigation';

const repository = new AuthRepository(new AxiosService());

export const LogoutButton = () => {
  const { replace } = useRouter();

  const onLogout = async () => {
    await repository.logout();
    replace('/auth');
  };

  return <Button onClick={onLogout}>Logout</Button>;
};
