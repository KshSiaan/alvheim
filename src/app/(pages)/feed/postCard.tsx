import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PostCard() {
  return (
    <>
      <Card className="w-full mx-auto bg-zinc-50 dark:bg-zinc-900 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-4 text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>User #5450</span>
          </CardTitle>
        </CardHeader>
        <CardDescription className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300 font-text">
          Post text row 1 to post text row 8 max. This area can expand to fit
          the content of the post, providing a flexible and responsive design
          for various post lengths.Post text row 1 to post text row 8 max. This
          area can expand to fit the content of the post, providing a flexible
          and responsive design for various post lengths.Post text row 1 to post
          text row 8 max. This area can expand to fit the content of the post,
          providing a flexible and responsive design for various post
          lengths.Post text row 1 to post text row 8 max. This area can expand
          to fit the content of the post, providing a flexible and responsive
          design for various post lengths.Post text row 1 to post text row 8
          max. This area can expand to fit the content of the post, providing a
          flexible and responsive design for various post lengths.Post text row
          1 to post text row 8 max. This area can expand to fit the content of
          the post, providing a flexible and responsive design for various post
          lengths.Post text row 1 to post text row 8 max. This area can expand
          to fit the content of the post, providing a flexible and responsive
          design for various post lengths.Post text row 1 to post text row 8
          max. This area can expand to fit the content of the post, providing a
          flexible and responsive design for various post lengths.
        </CardDescription>
        <CardFooter className="flex flex-row justify-between items-center px-6 py-4 bg-zinc-100 dark:bg-zinc-800 rounded-b-xl">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm font-medium">Like</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Comment</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </Button>
        </CardFooter>
      </Card>
      <div className="px-[30%]">
        <hr />
      </div>
    </>
  );
}
