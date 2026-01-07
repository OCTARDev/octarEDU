type Props = {
  text: string;       // could be rich text (HTML)
  maxLength: number;
};

function extractPlainText(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function TruncateWithTooltip({ text, maxLength }: Props) {
  // extract text from rich text/HTML
  const plainText = extractPlainText(text);

  const isLong = plainText.length > maxLength;
  const displayText = isLong ? plainText.slice(0, maxLength) + "…" : plainText;

  return (
    <span title={isLong ? plainText : undefined}>
      {displayText}
    </span>
  );
}

export default TruncateWithTooltip;
