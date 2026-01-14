import { query } from "../_generated/server";

const list = query({
  args: {},
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return []
    }
    return ctx.db.query("timers").filter(q=>q.eq(q.field("clerkId"), identity.subject)).collect()
  },
});

export default list;
