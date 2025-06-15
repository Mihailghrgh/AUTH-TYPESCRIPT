import { CardTitle } from "../ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TriangleAlert } from "lucide-react";
export function SkeletonCard({ error }: { error?: Error }) {
  return (
    <div className="flex flex-col space-y-3 justify-center items-center py-60">
      {error ? (
        <>
          <div className="bg-red-300 rounded-xl w-fit border-12 border-red-300 flex justify-center  text-center items-center">
            <TriangleAlert className="h-4 w-4" /> <p> Invalid Link!</p>
          </div>
          <h1>{error?.message}. Please retry again</h1>
        </>
      ) : (
        <Skeleton className="h-[225px] w-[350px] rounded-xl" />
      )}
    </div>
  );
}
