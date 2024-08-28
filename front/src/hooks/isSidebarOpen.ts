import React, { useState, useCallback } from 'react';

export const useIsSidebarOpenState = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return isSidebarOpen;
};

export const useIsSidebarOpenMutator = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleIsSidebarOpen = useCallback(() => {
    setIsSidebarOpen(prevState => !prevState);
  }, []);

  const setSidebarOpen = useCallback((open) => {
    setIsSidebarOpen(open);
  }, []);

  return { setSidebarOpen, toggleIsSidebarOpen };
};
