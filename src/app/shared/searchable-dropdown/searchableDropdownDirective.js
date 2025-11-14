angular.module('searchableDropdownDirective', ['myAppGameService'])
  .directive('searchableDropdown', ['games', function(games) {
    return {
      restrict: 'E',
      scope: {
        options: '=',
        selectedOption: '=',
        onSelect: '&',
        placeholder: '@'
      },
      template: `
        <div class="dropdown" ng-class="{'show': open}">
          <button type="button" class="btn btn-secondary dropdown-toggle custom-input w-100" 
                  ng-click="toggle()">
              {{selectedOption.name || placeholder || 'Seleccionar'}}
          </button>
          <div class="dropdown-menu w-100" ng-class="{'show': open}">
              <input type="search" 
                     class="form-control mx-3 my-2" 
                     ng-model="search" 
                     placeholder="Buscar...">
              <div class="dropdown-divider"></div>
              <div class="dropdown-header" ng-show="isLoading">
                  <i class="fas fa-spinner fa-spin"></i> Buscando...
              </div>
              <button type="button" class="dropdown-item" 
                      ng-repeat="option in options | filter:search" 
                      ng-click="select(option)"
                      ng-hide="isLoading">
                  {{option.name}}
              </button>
              <div class="dropdown-header" ng-show="!isLoading && search && search.length >= 3 && (options | filter:search).length === 0">
                  No se encontraron resultados para "{{search}}"
              </div>
              <div class="dropdown-header" ng-show="!isLoading && search && search.length > 0 && search.length < 3">
                  Escribe al menos 3 caracteres para buscar
              </div>
              <div class="dropdown-header" ng-show="!isLoading && (!search || search.length === 0) && (!options || options.length === 0)">
                  Escribe para buscar opciones
              </div>
          </div>
        </div>
      `,
      link: function(scope, element) {
        scope.open = false;
        scope.search = '';
        scope.isLoading = false;

        scope.select = function(option) {
          scope.selectedOption = option;
          scope.open = false;
          scope.search = '';
          if (scope.onSelect) {
            scope.onSelect({selectedOption: option});
          }
        };

        scope.toggle = function() {
          scope.open = !scope.open;
          if (!scope.open) scope.search = '';
        };

        var searchTimeout;
        var currentRequestId = 0;
        
        scope.performSearch = function(searchTerm) {
          if (!searchTerm || searchTerm.length < 3) {
            return;
          }

          currentRequestId++;
          var thisRequestId = currentRequestId;

          scope.isLoading = true;
          
          games.search(10, 0, 'updated_at', 'desc', searchTerm)
            .then(function(response) {
              // Always reset loading if this is the most recent request
              if (thisRequestId === currentRequestId) {
                scope.isLoading = false;
                
                // Only update options if search term still matches
                if (scope.search === searchTerm) {
                  scope.options = response.map(function(game) {
                    return {
                      value: game.id,
                      name: game.name,
                      full: game
                    };
                  });
                }
                scope.$applyAsync();
              }
            })
            .catch(function(error) {
              // Always reset loading if this is the most recent request
              if (thisRequestId === currentRequestId) {
                scope.isLoading = false;
                
                // Only show error if search term still matches
                if (scope.search === searchTerm) {
                  console.log('Error searching games:', error);
                }
                scope.$applyAsync();
              }
            });
        };

        // Watch for changes in search input with debouncing
        scope.$watch('search', function(newValue, oldValue) {
          // Clear previous timeout
          if (searchTimeout) {
            clearTimeout(searchTimeout);
          }

          // Reset loading if search is cleared or less than 3 characters
          if (!newValue || newValue.length < 3) {
            scope.isLoading = false;
          }

          if (newValue && newValue !== oldValue) {
            // Debounce: wait 500ms after user stops typing
            searchTimeout = setTimeout(function() {
              scope.performSearch(newValue);
            }, 500);
          }
        });

        // Close on outside click
        document.addEventListener('click', function(event) {
          if (scope.open && !element[0].contains(event.target)) {
            scope.open = false;
            scope.$applyAsync();
          }
        });
      }
    };
  }]);