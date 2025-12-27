angular.module('myAppNavbarService', [])

.factory('navbarFactory', [function(){
	return{
		getNavbarHeadings: function(){
			var headings = [
			{
				title: 'home',
				img: 'home'
			},{
				title: 'notifications',
				img: 'notifications'
			},{
				title: 'games',
				img: 'plays'
			},{
				title: 'posts',
				img: 'plus'
			},{
				title: 'applications',
				img: 'messages'
			},{
				title: 'profile',
				img: 'profile'
			},{
				title: 'store',
				img: 'cart'
			},{
				title: 'config',
				img: 'settings'
			}
			];
			return headings;
		}
	};
}])