import { useNavigate } from 'react-router-dom';

const validRoutes = ['/home', '/about', '/signup', '/login'];

export const useAppNavigation = () => {
  const navigate = useNavigate();

  const handleNavigation = (url: string) => {
    if (validRoutes.includes(url)) {
      navigate(url);
    } else {
      console.error(`Invalid route: ${url}`);
    }
  };

  return handleNavigation;
};
