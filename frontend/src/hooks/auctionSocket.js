import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useAuctionSocket = (currentUserId, setItems) => {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [flashingItems, setFlashingItems] = useState(new Set());
  const [outbidItems, setOutbidItems] = useState(new Set());

  useEffect(() => {
    if (!currentUserId) return;

    const backendUrl = import.meta.env.VITE_BACKEND_URL_LOCAL || "http://localhost:3000";

    console.log("Socket Backend URL:", backendUrl);

    const newSocket = io(backendUrl, {
      reconnection: true,
    });

    newSocket.on("connect", () => {
      setConnectionStatus("Connected");
    });

    newSocket.on("disconnect", () => {
      setConnectionStatus("Disconnected");
    });

    newSocket.on("UPDATE_BID", ({ itemId, currentBid, highestBidder }) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id === itemId) {

            if (item.highestBidder === currentUserId && highestBidder !== currentUserId) {
              setOutbidItems((prev) => new Set(prev).add(itemId));

              setTimeout(() => {
                setOutbidItems((prev) => {
                  const copy = new Set(prev);
                  copy.delete(itemId);
                  return copy;
                });
              }, 2000);
            }
            return { ...item, currentBid, highestBidder };
          }
          return item;
        })
      );

      if (highestBidder !== currentUserId) {
        setFlashingItems((prev) => new Set(prev).add(itemId));

        setTimeout(() => {
          setFlashingItems((prev) => {
            const copy = new Set(prev);
            copy.delete(itemId);
            return copy;
          });
        }, 1000);
      }
    });

    newSocket.on("OUTBID", ({ itemId }) => {
      setOutbidItems((prev) => new Set(prev).add(itemId));

      setTimeout(() => {
        setOutbidItems((prev) => {
          const copy = new Set(prev);
          copy.delete(itemId);
          return copy;
        });
      }, 2000);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [currentUserId, setItems]);

  const placeBid = (itemId, amount) => {
    if (!socket) return;

    socket.emit("BID_PLACED", {
      itemId,
      bidderId: currentUserId,
      amount,
    });
  };

  return {
    connectionStatus,
    flashingItems,
    outbidItems,
    placeBid,
  };
};
