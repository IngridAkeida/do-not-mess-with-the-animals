import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login'); // Redireciona para a página de login se não estiver autenticado
      }
    }, [user, loading, router]);

    if (loading) {
      return <div>Loading...</div>; // Exibe um indicador de carregamento enquanto verifica a autenticação
    }

    if (!user) {
      return null; // Redireciona para login, mas o useEffect acima já está lidando com isso
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
