import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";

interface Location {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance?: number;
}

interface LocationDropdownProps {
  locations: Location[];
  onSelect?: (location: Location) => void;
}

const LocationDropdown = ({ locations, onSelect }: LocationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Get user's geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Geolocation error:", error);
        }
      );
    }
  }, []);

  // Calculate distance using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Sort locations by distance and preselect nearest
  const sortedLocations = [...locations].map(loc => ({
    ...loc,
    distance: userLocation
      ? calculateDistance(userLocation.lat, userLocation.lng, loc.lat, loc.lng)
      : undefined
  })).sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));

  // Auto-select nearest location
  useEffect(() => {
    if (sortedLocations.length > 0 && !selectedLocation) {
      setSelectedLocation(sortedLocations[0]);
      onSelect?.(sortedLocations[0]);
    }
  }, [sortedLocations, selectedLocation, onSelect]);

  const handleSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsOpen(false);
    onSelect?.(location);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border hover:border-primary transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <MapPin className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">
          {selectedLocation?.name || "Seleccionar ubicación"}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl border border-border shadow-lg overflow-hidden z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-h-64 overflow-y-auto">
              {sortedLocations.map((location, index) => (
                <motion.button
                  key={location.id}
                  onClick={() => handleSelect(location)}
                  className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors ${
                    selectedLocation?.id === location.id ? "bg-muted" : ""
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {location.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {location.address}
                      </p>
                    </div>
                    {location.distance && (
                      <span className="text-xs font-semibold text-primary flex-shrink-0">
                        {location.distance.toFixed(1)} km
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationDropdown;
