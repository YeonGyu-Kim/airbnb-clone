import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '@/app/types';
import { useRegisterModal } from './useRegisterModal';

type useFavoriteProps = {
  listingId: string;
  currentUser?: SafeUser | null;
};

export default function UseFavorite({
  listingId,
  currentUser,
}: useFavoriteProps) {
  const router = useRouter();
  const { onOpen } = useRegisterModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!currentUser) return onOpen();

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success('Success');
      } catch (error) {
        toast.error('Something went wrong.');
      }
    },
    [currentUser, onOpen, hasFavorited, listingId, router]
  );

  return { hasFavorited, toggleFavorite };
}
