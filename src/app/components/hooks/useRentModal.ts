import { create } from 'zustand';

type RentModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useRentModal = create<RentModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
