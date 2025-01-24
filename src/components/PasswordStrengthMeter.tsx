import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({
  password,
}: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const calculateStrength = () => {
      let score = 0;
      if (password.length >= 8) score += 50;
      if (/[A-Za-z]/.test(password) && /\d/.test(password)) score += 50;
      return score;
    };

    setStrength(calculateStrength());
  }, [password]);

  const getColorClass = () => {
    if (strength < 50) return "bg-red-500";
    if (strength < 100) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full mt-2">
      <Progress value={strength} className={`h-1 ${getColorClass()}`} />
      <p className="text-xs text-muted-foreground mt-1">
        {strength < 50 && "Weak"}
        {strength >= 50 && strength < 100 && "Medium"}
        {strength === 100 && "Strong"}
      </p>
    </div>
  );
}
