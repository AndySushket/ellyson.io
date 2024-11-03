'use client';

import React from "react";
import { Button } from "@mui/material";
import { useRouter, usePathname } from 'next/navigation'
import { useGlobalState } from 'state/GlobalStateProvider';

interface ICustomLink {
  dest: string;
  children: React.ReactNode;
  // setLocation: (dest: string) => void;
}

// eslint-disable-next-line no-shadow
const CustomLink: React.FC<ICustomLink> = ({
  dest,
  children,
}: ICustomLink) => {
  const { updateState } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();
  const handleDelayedLinkClick =
    (to: string, delay: number) => (event: any) => {
      event.preventDefault();
      updateState("location", to);
      if (!pathname.includes("/") && !pathname.includes("projects")) {
        router.push(to);
      }
      setTimeout(() => {
        router.push(to);
      }, delay);
    };

  return (
    <Button color="primary" onClick={handleDelayedLinkClick(dest, 750)}>{children}</Button>
  );
};

export default CustomLink;
