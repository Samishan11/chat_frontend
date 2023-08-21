import { useEffect } from "react";

const UseScrollToBottom = ({ bottomRef, message }: any) => {
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [bottomRef, message]);
};

export { UseScrollToBottom };
