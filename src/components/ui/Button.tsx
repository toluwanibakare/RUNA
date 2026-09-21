import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({ className, variant = "primary", size = "md", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-[#1EB95E] focus-visible:ring-offset-2 select-none touch-manipulation";
  const variants = {
    primary: "bg-[#1EB95E] text-white hover:bg-[#1B9A4D] shadow-sm",
    secondary: "bg-[#0C231D] text-white hover:bg-[#12372d]",
    ghost: "bg-transparent text-[#0C231D] hover:bg-black/5",
    outline: "border border-[#E5E7EB] bg-white text-[#0C231D] hover:bg-[#F9FAFB]",
  };
  const sizes = {
    sm: "h-8 px-3 text-sm rounded-lg",
    md: "h-10 px-4 text-sm rounded-xl",
    lg: "h-12 px-6 text-[15px] rounded-xl",
  };
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
