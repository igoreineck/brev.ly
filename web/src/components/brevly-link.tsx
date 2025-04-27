import { Button } from "./ui";

type LinkProps = {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: string;
  createdAt: Date;
};

export function BrevlyLink(props: LinkProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <a
          href={`/${props.name}`}
          target="_blank"
          className="text-primary font-medium mb-1"
        >{`brev.ly/${props.name}`}</a>
        <p className="text-sm text-gray-500">{props.originalUrl}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 mr-5">
          {props.accessCounter} acessos
        </span>
        <div className="flex items-center gap-x-2">
          <Button className="bg-gray-200 rounded-md text-gray-600">Copy</Button>
          <Button className="bg-gray-200 rounded-md text-gray-600">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
