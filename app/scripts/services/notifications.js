'use strict';

/**
 * @ngdoc service
 * @name hackucscApp.notifications
 * @description
 * # notifications
 * Service in the hackucscApp.
 */
angular.module('hackucscApp')
	.service('notifications', function($firebaseObject, $firebaseArray, Ref) {
		var notifications = {};
		notifications.notifyUser = function(recipient, notification) {
			var notifications = $firebaseArray(Ref.child('notification'));
			notifications.$add({
				recipient: recipient,
				text: notification.text,
        title: notification.title,
        icon: notification.icon || null,
        link: notification.link || '',
				read: false
			});
		};
    notifications.getUserNotifcations = function(user) {
      return $firebaseArray(Ref.child('notification').orderByChild('recipient').equalTo(user.$id));
    };
		notifications.getCurrentUserNotifications = function() {
			var auth = Ref.getAuth(),
        user = $firebaseObject(Ref.child('users').child(auth.uid));
			return this.getUserNotifcations(user);
		};
		notifications.markRead = function (notification) {
			notification.read = true;
			notification.$save();
			//this.getCurrentUserNotifications()
		};
		return notifications;
	});
