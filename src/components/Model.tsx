import { FC, Fragment, ReactNode, useCallback, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";

interface ModelProps {
  isOpen: boolean;
  onclose: () => void;
  children?: ReactNode;
  title?: string;
  rootClassName?: string;
  className?: string;
  addVendor?: boolean;
}

export const Model: FC<ModelProps> = ({
  isOpen,
  onclose,
  children,
  title,
  className,
  addVendor,
  rootClassName,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const handleDialogClose = useCallback(() => onclose(), [onclose]);
  // Helper function to check if an element is an HTMLElement
  useCallback(function isHTMLElement(
    target: EventTarget | null
  ): target is HTMLElement {
    return target instanceof HTMLElement;
  },
  []);
  return (
    // <Transition.Root show={isOpen} as={Fragment}>
    <Dialog
      ref={dialogRef}
      open={isOpen}
      as={"div"}
      className="relative z-50"
      onClose={() => {
        // addVendor ? "" : onclose();
      }}
    >
      {/* <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        > */}
      <div className="fixed inset-0 bg-black/30" />
      {/* </Transition.Child> */}

      <div
        className="fixed inset-0 overflow-y-auto"
        onClick={handleDialogClose}
      >
        <div className="flex min-h-full items-center justify-center text-center">
          {/* <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 xs:translate-y-0 xs:scale-95"
              enterTo="opacity-100 translate-y-0 xs:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 xs:scale-100"
              leaveTo="opacity-0 translate-y-4 xs:translate-y-0 xs:scale-95"
            > */}
          <Dialog.Panel
            ref={dialogRef}
            className={` ${rootClassName} relative transform overflow-hidden rounded-xl bg-white w-full max-w-[96%] shadow-xl transition-all`}
          >
            <div
              className={` ${className} pt-8 px-8 pb-2 flex justify-between items-center`}
            >
              <Dialog.Title as="h2" className="text-2xl font-extrabold">
                {title}
              </Dialog.Title>

              <button
                type="button"
                className="inline-flex justify-center rounded-md focus:outline-none "
                onClick={onclose}
              >
                <RxCross2 className=" text-slate-500 w-6 h-6" />
              </button>
            </div>
            {children}
          </Dialog.Panel>
          {/* </Transition.Child> */}
        </div>
      </div>
    </Dialog>
    // </Transition.Root>
  );
};
