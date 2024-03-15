import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import "@tensorflow/tfjs";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeachableMachine() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
  };

  return (
    <Card className="w-1/2 bg-primary text-white border-none shadow-xl">
      <CardHeader>
        <CardTitle>Teachable Machine</CardTitle>
        <CardDescription>
          Train your own machine learning model using your webcam via transfer
          learning.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                className="text-black"
                id="name"
                placeholder="Start typing..."
              />
            </div>
            <Button
              className="bg-white text-black hover:text-white"
              type="submit"
            >
              Analyze
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex gap-4">
        {loading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <div>
            <p className="capitalize">{}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
