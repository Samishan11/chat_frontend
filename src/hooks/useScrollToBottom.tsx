import { useEffect } from "react";

const useScrollToBottom = ({ ref, messages }: any) => {
  useEffect(() => {
    if (messages?.length === 0) return;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, ref]);
};

export { useScrollToBottom };
