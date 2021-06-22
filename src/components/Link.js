import React from 'react'

function Link({ className, href, children }) {
  const onClick = (event) => {
    // open in a new tab with Cmd on Mac or Ctrl on Windows using default functionality
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();

    // change URL
    window.history.pushState({}, '', href);

    // Communicate to route components that URL has changed
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  )
};

export default Link

