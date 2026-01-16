import { v } from "convex/values";
import { query } from "../_generated/server";

const list = query({
  args: {
    status: v.optional(v.array(v.union(v.literal("sent"), v.literal("active"), v.literal("dismissed")))),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return []
    }

    if (!args.status || args?.status?.length === 0) {
      return ctx.db.query("timers")
        .withIndex("userTimers", q => q.eq("clerkId", identity.subject))
        .collect()
    }

    return (
      await Promise.all(
        args.status.map(
          status => ctx.db.query("timers")
            .withIndex("userTimers", q => q
              .eq("clerkId", identity.subject)
              .eq("status", status))
            .collect()
        )
      )
    )
      .flat()
      .sort((a, b) => (b.alertAt ?? 0) - (a.alertAt ?? 0));
  },
});

export default list;
