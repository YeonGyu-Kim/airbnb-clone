'use client';

import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import Button from '../Button';

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
};

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubmit = () => {
    if (disabled) {
      return;
    }
    onSubmit();
  };

  const handleSecondaryAction = () => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
        <div
          className={`relative w-4/6 max-w-xl h-auto bg-white rounded-lg duration-300
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className='flex p-6 justify-center border-b-[1px]'>
            <button
              onClick={handleClose}
              className='absolute left-9 p-1 border-0 hover:opacity-70 transition'
            >
              <IoMdClose size={18} />
            </button>
            <div className='font-semibold'>{title}</div>
          </div>
          <div className='p-6'>
            <div>{body}</div>
            <div className='flex gap-2 py-6'>
              <Button
                disabled={disabled}
                label={actionLabel}
                onClick={handleSubmit}
              />
            </div>
            <div>{footer}</div>
          </div>
        </div>
      </div>
    </>
  );
}
