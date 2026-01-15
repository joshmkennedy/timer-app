import { internal } from "../_generated/api";
import { mutation, internalMutation } from "../_generated/server";
import { v } from "convex/values";

export const newTimer = mutation({
  args: {
    title: v.string(),
    alertAt: v.number(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return
    }


    const timerId = await ctx.db.insert("timers", {
      title: args.title,
      startedAt: Date.now(),
      alertAt: args.alertAt,
      clerkId: identity.subject,
      status: "active",
    })

    const schedulerId = await ctx.scheduler.runAt(args.alertAt, internal.timers.timer.send, { id: timerId })
    ctx.scheduler.runAfter(0, internal.timers.timer.setScheduledId, { timerId, schedulerId })

    return timerId
  }
})

export const send = internalMutation({
  args: {
    id: v.id("timers"),
  },
  handler: async (ctx, args) => {
    const timer = await ctx.db.get("timers", args.id)
    if (!timer) {
      return
    }
    await ctx.db.patch("timers", args.id, {
      status: "sent",
    })

    const devices = await ctx.runQuery(internal.notifications.usersDevices, { clerkId: timer.clerkId })
    const body = timer.title + " has gone off";
    await Promise.all(devices.map(device => ctx.scheduler.runAfter(0, internal.notifications.sendNotification, {
      clerkId: timer.clerkId,
      deviceId: device.deviceId,
      body,
    })));
  }
})

export const setScheduledId = internalMutation({
  args: {
    timerId: v.id("timers"),
    schedulerId: v.id("_scheduled_functions"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch("timers", args.timerId, {
      privSchedulerId: args.schedulerId,
    })
  }
})

