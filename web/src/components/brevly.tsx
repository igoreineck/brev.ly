import { BrevlyLinkListContainer } from "./brevly-link-list";
import { BrevlyNewLink } from "./brevly-new-link";

export function Brevly() {
  return (
    <div className="grid grid-cols-3 gap-x-8">
      <div className="col-span-1 bg-white p-8">
        <BrevlyNewLink />
      </div>
      <div className="col-span-2 bg-white p-8">
        <BrevlyLinkListContainer />
      </div>
    </div>
  );
}
