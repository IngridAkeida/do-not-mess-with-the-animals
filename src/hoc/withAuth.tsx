import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { user, loading } = useAuth(); // Adicione o estado de carregamento
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login'); // Redireciona para a página de login se não estiver autenticado
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return null; // Ou um spinner/carregamento enquanto verifica a autenticação
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;