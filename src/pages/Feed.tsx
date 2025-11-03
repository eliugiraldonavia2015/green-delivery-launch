import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Home, Bell, ShoppingCart, MessageSquare, User, 
  Heart, Share2, Bookmark, Music, Flame, Plus 
} from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import RestaurantProfile from "@/components/RestaurantProfile";
import RestaurantMenu from "@/components/RestaurantMenu";
import RiderRing from "@/components/RiderRing";
import MessagesLayout from "@/components/MessagesLayout";
import CheckoutTimeline from "@/components/CheckoutTimeline";
import UserProfile from "@/components/UserProfile";
import Notifications from "@/components/Notifications";
import CommentOverlay from "@/components/CommentOverlay";
import ShareOverlay from "@/components/ShareOverlay";
import MusicPlayerOverlay from "@/components/MusicPlayerOverlay";
import Shop from "@/components/Shop";
import chefLoading from "@/assets/chef-loading.jpg";

interface Video {
  id: number;
  username: string;
  description: string;
  music: string;
  likes: number;
  comments: number;
  profileImage: string;
  videoUrl: string;
}

const mockVideos: Video[] = [
  {
    id: 1,
    username: "@tacoselrey",
    description: "Los mejores tacos al pastor de la ciudad 🌮✨ #tacos #comida #cdmx",
    music: "Sonido Original - Tacos El Rey",
    likes: 12500,
    comments: 340,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=taco",
    videoUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=1000&fit=crop"
  },
  {
    id: 2,
    username: "@pizzalovers",
    description: "Pizza artesanal con masa madre 🍕 Recién salida del horno",
    music: "Italian Vibes - Chef Antonio",
    likes: 18200,
    comments: 520,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=pizza",
    videoUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=1000&fit=crop"
  },
  {
    id: 3,
    username: "@sushimaster",
    description: "Sushi rolls premium 🍣 Arte en cada bocado #sushi #japanese",
    music: "Tokyo Nights - Sushi Master",
    likes: 25300,
    comments: 680,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sushi",
    videoUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=1000&fit=crop"
  },
  {
    id: 4,
    username: "@burgerhouse",
    description: "Smash burger con doble carne 🍔 Simplemente perfecta",
    music: "Burger Beats - House Special",
    likes: 31400,
    comments: 890,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=burger",
    videoUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=1000&fit=crop"
  },
  {
    id: 5,
    username: "@pastaparadise",
    description: "Carbonara auténtica italiana 🍝 Receta tradicional",
    music: "Roma Nights - Pasta Paradise",
    likes: 21800,
    comments: 450,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=pasta",
    videoUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=1000&fit=crop"
  },
  {
    id: 6,
    username: "@dessertheaven",
    description: "Cheesecake de fresa 🍰 El postre perfecto",
    music: "Sweet Dreams - Dessert Heaven",
    likes: 19500,
    comments: 380,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=dessert",
    videoUrl: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600&h=1000&fit=crop"
  },
  {
    id: 7,
    username: "@ramenspot",
    description: "Ramen picante con huevo perfecto 🍜 #ramen #spicy",
    music: "Asian Fusion - Ramen Spot",
    likes: 28700,
    comments: 720,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=ramen",
    videoUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=1000&fit=crop"
  },
  {
    id: 8,
    username: "@wingsworld",
    description: "Alitas BBQ con salsa secreta 🔥🍗 Nivel experto",
    music: "Spicy Beats - Wings World",
    likes: 23400,
    comments: 610,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=wings",
    videoUrl: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&h=1000&fit=crop"
  },
  {
    id: 9,
    username: "@smoothiebar",
    description: "Smoothie bowl tropical 🥥🍓 Energía natural",
    music: "Tropical Vibes - Smoothie Bar",
    likes: 16200,
    comments: 290,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=smoothie",
    videoUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=1000&fit=crop"
  },
  {
    id: 10,
    username: "@bbqkings",
    description: "Costillas ahumadas 12 horas 🔥 BBQ auténtico",
    music: "Smokey Beats - BBQ Kings",
    likes: 34500,
    comments: 980,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=bbq",
    videoUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=1000&fit=crop"
  }
];

