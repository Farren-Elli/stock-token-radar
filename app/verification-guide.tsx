const steps = [
  { number: "01", title: "Match the symbol", text: "Start with the expected ticker and instrument name. A familiar label alone is not verification." },
  { number: "02", title: "Open the first-party registry", text: "Find the symbol in Robinhood’s asset registry and inspect its Robinhood Chain deployment." },
  { number: "03", title: "Compare the complete address", text: "Check every character of the contract address. Do not rely on a shortened prefix or suffix." },
  { number: "04", title: "Confirm the evidence date", text: "Review the retrieval timestamp and snapshot hash. A mapping is an observation at a specific time." },
  { number: "05", title: "Separate identity from safety", text: "A canonical mapping does not prove share ownership, price quality, liquidity, or investment suitability." },
];

export function VerificationGuide() {
  return (
    <section id="guide" className="verification-guide" aria-labelledby="guide-heading">
      <div className="guide-heading">
        <p className="eyebrow">How to verify a token</p>
        <h2 id="guide-heading">Five checks before you trust a ticker.</h2>
        <p>This workflow verifies a first-party contract mapping. It does not turn the token into the underlying share or make it a suitable investment.</p>
      </div>
      <ol className="guide-steps">
        {steps.map((step) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <div><strong>{step.title}</strong><p>{step.text}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
