"use node";
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import webpush from "web-push";

export const sendWebPush = internalAction({
  args: {
    clerkId: v.string(),
    deviceId: v.string(),
    payload: v.string(),
  },
  handler: async (ctx, args) => {
    webpush.setVapidDetails(
      process.env.NEXT_PUBLIC_VAPID_SUBJECT!,
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      process.env.VAPID_PRIVATE_KEY!,
    );

    const { clerkId, deviceId, payload } = args;
    if (!clerkId || !deviceId || !payload) {
      return { error: "Invalid parameters" };
    }

    // Get the subscription from the database
    const record = await ctx.runQuery(internal.notifications.usersDevices, { clerkId });
    const device = record.find((d: { deviceId: string; subscription: string }) => d.deviceId === deviceId);

    if (!device || !device.subscription) {
      return { error: "Device not found or no subscription" };
    }

    const sub = JSON.parse(device.subscription);
    await webpush.sendNotification(sub, payload);

    return { success: true };
  }
})
