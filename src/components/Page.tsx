import { ReactNode, useEffect } from 'react';

import { organizationConfig } from '../../config/organization';

export default function Page({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    document.title = `${title} | ${organizationConfig.name}`;
  }, [title]);

  return (
    <div style={{ padding: 32 }} data-testid={title}>
      {children}
    </div>
  );
}
