import { TriangleAlert } from "lucide-react";

function ErrorBlock({ message }: { message: string }) {
  return (
    <div className="flex flex-col space-y-3 justify-center items-center py-60">
      <div className="bg-red-300 rounded-xl w-fit border-12 border-red-300 flex justify-center  text-center items-center">
        <TriangleAlert className="h-4 w-4" /> <p> Error!</p>
      </div>
      <h1>{message}</h1>
    </div>
  );
}
export default ErrorBlock;
