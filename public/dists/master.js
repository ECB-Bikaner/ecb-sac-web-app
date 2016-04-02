!function(){var app=angular.module("sac",["ui.router","clubInfo","auth0","angular-storage","angular-jwt","edit_event","ngSanitize","society_info"]);app.config(function(authProvider){authProvider.init({domain:"rail.auth0.com",clientID:"BR7dnfQB0ExcbUlb9wnL0IXgWUqkPqaF",loginState:"home"})}),app.run(function(auth){auth.hookEvents()}),app.run(function($rootScope,auth,store,jwtHelper,$location){$rootScope.$on("$locationChangeStart",function(){var token=store.get("token");token&&(jwtHelper.isTokenExpired(token)?$location.path("/"):auth.isAuthenticated||auth.authenticate(store.get("profile"),token))})}),app.controller("LoginCtrl",["$scope","$http","auth","store","$location",function($scope,$http,auth,store,$location){$scope.login=function(){auth.signin({},function(profile,token){store.set("profile",profile),store.set("token",token),$location.path("/")},function(){})},$scope.logout=function(){auth.signout(),store.remove("profile"),store.remove("token"),$location.path("/home")},$scope.auth=auth}]),app.controller("UserInfoCtrl",["$scope","auth",function($scope,auth){$scope.auth=auth}]),app.controller("HeaderCtrl",["$scope",function($scope){}]),app.controller("HomeCtrl",["$scope","$http","society_factory",function($scope,$http,society_factory){$scope.societies=society_factory,$http.get("/home").success(function(data){console.log(data),$scope.home_events=data})}]),app.controller("GalleryCtrl",["$scope",function($scope){$scope.pupu=["./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/5.jpg","./images/office.jpg"]}]),app.controller("EventCtrl",["$scope","$http","$stateParams","auth","$window",function($scope,$http,$stateParams,auth,$window){$http.get("/"+$stateParams.id).success(function(data){$scope.event=data}),$scope.auth=auth,$scope["delete"]=function(event){auth.profile.nickname===event.event_club&&$http["delete"]("/"+event._id).success(function(){$window.location.href="#/home"})},$scope.showDelete=function(event){return auth.profile.nickname===event.event_club}}]),app.controller("Allclubs",["$scope","society_factory","$stateParams",function($scope,society_factory,$stateParams){selectedSociety=society_factory.find(function(element){return element.id==$stateParams.id}),$scope.firstname=selectedSociety.name,$scope.des=selectedSociety.description,$scope.club=selectedSociety.club_ids,$scope.image=selectedSociety.image,$scope.club_imag=selectedSociety.image,$scope.id=selectedSociety.id}]),app.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider,$httpProvider,authProvider){$stateProvider.state("home",{url:"/home",templateUrl:"./templetes/home.html",controller:"HomeCtrl"}).state("gallery",{url:"/gallery",templateUrl:"./templetes/gallery.html",controller:"GalleryCtrl"}).state("club_info",{url:"/{society_id}/{club_id}",templateUrl:"./templetes/club_info.html",controller:"ClubInfoController"}).state("edit_event",{url:"/edit_event",templateUrl:"./templetes/edit-event.html",controller:"editEventCtrl",data:{requiresLogin:!0}}).state("event",{url:"/clubs/event/{id}",templateUrl:"./templetes/event.html",controller:"EventCtrl"}).state("all_club",{url:"/{id}",templateUrl:"./templetes/Allclubs.html",controller:"Allclubs"}),$urlRouterProvider.otherwise("home")}])}();