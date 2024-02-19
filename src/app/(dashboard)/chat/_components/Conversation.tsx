"use client";
import { trpc } from "@/app/_trpc/client";
import React from "react";

interface ConversationProps {
  setAiThinking: React.Dispatch<React.SetStateAction<boolean>>;
  fileId: string;
  collection: string;
  refetchMessages: () => void;
}

function Conversation({
  setAiThinking,
  fileId,
  collection,
  refetchMessages,
}: ConversationProps) {
  const { mutate: createMessage } = trpc.chat.createMessage.useMutation({
    onSuccess: (result: string) => {},
    onSettled: () => {
      refetchMessages();
      setAiThinking(false);
    },
    onError: () => {
      alert("Error creating message");
      setAiThinking(false);
    },
  });

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-3  w-5/6 mt-10">
      <div
        className="bg-gradient-to-b from-slate-100 to-slate-200 cursor-pointer h-16 flex items-center justify-center outline outline-2 outline-cyan-500 outline-offset-2 rounded-lg text-xs hover:shadow-lg"
        onClick={(event) => {
          const messageText = event.currentTarget.textContent;
          createMessage({ fileId, collection, message: messageText });
          setAiThinking(true);
        }}
      >
        Summarise the video
      </div>
      <div
        className="bg-gradient-to-b from-slate-100 to-slate-200 cursor-pointer h-16 flex items-center justify-center outline outline-2 outline-cyan-500 outline-offset-2 rounded-lg text-xs hover:shadow-lg"
        onClick={(event) => {
          const messageText = event.currentTarget.textContent;

          createMessage({ fileId, collection, message: messageText });
          setAiThinking(true);
        }}
      >
        Key concepts of the video
      </div>
      <div
        className="bg-gradient-to-b from-slate-100 to-slate-200 cursor-pointer h-16 flex items-center justify-center outline outline-2 outline-cyan-500 outline-offset-2 rounded-lg text-xs hover:shadow-lg"
        onClick={(event) => {
          const messageText = event.currentTarget.textContent;

          createMessage({ fileId, collection, message: messageText });
          setAiThinking(true);
        }}
      >
        Overview of the video
      </div>
      <div
        className="bg-gradient-to-b from-slate-100 to-slate-200 cursor-pointer h-16 flex items-center justify-center outline outline-2 outline-cyan-500 outline-offset-2 rounded-lg text-xs hover:shadow-lg"
        onClick={(event) => {
          const messageText = event.currentTarget.textContent;

          createMessage({ fileId, collection, message: messageText });
          setAiThinking(true);
        }}
      >
        What are the 5 main points of the video
      </div>
    </div>
  );
}

export default Conversation;
