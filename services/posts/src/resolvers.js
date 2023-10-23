import db from "./db.js";

export default {
  Thread: {
    posts: async (thread, { limit }) => {
      const { rows } = await db.query(
        `SELECT * FROM posts WHERE thread_id = $1 ORDER BY created DESC LIMIT $2`,
        [thread.id, limit]
      );

      return rows;
    },
  },
};
