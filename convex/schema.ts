import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  timers: defineTable({
    startedAt: v.number(),
    alertAt: v.optional(v.number()),
    title: v.string(),
    clerkId: v.string(),
    status: v.union(v.literal("active"), v.literal("sent"), v.literal("dismissed")),
    privSchedulerId: v.optional(v.id("_scheduled_functions")),
  })
  .index("userTimers", ["clerkId", "status"]),

  subscribedDevices: defineTable({
    deviceId: v.string(),
    subscription: v.string(),
    expiresAt: v.number(),
    clerkId: v.string(),
  }).index("userDevice", ["clerkId", "deviceId"]),
});
