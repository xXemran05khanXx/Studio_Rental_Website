import {create} from 'zustand';

interface useLoginModal {
  isopen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<useLoginModal>((set) => ({
  isopen: false,
  onOpen: () => set({ isopen: true }),
  onClose: () => set({ isopen: false }),
}));

export default useLoginModal;
