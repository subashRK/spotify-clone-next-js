import { clearTokenCookie } from "../../utils"

const handler = async (req, res) => {
  if (!req.method === "POST") return res.status(400).end()
  clearTokenCookie(res)
  res.status(200).end()
}

export default handler
