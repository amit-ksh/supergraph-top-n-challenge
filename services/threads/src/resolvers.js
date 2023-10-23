import db from "./db.js";

export const Query = {
  threads: async (_, { limit }) => {
    const { rows } = await db.query(
      "SELECT * FROM threads ORDER BY created DESC LIMIT $1",
      [limit]
    );

    return rows;
  },
};
