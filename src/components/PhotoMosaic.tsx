import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon } from "lucide-react";

interface Photo {
  id: number;
  url: string;
  alt: string;
}

interface PhotoMosaicProps {
  photos: Photo[];
}

const PhotoMosaic = ({ photos }: PhotoMosaicProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Show placeholder if no photos
  const displayItems = photos.length > 0 
    ? photos 
    : Array(9).fill(null).map((_, i) => ({
        id: i,
        url: "",
        alt: "Placeholder"
      }));

  return (
    <>
      <div className="grid grid-cols-3 gap-1">
        {displayItems.map((photo) => (
          <motion.button
            key={photo.id}
            onClick={() => photo.url && setSelectedPhoto(photo)}
            className="aspect-square bg-muted rounded-lg overflow-hidden relative group"
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
          >
            {photo.url ? (
              <>
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            <motion.img
              src={selectedPhoto.url}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-full rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoMosaic;
