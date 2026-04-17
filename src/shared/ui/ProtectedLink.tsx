import { useState, type MouseEvent } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { useAuthStore } from "@/src/shared/store/authStore";
import { AuthModal } from "@/src/shared/ui/AuthModal";

export const ProtectedLink = ({ onClick, ...props }: LinkProps) => {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    console.log("click", { user, isLoading }); 
    if (onClick) onClick(event);
    if (event.defaultPrevented) return;

    if (!user) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(true);
    }
  };

  return (
    <>
      <Link {...props} onClick={handleClick} />
      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
