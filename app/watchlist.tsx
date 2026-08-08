"use client";

import { useCallback, useEffect, useState } from "react";
import { parseWatchlist, toggleWatchlistAddress } from "../src/lib/research-tools";

const STORAGE_KEY = "stock-token-radar.watchlist.v1";
const CHANGE_EVENT = "stock-token-radar:watchlist-change";

export function useWatchlist() {
  const [addresses, setAddresses] = useState<string[]>([]);

  const sync = useCallback(() => {
    setAddresses(parseWatchlist(window.localStorage.getItem(STORAGE_KEY)));
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(CHANGE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CHANGE_EVENT, sync);
    };
  }, [sync]);

  function toggle(address: string) {
    const next = toggleWatchlistAddress(addresses, address);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setAddresses(next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return {
    addresses,
    isWatched: (address: string) => addresses.includes(address.toLowerCase()),
    toggle,
  };
}

export function WatchlistButton({
  address,
  isWatched,
  onToggle,
}: {
  address: string;
  isWatched: boolean;
  onToggle: (address: string) => void;
}) {
  return (
    <button
      type="button"
      className={isWatched ? "watch-button watch-button-active" : "watch-button"}
      aria-label={isWatched ? `Remove ${address} from research watchlist` : `Add ${address} to research watchlist`}
      aria-pressed={isWatched}
      onClick={() => onToggle(address)}
      title={isWatched ? "Remove from local watchlist" : "Save to local watchlist"}
    >
      <span aria-hidden="true">{isWatched ? "★" : "☆"}</span>
    </button>
  );
}
