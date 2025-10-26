import { ArrowLeft, MessageSquare, Menu as MenuIcon, UserPlus, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PhotoMosaic from "@/components/PhotoMosaic";
import LocationDropdown from "@/components/LocationDropdown";

interface RestaurantProfileProps {
  restaurant: {
    name: string;
    username: string;
    location: string;
    category: string;
    coverImage: string;
    profileImage: string;
    followers: number;
    rating: number;
    description: string;
    photos?: Array<{ id: number; url: string; alt: string }>;
    locations?: Array<{
      id: number;
      name: string;
      address: string;
      lat: number;
      lng: number;
    }>;
  };
  onBack: () => void;
  onOpenMenu: () => void;
  onFollow: () => void;
  onMessage: () => void;
  isFollowing?: boolean;
  fromFeed?: boolean;
}

const RestaurantProfile = ({ 
  restaurant, 
  onBack, 
  onOpenMenu, 
  onFollow, 
  onMessage,
  isFollowing = false,
  fromFeed = false
}: RestaurantProfileProps) => {
  const handleFollow = () => {
    onFollow();
    // Only navigate if coming from feed
    if (!fromFeed) {
      // Just animate, don't navigate
    }
  };
  return (
    <div className="fixed inset-0 z-30 bg-black overflow-y-auto">
      {/* Cover Image with blur */}
      <div className="relative h-72">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
        </div>
        
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Profile Content */}
      <div className="relative -mt-20 px-4 pb-24">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-black overflow-hidden shadow-glow-lg">
            <img src={restaurant.profileImage} alt={restaurant.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">{restaurant.name}</h1>
          <p className="text-muted-foreground mb-2">{restaurant.username}</p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span>{restaurant.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full">
            <span className="text-sm text-muted-foreground">Categoría:</span>
            <span className="text-sm font-semibold text-primary">{restaurant.category}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-xl font-bold text-white">{restaurant.followers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Seguidores</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleFollow}
              size="lg"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity relative overflow-hidden"
            >
              {isFollowing && (
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <UserPlus className="w-5 h-5 mr-2" />
              {isFollowing ? 'Siguiendo' : 'Seguir'}
            </Button>
          </motion.div>
          
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onMessage}
              size="lg"
              variant="outline"
              className="w-full h-12 rounded-xl border-border hover:bg-card"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Mensaje
            </Button>
          </motion.div>
        </div>

        {/* Menu Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onOpenMenu}
            size="lg"
            className="w-full h-14 rounded-2xl bg-black border-2 border-white text-white hover:bg-white hover:text-black transition-all"
          >
            <MenuIcon className="w-5 h-5 mr-2" />
            Ver Menú Completo
          </Button>
        </motion.div>

        {/* Description */}
        <div className="mt-6 p-4 bg-card rounded-2xl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {restaurant.description}
          </p>
        </div>

        {/* Location Selector */}
        {restaurant.locations && restaurant.locations.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Ubicaciones disponibles</h3>
            <LocationDropdown locations={restaurant.locations} />
          </div>
        )}

        {/* Photo Mosaic */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Fotos</h3>
          <PhotoMosaic photos={restaurant.photos || []} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
