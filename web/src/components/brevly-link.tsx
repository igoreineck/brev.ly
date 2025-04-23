type BrevlyLinkProps = {
  originalUrl: string;
  name: string;
};

export function BrevlyLink({ name, originalUrl }: BrevlyLinkProps) {
  return (
    <div className="flex flex-col">
      <a
        rel="stylesheet"
        href={originalUrl}
        target="_blank"
        className="text-blue-500 font-medium"
      >
        {name}
      </a>
      <span className="text-xs text-gray-400">{originalUrl}</span>
    </div>
  );
}
