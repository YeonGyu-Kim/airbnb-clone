'use client';

import { useState } from 'react';

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, toggleOpen };
};
