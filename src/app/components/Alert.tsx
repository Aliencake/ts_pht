import { AlertCircle, FileWarning, Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle, } from "@/app/components/ui/alert"

interface AlertDestructiveProps {
    alert_title: string
    alert_descrption: string
  }

export function AlertDestructive({ alert_title, alert_descrption }: AlertDestructiveProps) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{alert_title}</AlertTitle>
        <AlertDescription>
          {alert_descrption}
        </AlertDescription>
      </Alert>
    )
  }