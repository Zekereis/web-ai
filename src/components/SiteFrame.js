import React from "react";

const SiteFrame = ({ site }) => {
  return (
    <div className="site-frame">
      <h3>{site.name}</h3>
      <p>{site.category}</p>
      <p>{site.description}</p>
      <a href={site.url} target="_blank" rel="noopener noreferrer">
        Siteye Git
      </a>
    </div>
  );
};

export default SiteFrame;
