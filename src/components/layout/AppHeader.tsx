import React from 'react';
import { Menu, Bell, Grid3X3, User } from 'lucide-react';
import { Button } from 'antd';

interface AppHeaderProps {
  onToggleSidebar: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onToggleSidebar
}) => {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-3">
        <Button 
          type="text" 
          icon={<Menu className="h-5 w-5" />}
          onClick={onToggleSidebar} 
          className="h-8 w-8 flex items-center justify-center"
        />
        
        {/* Logo placeholder */}
        <div className="flex h-10 items-center">
          <img 
            alt="Logo" 
            className="h-8 w-auto object-contain" 
            src="/lovable-uploads/fcf5ea7d-9058-4034-bfac-f10a4aa13354.png" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button 
          type="text" 
          icon={<Bell className="h-5 w-5" />}
          className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground"
        />
        <Button 
          type="text" 
          icon={<Grid3X3 className="h-5 w-5" />}
          className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground"
        />
        <Button 
          type="text" 
          icon={<User className="h-5 w-5" />}
          className="h-9 w-9 flex items-center justify-center rounded-full bg-status-regular text-status-regular-bg"
          shape="circle"
        />
      </div>
    </header>
  );
};
