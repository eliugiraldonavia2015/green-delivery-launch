import { motion } from "framer-motion";
import { ArrowLeft, Settings, Grid3x3, Heart, Bookmark, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserProfileProps {
  onBack: () => void;
}

const UserProfile = ({ onBack }: UserProfileProps) => {
  const mockPosts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    image: `https://images.unsplash.com/photo-${1565299585323 + i}?w=400&h=400&fit=crop`,
    likes: Math.floor(Math.random() * 50000) + 1000
  }));

  return (
    <div className="fixed inset-0 z-40 bg-background overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-lg">Mi Perfil</h2>
          <button className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent p-1">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-1">@usuario</h3>
            <p className="text-muted-foreground text-sm mb-3">Amante de la buena comida 🍕</p>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Ciudad de México</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-card rounded-xl">
            <div className="text-2xl font-bold text-foreground">124</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
          <div className="text-center p-4 bg-card rounded-xl">
            <div className="text-2xl font-bold text-foreground">2.5K</div>
            <div className="text-sm text-muted-foreground">Seguidores</div>
          </div>
          <div className="text-center p-4 bg-card rounded-xl">
            <div className="text-2xl font-bold text-foreground">892</div>
            <div className="text-sm text-muted-foreground">Siguiendo</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
            Editar Perfil
          </Button>
          <Button variant="outline" className="flex-1">
            Compartir Perfil
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full grid grid-cols-3 bg-card border-y border-border">
          <TabsTrigger value="posts" className="data-[state=active]:bg-primary/10">
            <Grid3x3 className="w-5 h-5" />
          </TabsTrigger>
          <TabsTrigger value="liked" className="data-[state=active]:bg-primary/10">
            <Heart className="w-5 h-5" />
          </TabsTrigger>
          <TabsTrigger value="saved" className="data-[state=active]:bg-primary/10">
            <Bookmark className="w-5 h-5" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-0">
          <div className="grid grid-cols-3 gap-1 p-1">
            {mockPosts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 0.98 }}
                className="relative aspect-square bg-card overflow-hidden cursor-pointer group"
              >
                <img src={post.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white">
                    <Heart className="w-5 h-5 fill-white" />
                    <span className="font-semibold">{(post.likes / 1000).toFixed(1)}K</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liked" className="mt-0">
          <div className="p-8 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Tus publicaciones favoritas aparecerán aquí</p>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-0">
          <div className="p-8 text-center">
            <Bookmark className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Publicaciones guardadas aparecerán aquí</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
