//Checkbox with data-toggle css style blocks ng-click and ng-change directives on angularjs therefore this js is used
function handleClick(cb){
  console.log('clicked' + cb.checked);
  if (cb.checked) {
    angular.element(document.getElementById('controller')).scope().initiateSubscription();
  } else {
    angular.element(document.getElementById('controller')).scope().unsubscribe();
  }
}