import UserPage from "@/components/UserPage/UserPage";
import { cookies } from "next/headers";
import { verifyAccessTokenSchema } from "@/controller/auth.verifyAccessTokenSchema";
import ErrorBlock from "@/components/utils/ErrorBlock";
import { redirect } from "next/navigation";
import { refreshAuthToken } from "@/lib/api";

async function page() {
  try {
    const data = await cookies();
    const accessToken = data.get("accessToken");
    const refreshToken = data.get("refreshToken");
    console.log(refreshToken);

    if (!accessToken) {
      console.log(refreshToken);

      const response = await refreshAuthToken();
    }

    return <UserPage />;
  } catch (error) {
    console.log(error);
    redirect("/");
  }
}
export default page;
