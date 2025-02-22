import { useNavigate } from "react-router-dom";

export const useAppNavigation = () => {
  const navigate = useNavigate();

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  return handleNavigation;
};
