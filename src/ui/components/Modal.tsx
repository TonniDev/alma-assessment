import { Button, ConditionalValue } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@ui/base/chakra/dialog';

interface ModalProps extends React.PropsWithChildren {
  placement?: ConditionalValue<'center' | 'top' | 'bottom' | undefined>;
  motionPreset?: 'slide-in-bottom' | 'slide-in-top' | 'slide-in-left' | 'slide-in-right';
  onClose: (e?: boolean) => void;
  title?: string;
  open?: boolean;
  trigger?: React.ReactNode;
}

export const Modal = ({
  open,
  onClose,
  placement = 'center',
  motionPreset = 'slide-in-bottom',
  title,
  trigger,
  children,
}: ModalProps) => {
  const handleClose = (e: { open: boolean }) => (e.open ? onClose(true) : onClose(false));
  return (
    <DialogRoot placement={placement} motionPreset={motionPreset} lazyMount open={open} onOpenChange={handleClose}>
      {/* @ts-expect-error Missing type */}
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      {/* @ts-expect-error Missing type */}
      <DialogContent>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <DialogBody>{children}</DialogBody>
        <DialogFooter justifyContent="center">
          <DialogActionTrigger asChild>
            <Button variant="solid" onClick={() => onClose(false)}>
              Go Back to Homepage
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
