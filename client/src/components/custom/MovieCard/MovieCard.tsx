import React, { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { EllipsisVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

const IMAGE_URL = "https://image.tmdb.org/t/p"

interface MovieCardProps {
    movie_id: string
    title: string | undefined
    poster_path: string | undefined
    release_date: string | undefined
    onRemove?: (movie_id: string) => void // Optional remove handler
}

// interface SimpleMovie {
//     id: string
//     movie_id: string
//     title: string
//     poster_path: string
//     release_date: string
// }

const MovieCard: React.FC<MovieCardProps> = ({
    movie_id,
    title,
    poster_path,
    release_date,
    onRemove,
}) => {
    const navigate = useNavigate()
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    /*
  useEffect(() => {
    const checkFavouriteStatus = async () => {
      if (user?.uid) {
        try {
          const userData = await getUserData(user.uid);
          const favouritesList = userData.lists.find(
            (list: any) => list.name === "Favourites"
          );
          if (favouritesList) {
            setIsFavourite(
              favouritesList.movies.some((m: any) => m.movie_id === movie_id)
            );
          }
        } catch (error) {
          console.error("Error checking favourite status:", error);
        }
      }
    };

    checkFavouriteStatus();
  }, [movie_id, user]);
    */
    const handleClick = () => {
        navigate(`/movie/${movie_id}`)
    }

    const handleOpenDeleteDialog = (event: React.MouseEvent) => {
        event.stopPropagation()
        setIsDeleteDialogOpen(true)
    }

    const handleDeleteMovie = () => {
        if (onRemove) {
            onRemove(movie_id)
        }
        setIsDeleteDialogOpen(false)
    }

    return (
        <>
            <motion.div
                className="relative w-full mx-auto sm:max-w-40 md:max-w-48 lg:max-w-56 h-60 sm:h-60 md:h-72 lg:h-84 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoveredCard(movie_id)}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <img
                    src={`${IMAGE_URL}/w500${poster_path}`}
                    alt={title || "Movie Poster"}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 flex flex-col items-center">
                        <div className="flex items-center space-x-2 text-xs sm:text-sm mb-1">
                            <span className="text-gray-300">
                                {release_date?.split("-")[0]}
                            </span>
                        </div>
                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-2 line-clamp-2">
                            {title}
                        </h3>
                    </div>
                    {hoveredCard === movie_id && onRemove && (
                        <Button
                            size="icon"
                            className="absolute top-2 right-2 bg-transparent"
                            onClick={handleOpenDeleteDialog}
                        >
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </motion.div>

            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove Movie</DialogTitle>
                    </DialogHeader>
                    <p>
                        Are you sure you want to remove this movie? This action
                        cannot be undone.
                    </p>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-white text-black"
                            onClick={handleDeleteMovie}
                        >
                            Remove
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default MovieCard
