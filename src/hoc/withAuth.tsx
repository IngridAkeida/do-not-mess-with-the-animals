import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login'); // Redireciona para a página de login se não estiver autenticado
      }
    }, [user, router]);

    if (!user) {
      return null; // Ou um spinner/carregamento enquanto verifica a autenticação
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;