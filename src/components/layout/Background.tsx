import { type ReactNode } from "react";
import background from "../../assets/backgroundImageEnriched.png";
interface BackgroundProps {
  children: ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {children}
    </div>
  );
};

export default Background;
