export function snInit() {
  SpatialNavigation.init();

  SpatialNavigation.add('search-bar', {
    selector: '.search-bar .focusable',
    enterTo: 'last-focused'
  });
  SpatialNavigation.add('shelf-list', {
    selector: '.shelf-list .focusable',
    straightOnly: true,
    leaveFor: { up: '.search-bar input' },
    enterTo: 'last-focused'
  });
  SpatialNavigation.add('page-result', {
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

export function snOverlay() {
  SpatialNavigation.disable('search-bar')
  SpatialNavigation.disable('shelf-list')
  SpatialNavigation.disable('page-result')

  return () => {
    SpatialNavigation.enable('search-bar')
    SpatialNavigation.enable('shelf-list')
    SpatialNavigation.enable('page-result')
  } 
}