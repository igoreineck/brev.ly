type BrevlyLinkProps = {
  originalUrl: string;
  shortenedUrl: string;
};

export function BrevlyLink({ originalUrl, shortenedUrl }: BrevlyLinkProps) {
  return (
    <div className="flex flex-col">
      <a
        rel="stylesheet"
        href={originalUrl}
        target="_blank"
        className="text-blue-500 font-medium"
      >
        {shortenedUrl}
      </a>
      <span className="text-xs text-gray-400">{originalUrl}</span>
    </div>
  );
}
