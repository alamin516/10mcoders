import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useLoadUserQuery } from './features/api/apiSlice';

type Props = {
  children: React.ReactNode;
};

const Protected = ({ children }: Props) => {
  const { data, error, isLoading, refetch } = useLoadUserQuery('loadUser');


  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-24 w-24 border-t-0 border-b-0 border-green-500"></div>
      </div>
    );
  }

  const user = data?.user;

  return user ? children : redirect('/');
};

export default Protected;
