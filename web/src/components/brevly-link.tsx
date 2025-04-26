type LinkProps = {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: string;
  createdAt: Date;
};

export function BrevlyLink(props: LinkProps) {
  return (
    <div className="flex flex-col">
      <a href={`/${props.name}`} target="_blank">{`brev.ly/${props.name}`}</a>
      <span className="text-xs text-gray-400">{props.originalUrl}</span>
    </div>
  );
}
