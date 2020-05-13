export function snInit() {
  SpatialNavigation.init();

  SpatialNavigation.add('search-bar', {
    selector: '.search-bar .focusable',
    enterTo: 'last-focused'
  });
  SpatialNavigation.add({
    selector: '.shelf-list .focusable',
    straightOnly: true,
    leaveFor: { up: '.search-bar input' },
    enterTo: 'last-focused'
  });
  SpatialNavigation.add({
    selector: '.page-result .focusable',
    enterTo: 'last-focused'
  });
  SpatialNavigation.add({
    selector: '.overlay .focusable',
    restrict: 'self-only',
  });
}

export function snDestroy() {
  SpatialNavigation.uninit();
}