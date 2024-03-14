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
import * as toxicity from "@tensorflow-models/toxicity";
import "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ToxicityChecker() {
  const [inputText, setInputText] = useState("");
  const [textToxicity, setTextToxicity] = useState("");
  const [model, setModel] = useState<toxicity.ToxicityClassifier | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    console.log("submitted" + " " + inputText);
    if (model !== null) {
      const predictions = await model.classify([inputText]);
      const predictionLabels = predictions
        .filter((item) => item.results[0].match === true)
        .map((item) => item.label);

      const detailedPredictions = predictions
        .filter((item) => item.results[0].probabilities["1"] > 0.001)
        .map(
          (item) =>
            `${item.label} (${(
              item.results[0].probabilities["1"] * 100
            ).toFixed(2)}%)`
        );

      // Decide what message to set based on the predictions
      if (detailedPredictions.length > 0) {
        // If any predictions exceed the example threshold, show them
        setTextToxicity(detailedPredictions.join(", "));
        setLoading(false);
      } else if (predictionLabels.length > 0) {
        // If any labels match (regardless of threshold), show them
        setTextToxicity(predictionLabels.join(", "));
        setLoading(false);
      } else {
        // No predictions exceed the threshold and no matches found
        setTextToxicity("No toxicity detected.");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    async function loadModel() {
      const threshold = 0.6;
      toxicity
        .load(threshold, [])
        .then((model) => {
          setModel(model);
        })
        .catch((error) => {
          console.error("Failed to load the toxicity model", error);
        });
    }

    if (model === null) {
      loadModel();
    }
  }, [model]);

  return (
    <Card className="w-1/2 bg-primary text-white border-none shadow-xl">
      <CardHeader>
        <CardTitle>Model</CardTitle>
        <CardDescription>
          Toxicity AI model to detect toxic comments
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
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
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
            <p className="capitalize">{textToxicity}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
