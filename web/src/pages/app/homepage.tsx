import { Brevly } from "@/components/brevly";
import Logo from "@/assets/Logo.svg";

export function Homepage() {
  return (
    <div>
      <div>
        <img src={Logo} alt="logo" className="h-6 mb-8 mt-22" />
      </div>
      <Brevly />
    </div>
  );
}
