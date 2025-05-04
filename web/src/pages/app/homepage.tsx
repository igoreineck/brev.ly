import { Brevly } from "@/components/brevly";
import Logo from "@/assets/logo.svg";

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
