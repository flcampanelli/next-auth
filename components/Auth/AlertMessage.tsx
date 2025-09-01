import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert, CircleCheckBig } from "lucide-react";

interface AlertMessageProps {
  title: string;
  message: string;
  type: "success" | "error";
}

export function AlertMessage({ title, message, type }: AlertMessageProps) {
  return (
    <Alert variant={type}>
      {type === "success" ? <CircleCheckBig className="h-4 w-4" /> : <CircleAlert className="h-4 w-4" />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}