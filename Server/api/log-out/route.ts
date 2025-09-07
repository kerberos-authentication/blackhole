
import { connectDB } from "../config/db";
import { deleteCookie } from "../Cookies/appCookie";
export async function POST(request) {
  await connectDB();
  try {
    deleteCookie(request);
   
    return Response.json(
      { message: "Logged out successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error logging out", error);
    return Response.json({ message: "Error logging out" }, { status: 400 });
  }
}
