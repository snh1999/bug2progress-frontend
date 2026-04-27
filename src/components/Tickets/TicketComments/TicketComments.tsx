"use client";

import { useState } from "react";
import { SendIcon, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  useCreateTicketComment,
  useDeleteTicketComment,
  useGetTicketComments,
} from "@/api/tickets/ticket-comments";
import { useRealtimeComments } from "@/realtime/useRealtimeComments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGetCurrentUser } from "@/api/users/users";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";

interface Props {
  ticketId: string;
}

export function TicketComments({ ticketId }: Props) {
  const [text, setText] = useState("");
  const { data: user } = useGetCurrentUser();
  const { data: comments, isLoading } = useGetTicketComments(ticketId);
  const createComment = useCreateTicketComment();
  const { mutate: deleteComment } = useDeleteTicketComment();

  useRealtimeComments(ticketId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await createComment.mutateAsync({ ticketId, text });
    setText("");
  };

  const userId = user?.userId;

  const isAuthor = (authorId: string) => userId === authorId;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Comments</h3>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="min-h-[80px] resize-none"
        />
        <Button
          type="submit"
          size="sm"
          disabled={!text.trim() || createComment.isPending}
        >
          <SendIcon className="size-4" />
        </Button>
      </form>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading comments...</p>
        ) : comments?.length === 0 ? (
          <p className="text-sm text-muted-foreground">No comments yet</p>
        ) : (
          comments?.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-3 p-3 bg-muted/30 rounded-lg"
            >
              <ImageOrAvatar
                name={comment.author?.profile?.name ?? "?"}
                rounded
              />
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      {comment.author?.profile?.name ?? "Unknown"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  {isAuthor(comment.authorId) && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        deleteComment({ commentId: comment.id, ticketId })
                      }
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
