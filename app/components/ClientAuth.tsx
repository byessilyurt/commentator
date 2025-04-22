"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import AuthButton from "./AuthButton";

export default function ClientAuth() {
    useEffect(() => {
        // Find the container in the DOM
        const container = document.getElementById("auth-button-container");
        if (!container) return;

        // Create a new div to mount our auth button
        const portalContainer = document.createElement("div");
        portalContainer.className = "auth-portal";
        container.appendChild(portalContainer);

        // Create a portal for our auth button
        const portal = createPortal(<AuthButton />, portalContainer);

        // Clean up on unmount
        return () => {
            container.removeChild(portalContainer);
        };
    }, []);

    // No need to render anything here since we use portal
    return null;
} 