const mockRestaurant = {
  name: "Tacos El Rey",
  username: "@tacoselrey",
  location: "CDMX, México",
  category: "Comida Mexicana",
  coverImage: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=400&fit=crop",
  profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=taco",
  followers: 45200,
  rating: 4.8,
  description: "Los auténticos tacos al pastor de la ciudad. Receta familiar desde 1985. Disfruta de la tradición en cada bocado 🌮✨",
  photos: [
    { id: 1, url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=400&fit=crop", alt: "Tacos al pastor" },
    { id: 2, url: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=400&fit=crop", alt: "Tacos de carnitas" },
    { id: 3, url: "https://images.unsplash.com/photo-1613514785940-daed07799d19?w=400&h=400&fit=crop", alt: "Quesadillas" },
    { id: 4, url: "https://images.unsplash.com/photo-1623961991178-17a6a5e70ad3?w=400&h=400&fit=crop", alt: "Salsas mexicanas" },
    { id: 5, url: "https://images.unsplash.com/photo-1566003020713-0ef600c9161c?w=400&h=400&fit=crop", alt: "Tacos variados" },
    { id: 6, url: "https://images.unsplash.com/photo-1564767655658-4e6b365884ff?w=400&h=400&fit=crop", alt: "Bebidas mexicanas" }
  ],
  locations: [
    { id: 1, name: "Sucursal Centro", address: "Av. Juárez 123, Centro", lat: 19.4326, lng: -99.1332 },
    { id: 2, name: "Sucursal Roma", address: "Calle Orizaba 45, Roma Norte", lat: 19.4180, lng: -99.1626 },
    { id: 3, name: "Sucursal Condesa", address: "Av. Michoacán 78, Condesa", lat: 19.4105, lng: -99.1707 }
  ]
};

const Feed = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"following" | "foryou">("foryou");
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [following, setFollowing] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [currentMusicInfo, setCurrentMusicInfo] = useState({ name: "", artist: "" });
  const [highlightedDish, setHighlightedDish] = useState<number | undefined>();
  const [selectedRestaurant, setSelectedRestaurant] = useState<{ name: string; avatar: string } | null>(null);
  const [showShop, setShowShop] = useState(false);
  const [showShopLoading, setShowShopLoading] = useState(false);

  const handleCartClick = () => {
    setShowShopLoading(true);
    setTimeout(() => {
      setShowShopLoading(false);
      setShowShop(true);
    }, 800);
  };
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  const handleRedirect = () => {
    navigate("/home");
  };

  const handleLike = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleSave = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleFollowFromFeed = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFollowing(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Snap scroll logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      isScrolling.current = true;
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
        
        // Find the video that's most visible
        let maxVisibility = 0;
        let targetIndex = 0;
        
        videoRefs.current.forEach((ref, index) => {
          if (!ref) return;
          
          const rect = ref.getBoundingClientRect();
          const visibility = Math.min(
            window.innerHeight,
            rect.bottom
          ) - Math.max(0, rect.top);
          
          const visibilityPercent = visibility / window.innerHeight;
          
          if (visibilityPercent > maxVisibility) {
            maxVisibility = visibilityPercent;
            targetIndex = index;
          }
        });

        // Snap if scrolled more than 70%
        if (maxVisibility > 0.7 || maxVisibility < 0.3) {
          videoRefs.current[targetIndex]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          setCurrentVideo(targetIndex);
        }
      }, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showMessages) {
    return (
      <MessagesLayout 
        onBack={() => {
          setShowMessages(false);
          setSelectedRestaurant(null);
        }} 
        selectedConversation={selectedRestaurant ? "restaurant" : undefined}
        restaurantName={selectedRestaurant?.name}
        restaurantAvatar={selectedRestaurant?.avatar}
      />
    );
  }

  if (showCheckout) {
    return <CheckoutTimeline orderId="12345" onComplete={handleRedirect} demoMode={true} />;
  }

  if (showUserProfile) {
    return <UserProfile onBack={() => setShowUserProfile(false)} />;
  }

  if (showNotifications) {
    return <Notifications onBack={() => setShowNotifications(false)} />;
  }

  if (showProfile) {
    return (
      <RestaurantProfile
        restaurant={mockRestaurant}
        onBack={() => setShowProfile(false)}
        onOpenMenu={() => {
          setShowProfile(false);
          setShowMenu(true);
        }}
        onFollow={() => setFollowing(prev => 
          prev.includes(1) ? prev.filter(id => id !== 1) : [...prev, 1]
        )}
        onMessage={() => {
          setSelectedRestaurant({ name: mockRestaurant.name, avatar: mockRestaurant.profileImage });
          setShowProfile(false);
          setShowMessages(true);
        }}
        isFollowing={following.includes(1)}
        fromFeed={false}
      />
    );
  }

  if (showMenu) {
    return (
      <RestaurantMenu
        restaurant={{
          name: mockRestaurant.name,
          profileImage: mockRestaurant.profileImage,
          coverImage: mockRestaurant.coverImage,
          location: mockRestaurant.location,
          rating: mockRestaurant.rating
        }}
        onBack={() => {
          setShowMenu(false);
          setHighlightedDish(undefined);
        }}
        onCheckout={() => {
          setShowMenu(false);
          setShowCheckout(true);
        }}
        highlightedDishId={highlightedDish}
        autoOpenDish={highlightedDish !== undefined}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Desktop: Vertical phone container with black sidebars */}
      <div className="hidden md:flex h-full items-center justify-center">
        <div className="relative w-full max-w-[450px] h-full bg-black shadow-2xl">
          <FeedContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            mockVideos={mockVideos}
            videoRefs={videoRefs}
            containerRef={containerRef}
            currentVideo={currentVideo}
            liked={liked}
            saved={saved}
            following={following}
            handleLike={handleLike}
            handleSave={handleSave}
            handleFollowFromFeed={handleFollowFromFeed}
            handleRedirect={handleRedirect}
            setIsCartOpen={setIsCartOpen}
            isCartOpen={isCartOpen}
            setShowProfile={setShowProfile}
            setShowMenu={setShowMenu}
            setShowMessages={setShowMessages}
            setShowUserProfile={setShowUserProfile}
            setShowNotifications={setShowNotifications}
            setShowComments={setShowComments}
            setShowShare={setShowShare}
            setShowMusicPlayer={setShowMusicPlayer}
            setCurrentMusicInfo={setCurrentMusicInfo}
            setHighlightedDish={setHighlightedDish}
            setShowShop={setShowShop}
            setShowShopLoading={setShowShopLoading}
          />
        </div>
      </div>

      {/* Mobile: Full screen */}
      <div className="md:hidden h-full">
        <FeedContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mockVideos={mockVideos}
          videoRefs={videoRefs}
          containerRef={containerRef}
          currentVideo={currentVideo}
          liked={liked}
          saved={saved}
          following={following}
          handleLike={handleLike}
          handleSave={handleSave}
          handleFollowFromFeed={handleFollowFromFeed}
          handleRedirect={handleRedirect}
          setIsCartOpen={setIsCartOpen}
          isCartOpen={isCartOpen}
          setShowProfile={setShowProfile}
          setShowMenu={setShowMenu}
          setShowMessages={setShowMessages}
          setShowUserProfile={setShowUserProfile}
          setShowNotifications={setShowNotifications}
          setShowComments={setShowComments}
          setShowShare={setShowShare}
          setShowMusicPlayer={setShowMusicPlayer}
          setCurrentMusicInfo={setCurrentMusicInfo}
          setHighlightedDish={setHighlightedDish}
          setShowShop={setShowShop}
          setShowShopLoading={setShowShopLoading}
        />
      </div>

      {/* Overlays */}
      <CommentOverlay 
        isOpen={showComments} 
        onClose={() => setShowComments(false)}
        commentCount={mockVideos[currentVideo]?.comments || 0}
      />
      <ShareOverlay 
        isOpen={showShare} 
        onClose={() => setShowShare(false)}
      />
      <MusicPlayerOverlay
        isOpen={showMusicPlayer}
        onClose={() => setShowMusicPlayer(false)}
        musicName={currentMusicInfo.name}
        artist={currentMusicInfo.artist}
      />

      <AnimatePresence>
        {showShopLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[60] bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div 
                className="relative"
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-24 h-24 border-4 border-primary/20 rounded-full" />
                <motion.div 
                  className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-primary rounded-full"
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">Abriendo Tienda</h3>
                <p className="text-muted-foreground">Cargando productos deliciosos...</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showShop && !showShopLoading && <Shop onClose={() => setShowShop(false)} />}
    </div>
  );
};

