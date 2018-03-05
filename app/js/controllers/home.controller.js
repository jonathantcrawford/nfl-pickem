(function () {
    'use strict';

    angular
        .module('app')
        .filter('range', function() {
          return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
              input.push(i);
            return input;
          };
        })
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', '$scope', '$http'];
    function HomeController(UserService, $rootScope, $scope, $http) {

        var vm = this;
        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

        $http.get('./data/teams.json')
        .then(function(response){
          $scope.teams = response.data;
        });

        $http.get('./data/2016_full_game_schedule.json')
        .then(function(response){
          $scope.games = response.data;
        });

        $scope.seasonweeks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];
        $scope.conferences = ['Any', 'AFC', 'NFC'];
        $scope.divisions = ['Any', 'North', 'East', 'West', 'South'];

        $scope.selectionFilter = function(game) {
          var conferenceMatches = false;
          var divisionMatches = false;
          if ($scope.current_selection == undefined) {return true;}
          else
          {

            if ($scope.teams[game.awayTeam.ID].Conference == $scope.current_selection.conference){conferenceMatches = true;}
            else if ($scope.current_selection.conference == "Any"){conferenceMatches = true;}
            else{conferenceMatches = false;}

            if ($scope.teams[game.awayTeam.ID].Division == $scope.current_selection.division){divisionMatches = true;}
            else if ($scope.current_selection.division == "Any"){divisionMatches = true;}
            else{divisionMatches = false;}
            if (conferenceMatches == true && divisionMatches == true) {return true;}

            if ($scope.teams[game.homeTeam.ID].Conference == $scope.current_selection.conference){conferenceMatches = true;}
            else if ($scope.current_selection.conference == "Any"){conferenceMatches = true;}
            else{conferenceMatches = false;}

            if ($scope.teams[game.homeTeam.ID].Division == $scope.current_selection.division){divisionMatches = true;}
            else if ($scope.current_selection.division == "Any"){divisionMatches = true;}
            else{divisionMatches = false;}


            if (conferenceMatches == true && divisionMatches == true) {return true;}

          }
          return false;
        }
      }

})();
