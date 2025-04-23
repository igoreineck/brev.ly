import { BrevlyLinkList } from "./brevly-link-list";
import { BrevlyNewLink } from "./brevly-new-link";

export function Brevly() {
  return (
    <div className="w-[980px] grid grid-cols-3 gap-x-8">
      <div className="col-span-1 bg-white p-10">
        <BrevlyNewLink />
      </div>
      <div className="col-span-2 bg-white p-10">
        <BrevlyLinkList />
      </div>
    </div>
  );
}
