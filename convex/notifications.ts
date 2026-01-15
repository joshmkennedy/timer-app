import { v } from "convex/values";
import { internalAction, internalQuery, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

export const isSubscribed = query({
  args: { deviceId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { success: false };
    }
    const record = await ctx.db
      .query("subscribedDevices")
      .withIndex("userDevice", (q) => q.eq("clerkId", identity.subject).eq("deviceId", args.deviceId))
      .unique();

    return { success: !!record && record.expiresAt > Date.now() };
  }
});

const SUBSCRIBED_DEVICES_EXPIRES_AT = 60 * 60 * 24 * 7 * 1000; // 7 days in ms
export const subscribe = mutation({
  args: { deviceId: v.string(), subscription: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { error: "Unauthorized" };
    }

    // Check if device already exists and update, otherwise insert
    const existing = await ctx.db
      .query("subscribedDevices")
      .withIndex("userDevice", (q) => q.eq("clerkId", identity.subject).eq("deviceId", args.deviceId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        subscription: args.subscription,
        expiresAt: Date.now() + SUBSCRIBED_DEVICES_EXPIRES_AT,
      });
    } else {
      await ctx.db.insert("subscribedDevices", {
        deviceId: args.deviceId,
        subscription: args.subscription,
        expiresAt: Date.now() + SUBSCRIBED_DEVICES_EXPIRES_AT,
        clerkId: identity.subject,
      });
    }

    return { success: true };
  }
});

export const unsubscribe = mutation({
  args: { deviceId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { error: "Unauthorized" };
    }
    const record = await ctx.db.query("subscribedDevices")
      .withIndex("userDevice", (q) => q.eq("clerkId", identity.subject).eq("deviceId", args.deviceId))
      .unique();

    if (!record) {
      return { error: "Not subscribed" };
    }
    await ctx.db.delete(record._id);
    return { success: true };
  }
});

export const usersDevices = internalQuery({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return ctx.db.query("subscribedDevices")
      .withIndex("userDevice", (q) => q.eq("clerkId", args.clerkId))
      .collect();
  }
});

export const sendNotification = internalAction({
  args:{
    clerkId: v.string(),
    deviceId: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const payload = JSON.stringify({
      title: "Timer Has Gone Off",
      body: args.body,
    });

    await ctx.scheduler.runAfter(0, internal.node_notifications.sendWebPush, {
      clerkId: args.clerkId,
      deviceId: args.deviceId,
      payload
    });
  }
})
