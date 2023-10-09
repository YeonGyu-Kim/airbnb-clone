import { create } from 'zustand';

type RegisterModalProps = {
  isOpen: boolean;
  label?: string;
  onOpen: () => void;
  onClose: () => void;
  setIsLogin: (action: string) => void;
};

export const useRegisterModal = create<RegisterModalProps>((set) => ({
  isOpen: false,
  label: undefined,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setIsLogin: (label: string) => set({ label }),
}));
