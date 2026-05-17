// Center the active nav item in view (useful when nav scrolls horizontally on mobile).
(function () {
  const a = document.querySelector('nav.bar a.active');
  if (a) a.scrollIntoView({ inline: 'center', block: 'nearest' });
})();
