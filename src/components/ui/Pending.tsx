// Renders copy and flags unconfirmed data ("[PENDING: ...]" / "[PENDIENTE: ...]") so it is
// impossible to miss before launch. Remove the data from the dictionaries, not this component.
const PENDING = /(\[(?:PENDING|PENDIENTE)[^\]]*\])/;

export function Pending({ text }: { text: string }) {
  const parts = text.split(PENDING);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        PENDING.test(part) ? (
          <span
            key={i}
            className="border border-dashed border-gold/60 px-1 font-mono text-[0.8em] text-gold/90"
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
