import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  close: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
}

const Modal = ({ isOpen, close, title, children, description }: IProps) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true"></div>
        
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" aria-hidden="true"></div>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 relative z-50 overflow-auto max-h-[80vh]"
            >
              <DialogTitle
                as="h3"
                className="text-lg font-medium text-black mb-4"
              >
                {title}
              </DialogTitle>
              {description && <p className="text-sm text-gray-500 mt-3">{description}</p>}
              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
