import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { userSessions } from "@/lib/api";
import { findUserSession } from "@/lib/api";

function PreviousUserSessions({ userId }: { userId: string }) {
  const getUserSessions = async () => {
    try {
      const response = await findUserSession(userId);
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["userSessions"],
    queryFn: getUserSessions,
    staleTime: Infinity,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Sessions</CardTitle>
        <CardDescription>
          All devices currently logged into your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.data.allSessions.map((session: any) => (
            <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-100">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{session.device}</p>
                  <p className="text-sm text-gray-500">IP: {session.id}</p>
                  <p className="text-sm text-gray-500">UserAgent: {session.userAgent}</p>
                </div>
                <div className="text-sm text-gray-500">
                  Last active: {new Date(session.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
export default PreviousUserSessions;
