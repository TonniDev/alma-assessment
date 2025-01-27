'use client';

import { Button, ConditionalValue } from '@chakra-ui/react';
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@ui/base/chakra/drawer';
import { useCallback, useState } from 'react';

interface DrawerProps extends React.PropsWithChildren {
  title?: React.ReactNode;
  trigger: React.ReactNode;
  placement?: ConditionalValue<'top' | 'bottom' | 'start' | 'end' | undefined>;
  size?: ConditionalValue<'sm' | 'md' | 'lg' | 'xl' | 'xs' | 'full' | undefined>;
}

export const Drawer = ({ title, trigger, placement = 'end', size = 'xl', children }: DrawerProps) => {
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback((e: { open: boolean }) => setOpen(e.open), [setOpen]);

  return (
    <DrawerRoot open={open} onOpenChange={onOpenChange} placement={placement} size={size}>
      <DrawerBackdrop />
      {/* @ts-expect-error Missing type */}
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        {title && (
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
        )}
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Close</Button>
          </DrawerActionTrigger>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
