import { format } from "date-fns";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createPost } from "lib/posts";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {  
  const { id, title, content } = req.body;
  console.log(id, title, content);
  
  try {
    await createPost({
      id,
      title,
      date: format(new Date(), "yyyy-MM-dd"),
      content,
    });
    res.status(200).json({ message: "생성 완료!" });
  } catch (error) {
    res.status(500).json({ message: `생성 실패! - ${error}` });
  }
}
