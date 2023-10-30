import { create } from 'zustand';

type SearchModalProps = {
  isOpen: boolean;
  label?: string;
  onOpen: () => void;
  onClose: () => void;
  setIsLogin: (action: string) => void;
};

export const useSearchModal = create<SearchModalProps>((set) => ({
  isOpen: false,
  label: undefined,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setIsLogin: (label: string) => set({ label }),
}));
