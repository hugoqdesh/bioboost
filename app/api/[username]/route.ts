// api/[username]/route.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  // Fetch user-specific data based on the username
  // Example:
  const userData = {
    username,
    // Add more user-specific data as needed
  };

  // Return the fetched data
  res.status(200).json(userData);
}
