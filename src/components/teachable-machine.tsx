import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "@tensorflow/tfjs";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeachableMachine() {
  return (
    <Card className="w-1/2 bg-primary text-white border-none shadow-xl">
      <CardHeader>
        <CardTitle>Teachable Machine</CardTitle>
        <CardDescription>
          Make your own "Teachable Machine" using Transfer Learning with
          MobileNet v3 in TensorFlow.js using saved graph model from TFHub
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Status - Awaiting TF.js to load</p>
        <video id="webcam" autoPlay muted></video>
        <div>
          <Button>Enable Webcam</Button>
          <Button>Gather Class 1 Data </Button>
          <Button>Gather Class 2 Data</Button>
          <Button>Train & Predict</Button>
          <Button>Reset</Button>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4"></CardFooter>
    </Card>
  );
}
