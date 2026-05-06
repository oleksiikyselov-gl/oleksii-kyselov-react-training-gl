import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { type RegistrationData } from '@/pages/RegistrationForm/schema';

interface UserState {
  userData: RegistrationData | null;
  setUserData: (data: RegistrationData) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      set => ({
        userData: null,
        setUserData: data => set({ userData: data }),
        clearUserData: () => set({ userData: null }),
      }),
      { name: 'user-storage' }
    )
  )
);
