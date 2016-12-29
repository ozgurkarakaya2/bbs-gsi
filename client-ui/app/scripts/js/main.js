var reg;
var sub;

function initPushService(){
  var isSubscribed = false;
  document.getElementById('subscription').disabled = true;
  if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('sw.js').then(function() {
      return navigator.serviceWorker.ready;
    }).then(function(serviceWorkerRegistration) {
      reg = serviceWorkerRegistration;
      document.getElementById('subscription').disabled = false;
      console.log('Service Worker is ready :^)', reg);
    }).catch(function(error) {
      console.log('Service Worker Error :^(', error);
    });
  }
}

function handleClick(cb){
  console.log('clicked' + cb.checked);
  if (cb.checked) {
    subscribe();
  } else {
    unsubscribe();
  }
}
function subscribe() {
  console.log("subscription started");
  reg.pushManager.subscribe({userVisibleOnly: true}).
  then(function(pushSubscription){
    sub = pushSubscription;
    console.log('Subscribed! Endpoint:', sub.endpoint);
    console.log('Subscribed! Subscription All :', JSON.stringify(sub));
    isSubscribed = true;
  });
}
function unsubscribe() {
  console.log("unsubscription started ");
  sub.unsubscribe().then(function(event) {
    console.log('Unsubscribed!', event);
    isSubscribed = false;
  }).catch(function(error) {
    console.log('Error unsubscribing', error);
  });
}