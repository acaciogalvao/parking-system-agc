import { useState, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { formatPlate, getPlateError } from "@/lib/plate-validation";
import { cn } from "@/lib/utils";

interface PlateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  showError?: boolean;
}

export const PlateInput = forwardRef<HTMLInputElement, PlateInputProps>(
  ({ value, onChange, showError = false, className, ...props }, ref) => {
    const [localValue, setLocalValue] = useState(value);
    const [touched, setTouched] = useState(false);

    const error = touched && showError ? getPlateError(localValue) : null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPlate(e.target.value);
      setLocalValue(formatted);
      onChange(formatted);
    };

    const handleBlur = () => {
      setTouched(true);
    };

    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            className,
            error && "border-destructive focus-visible:ring-destructive"
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive mt-1 absolute">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PlateInput.displayName = "PlateInput";
