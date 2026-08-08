"use client";

import { useMemo, useState } from "react";
import { RESEARCH_LINKS, searchResearchLinks } from "../src/lib/research-tools";

export function ResearchLibrary() {
  const [query, setQuery] = useState("");
  const links = useMemo(() => searchResearchLinks(RESEARCH_LINKS, query), [query]);

  return (
    <section id="research" className="research-library" aria-labelledby="research-heading">
      <div className="section-heading-row">
        <div><p className="eyebrow">Searchable research links</p><h2 id="research-heading">Follow the source, not the claim.</h2></div>
        <p className="result-count"><strong>{links.length}</strong> sources</p>
      </div>
      <label className="search-label" htmlFor="research-search">Search sources, methods, and evidence</label>
      <div className="search-shell research-search-shell">
        <span aria-hidden="true">⌕</span>
        <input id="research-search" className="search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="contracts · JSON · methodology · risk" />
      </div>
      <div className="research-link-grid">
        {links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="research-link-card">
            <span>{link.type}</span>
            <strong>{link.title}</strong>
            <p>{link.description}</p>
            <small>{new URL(link.url).hostname} ↗</small>
          </a>
        ))}
      </div>
      {links.length === 0 ? <p className="empty-state">No research links match “{query}”.</p> : null}
    </section>
  );
}
