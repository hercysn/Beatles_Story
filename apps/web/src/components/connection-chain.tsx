type ConnectionChainProps = {
  items: string[];
};

export function ConnectionChain({ items }: ConnectionChainProps) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li
          key={`${index}-${item}`}
          className="grid grid-cols-[1.75rem_1fr] gap-3"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-apple text-sm font-semibold text-white">
            {index + 1}
          </span>
          <div className="min-w-0">
            <span className="block pt-1 text-sm leading-6 text-muted">
              {item}
            </span>
            {index < items.length - 1 ? (
              <span
                aria-hidden="true"
                className="mt-3 block h-5 w-px bg-ink/15"
              />
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
