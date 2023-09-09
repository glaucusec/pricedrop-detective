import React from "react";

export default function SectionDivider(props) {
  return (
    <section className="section">
      <div className="container">{props.children}</div>
    </section>
  );
}
