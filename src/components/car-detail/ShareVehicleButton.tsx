
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Car } from '../../types/car';
import { Input } from '../ui/input';

interface ShareVehicleButtonProps {
  car: Car;
  variant?: 'default' | 'icon';
}

export const ShareVehicleButton = ({ car, variant = 'default' }: ShareVehicleButtonProps) => {
  const [open, setOpen] = useState(false);
  
  const handleShare = () => {
    setOpen(true);
  };

  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/car/${car.id}`;
  };

  const copyToClipboard = () => {
    const shareUrl = getShareUrl();
    navigator.clipboard.writeText(shareUrl);
    toast.success('Enlace copiado al portapapeles', {
      description: 'Ya puedes compartirlo donde quieras.'
    });
    setOpen(false);
  };

  const shareOnSocialMedia = (platform: 'whatsapp' | 'facebook' | 'twitter') => {
    const shareUrl = getShareUrl();
    const text = `Mira este ${car.brand} ${car.model} (${car.year}) en AutoVenta`;
    
    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(`${text}: ${shareUrl}`)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text}: ${shareUrl}`)}`;
        break;
    }
    
    window.open(url, '_blank');
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleShare}
        variant="outline"
        className={variant === 'default' ? "flex-1" : ""}
        aria-label="Compartir vehículo"
      >
        <Share2 className="mr-2 h-5 w-5" />
        {variant === 'default' && "Compartir"}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartir vehículo</DialogTitle>
            <DialogDescription>
              Comparte este {car.brand} {car.model} ({car.year}) con tus amigos y familiares.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="aspect-ratio-container">
              <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
                <img 
                  src={car.images[0]} 
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Input 
                value={getShareUrl()} 
                readOnly 
                className="flex-1" 
              />
              <Button onClick={copyToClipboard} className="shrink-0">
                Copiar
              </Button>
            </div>
            
            <div className="flex justify-center space-x-4 pt-2">
              <Button 
                onClick={() => shareOnSocialMedia('whatsapp')} 
                className="bg-green-600 hover:bg-green-700"
              >
                WhatsApp
              </Button>
              <Button 
                onClick={() => shareOnSocialMedia('facebook')} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Facebook
              </Button>
              <Button 
                onClick={() => shareOnSocialMedia('twitter')} 
                className="bg-sky-500 hover:bg-sky-600"
              >
                Twitter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareVehicleButton;
