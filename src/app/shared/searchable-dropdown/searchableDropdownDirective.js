angular.module('searchableDropdownDirective', [])
  .directive('searchableDropdown', function() {
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
          <button class="btn btn-secondary dropdown-toggle custom-input w-100" 
                  ng-click="toggle()">
              {{selectedOption.name || placeholder || 'Seleccionar'}}
          </button>
          <div class="dropdown-menu w-100" ng-class="{'show': open}">
              <input type="search" 
                     class="form-control mx-3 my-2" 
                     ng-model="search" 
                     placeholder="Buscar...">
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" 
                      ng-repeat="option in options | filter:search" 
                      ng-click="select(option)">
                  {{option.name}}
              </button>
              <div class="dropdown-header" ng-show="(options | filter:search).length === 0">
                  No se encontraron resultados
              </div>
          </div>
        </div>
      `,
      link: function(scope, element) {
        scope.open = false;
        scope.search = '';

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

        // Close on outside click
        document.addEventListener('click', function(event) {
          if (scope.open && !element[0].contains(event.target)) {
            scope.open = false;
            scope.$applyAsync();
          }
        });
      }
    };
  });