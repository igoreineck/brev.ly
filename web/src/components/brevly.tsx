import { BrevlyLinkList } from "./brevly-link-list";
import { BrevlyNewLink } from "./brevly-new-link";

export function Brevly() {
  return (
    <div className="grid grid-cols-2 gap-x-8">
      <BrevlyNewLink />
      <BrevlyLinkList />
    </div>
  );
}
