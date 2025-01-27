import { Drawer as ChakraDrawer, Portal } from '@chakra-ui/react';
import { CloseButton } from './close-button';
import * as React from 'react';

interface DrawerContentProps extends ChakraDrawer.ContentProps, React.PropsWithChildren {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  // @ts-expect-error Missing type
  offset?: ChakraDrawer.ContentProps['padding'];
}

type DrawerCloseTriggerProps = ChakraDrawer.CloseTriggerProps & React.PropsWithChildren;

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(function DrawerContent(props, ref) {
  const { children, portalled = true, portalRef, offset, ...rest } = props;
  return (
    <Portal disabled={!portalled} container={portalRef}>
      {/* @ts-expect-error Missing type */}
      <ChakraDrawer.Positioner padding={offset}>
        {/* @ts-expect-error Missing type */}
        <ChakraDrawer.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDrawer.Content>
      </ChakraDrawer.Positioner>
    </Portal>
  );
});

export const DrawerCloseTrigger = React.forwardRef<HTMLButtonElement, DrawerCloseTriggerProps>(
  function DrawerCloseTrigger(props, ref) {
    return (
      // @ts-expect-error Missing type
      <ChakraDrawer.CloseTrigger position="absolute" top="2" insetEnd="2" {...props} asChild>
        <CloseButton size="sm" ref={ref} />
      </ChakraDrawer.CloseTrigger>
    );
  },
);

export const DrawerTrigger = ChakraDrawer.Trigger;
export const DrawerRoot = ChakraDrawer.Root;
export const DrawerFooter = ChakraDrawer.Footer;
export const DrawerHeader = ChakraDrawer.Header;
export const DrawerBody = ChakraDrawer.Body;
export const DrawerBackdrop = ChakraDrawer.Backdrop;
export const DrawerDescription = ChakraDrawer.Description;
export const DrawerTitle = ChakraDrawer.Title;
export const DrawerActionTrigger = ChakraDrawer.ActionTrigger;
