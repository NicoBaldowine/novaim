"use client";
import { useState } from "react";

export function SocialActions() {
  const [following, setFollowing] = useState(false);
  return <div className="social-actions">
    <span className="social-network" role="img" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1ZM8.3 18H5.7V9.7h2.6ZM7 8.6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM18.3 18h-2.6v-4c0-1-.1-2-1.3-2-1.3 0-1.5 1-1.5 2v4h-2.6V9.7h2.5v1.1c.4-.7 1.2-1.3 2.4-1.3 2.6 0 3.1 1.7 3.1 3.9Z"/></svg></span>
    <span className="social-network" role="img" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></span>
    <span className="social-network" role="img" aria-label="Discord"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.7 5.1a18 18 0 0 0-4.4-1.4l-.5 1a16 16 0 0 0-5.6 0l-.5-1a18 18 0 0 0-4.4 1.4C1.5 9.3.8 13.4 1.2 17.4a18 18 0 0 0 5.4 2.7l1.1-1.8-1.7-.8.4-.3a15 15 0 0 0 11.2 0l.4.3-1.7.8 1.1 1.8a18 18 0 0 0 5.4-2.7c.5-4.7-.8-8.7-3.1-12.3ZM8.4 14.8c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm7.2 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/></svg></span>
    <button className="social-follow" type="button" aria-pressed={following} onClick={() => setFollowing(!following)}>{following ? "Following" : "Follow"}</button>
  </div>;
}
