import { BrevlyLinkListContainer } from "./brevly-link-list";
import { BrevlyNewLink } from "./brevly-new-link";

export function Brevly() {
  return (
    <div className="grid md:grid-cols-3 gap-x-8">
      <BrevlyNewLink />
      <BrevlyLinkListContainer />
    </div>
  );
}
