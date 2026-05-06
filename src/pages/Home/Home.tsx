import { useUserStore } from '@/store/userStore';
import { GuestView } from './components/GuestView';
import { UserDashboard } from './components/UserDashboard';

export default function Home() {
  const userData = useUserStore((state) => state.userData);
  const clearUserData = useUserStore((state) => state.clearUserData);

  if (userData) {
    return <UserDashboard userData={userData} onClear={clearUserData} />;
  }

  return <GuestView />;
}
