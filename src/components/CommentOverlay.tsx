import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
}

interface CommentOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  commentCount: number;
}

const mockComments: Comment[] = [
  {
    id: 1,
    user: "@foodlover",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=food",
    text: "¡Se ve increíble! 😍 ¿Dónde puedo conseguirlo?",
    likes: 145,
    time: "2h"
  },
  {
    id: 2,
    user: "@chefmaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chef",
    text: "La presentación es espectacular 👨‍🍳✨",
    likes: 89,
    time: "5h"
  },
  {
    id: 3,
    user: "@tastytraveler",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=travel",
    text: "Definitivamente tengo que probarlo 🤤",
    likes: 234,
    time: "1d"
  }
];

const CommentOverlay = ({ isOpen, onClose, commentCount }: CommentOverlayProps) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Handle comment submission
      setNewComment("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Overlay */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-bold">
                {commentCount.toLocaleString()} comentarios
              </h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comments List */}
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-3">
                {mockComments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <img
                      src={comment.avatar}
                      alt={comment.user}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-card rounded-2xl rounded-tl-none px-4 py-3">
                        <p className="font-semibold text-xs mb-0.5">{comment.user}</p>
                        <p className="text-foreground text-sm">{comment.text}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-1 px-4">
                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                          {comment.time}
                        </button>
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors">
                          <Heart className="w-3 h-3" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                          Responder
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Añade un comentario..."
                  className="flex-1 bg-background rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!newComment.trim()}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommentOverlay;