interface FeedContentProps {
  activeTab: "following" | "foryou";
  setActiveTab: (tab: "following" | "foryou") => void;
  mockVideos: Video[];
  videoRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  containerRef: React.RefObject<HTMLDivElement>;
  currentVideo: number;
  liked: number[];
  saved: number[];
  following: number[];
  handleLike: (videoId: number, e: React.MouseEvent) => void;
  handleSave: (videoId: number, e: React.MouseEvent) => void;
  handleFollowFromFeed: (videoId: number, e: React.MouseEvent) => void;
  handleRedirect: () => void;
  setIsCartOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setShowProfile: (show: boolean) => void;
  setShowMenu: (show: boolean) => void;
  setShowMessages: (show: boolean) => void;
  setShowUserProfile: (show: boolean) => void;
  setShowNotifications: (show: boolean) => void;
  setShowComments: (show: boolean) => void;
  setShowShare: (show: boolean) => void;
  setShowMusicPlayer: (show: boolean) => void;
  setCurrentMusicInfo: (info: { name: string; artist: string }) => void;
  setHighlightedDish: (id: number | undefined) => void;
  setShowShop: (show: boolean) => void;
  setShowShopLoading: (loading: boolean) => void;
}

const FeedContent = ({
  activeTab,
  setActiveTab,
  mockVideos,
  videoRefs,
  containerRef,
  currentVideo,
  liked,
  saved,
  following,
  handleLike,
  handleSave,
  handleFollowFromFeed,
  handleRedirect,
  setIsCartOpen,
  isCartOpen,
  setShowProfile,
  setShowMenu,
  setShowMessages,
  setShowUserProfile,
  setShowNotifications,
  setShowComments,
  setShowShare,
  setShowMusicPlayer,
  setCurrentMusicInfo,
  setHighlightedDish,
  setShowShop,
  setShowShopLoading
}: FeedContentProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Top Navigation - Redesigned */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-safe">
        <div className="relative flex justify-center px-4 py-3">
          {/* Tabs without blur background */}
          <div className="relative flex gap-2 p-1">
            <motion.button
              onClick={() => setActiveTab("following")}
              className={`relative px-6 py-2 text-sm font-bold rounded-full transition-all ${
                activeTab === "following" ? "text-white" : "text-white/60"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === "following" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-accent rounded-full shadow-accent"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Siguiendo</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("foryou")}
              className={`relative px-6 py-2 text-sm font-bold rounded-full transition-all ${
                activeTab === "foryou" ? "text-white" : "text-white/60"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === "foryou" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-full shadow-glow"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Para Ti</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Video Feed */}
      <div 
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {mockVideos.map((video, index) => {
          const scrollPercent = Math.abs(currentVideo - index);
          const opacity = scrollPercent > 0.3 ? 0.3 : 1;

          return (
            <div
              key={video.id}
              ref={(el) => (videoRefs.current[index] = el)}
              className="relative h-screen w-full flex-shrink-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Video/Image Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
                style={{ 
                  backgroundImage: `url(${video.videoUrl})`,
                  opacity: opacity
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex">
                {/* Left side - Info */}
                <div className="flex-1 flex flex-col justify-end p-4 pb-24">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <p 
                        className="text-white font-semibold text-lg cursor-pointer hover:underline"
                        onClick={() => setShowProfile(true)}
                      >
                        {video.username}
                      </p>
                      {!following.includes(video.id) && (
                        <motion.button
                          onClick={(e) => handleFollowFromFeed(video.id, e)}
                          className="px-4 py-1 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold rounded-full transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Seguir
                        </motion.button>
                      )}
                      {following.includes(video.id) && (
                        <motion.button
                          onClick={(e) => handleFollowFromFeed(video.id, e)}
                          className="px-4 py-1 bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-bold rounded-full transition-colors"
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.1, 1] }}
                        >
                          Siguiendo
                        </motion.button>
                      )}
                    </div>
                    <p className="text-white text-sm leading-relaxed max-w-xs">
                      {video.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-white" />
                      <p className="text-white text-xs">{video.music}</p>
                    </div>
                  </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex flex-col justify-end items-center gap-6 p-4 pb-24">

                  {/* Fire button - "Eat Now" */}
                  <motion.button
                    onClick={() => {
                      setHighlightedDish(video.id);
                      setShowMenu(true);
                    }}
                    className="flex flex-col items-center gap-1 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative">
                      {/* Animated glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 to-red-500 rounded-full blur-md"
                        animate={{
                          opacity: [0.4, 0.7, 0.4],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Button */}
                      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center shadow-lg border-2 border-white/30">
                        <Flame className="w-6 h-6 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    <span className="text-white text-xs font-bold tracking-wide drop-shadow-md">Eat Now</span>
                  </motion.button>

                  {/* Like */}
                  <motion.button
                    onClick={(e) => handleLike(video.id, e)}
                    className="flex flex-col items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      animate={liked.includes(video.id) ? {
                        scale: [1, 1.3, 1],
                        rotate: [0, 10, -10, 0]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Heart 
                        className={`w-6 h-6 transition-colors ${
                          liked.includes(video.id) ? 'fill-red-500 text-red-500' : 'text-white'
                        }`}
                      />
                    </motion.div>
                    <span className="text-white text-xs">
                      {(video.likes + (liked.includes(video.id) ? 1 : 0)).toLocaleString()}
                    </span>
                  </motion.button>

                  {/* Comments */}
                  <motion.button
                    onClick={() => setShowComments(true)}
                    className="flex flex-col items-center gap-1"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MessageSquare className="w-6 h-6 text-white" />
                    <span className="text-white text-xs">{video.comments}</span>
                  </motion.button>

                  {/* Save */}
                  <motion.button
                    onClick={(e) => handleSave(video.id, e)}
                    className="flex flex-col items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      animate={saved.includes(video.id) ? {
                        rotateY: [0, 180, 360]
                      } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <Bookmark 
                        className={`w-6 h-6 transition-colors ${
                          saved.includes(video.id) ? 'fill-accent text-accent' : 'text-white'
                        }`}
                      />
                    </motion.div>
                  </motion.button>

                  {/* Share */}
                  <motion.button
                    onClick={() => setShowShare(true)}
                    className="flex flex-col items-center gap-1"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 className="w-6 h-6 text-white" />
                  </motion.button>

                  {/* RiderRing replaces music spinner */}
                  <RiderRing
                    isPlaying={currentVideo === index}
                    albumArt={video.profileImage}
                    onClick={() => {
                      setCurrentMusicInfo({ name: video.music, artist: video.username });
                      setShowMusicPlayer(true);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/90 backdrop-blur-lg border-t border-white/10 pb-safe">
        <div className="flex justify-around items-center px-4 py-3">
          <motion.button
            onClick={handleRedirect}
            className="flex flex-col items-center gap-1 min-w-[60px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5 text-white" />
            <span className="text-white text-xs">Inicio</span>
          </motion.button>
          
          <motion.button
            onClick={() => setShowNotifications(true)}
            className="flex flex-col items-center gap-1 min-w-[60px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="text-white text-xs">Notif</span>
          </motion.button>

          <motion.button
            onClick={() => {
              setShowShopLoading(true);
              setTimeout(() => {
                setShowShopLoading(false);
                setShowShop(true);
              }, 1500);
            }}
            className="flex flex-col items-center gap-1 -mt-6 min-w-[60px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-glow">
                <ShoppingCart className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <span className="text-white text-xs">Carrito</span>
          </motion.button>

          <motion.button
            onClick={() => setShowMessages(true)}
            className="flex flex-col items-center gap-1 min-w-[60px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="text-white text-xs">Mensajes</span>
          </motion.button>

          <motion.button
            onClick={() => setShowUserProfile(true)}
            className="flex flex-col items-center gap-1 min-w-[60px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-5 h-5 text-white" />
            <span className="text-white text-xs">Perfil</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const DeliveryInterface = ({ onNavigate }: { onNavigate: () => void }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Truffle Pasta Combo", description: "Pasta + Garlic Bread + Drink", price: 24.99, quantity: 1, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop" },
    { id: 2, name: "Crispy Calamari", description: "Fresh squid rings with marinara sauce", price: 12.99, quantity: 1, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&h=200&fit=crop" },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-foreground">Tu Pedido</h2>
          <div className="flex items-center gap-2 text-primary">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">{cartItems.length} items</span>
          </div>
        </div>
        <p className="text-muted-foreground">Revisá y confirmá tu orden</p>
      </div>

      {/* Cart Items */}
      <ScrollArea className="flex-1 px-6">
        <div className="space-y-4 pb-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl p-4 border border-border flex gap-4 hover:border-primary/50 transition-colors"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                <p className="text-lg font-bold text-primary mt-1">${item.price}</p>
              </div>

              <div className="flex flex-col justify-between items-end">
                <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-7 h-7 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-7 h-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Recommended */}
          <div className="pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recomendados para ti</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Bruschetta Trio", price: 8.99, image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=200&h=200&fit=crop" },
                { name: "Tiramisu", price: 7.99, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop" },
              ].map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-3 border border-border hover:border-primary/50 transition-colors cursor-pointer" onClick={onNavigate}>
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-muted">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                  <p className="text-primary font-bold text-sm">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-6 pt-4 bg-card border-t border-border space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-semibold text-foreground">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Envío</span>
          <span className="font-semibold text-foreground">$2.99</span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex justify-between items-center text-lg">
          <span className="font-bold text-foreground">Total</span>
          <span className="font-bold text-primary">${(total + 2.99).toFixed(2)}</span>
        </div>

        <Button
          onClick={onNavigate}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          Confirmar Pedido
        </Button>
      </div>
    </div>
  );
};

export default Feed;
