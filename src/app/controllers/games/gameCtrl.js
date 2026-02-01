angular.module('myAppGameCtrl', ['myApp'])
  .controller('gameCtrl', ['$scope', 'games', 'API_BASE_URL', '$timeout',
    function ($scope, games, API_BASE_URL, $timeout) {

      $scope.API_BASE_URL = API_BASE_URL;
      $scope.SIDEKICK_API = process.env.SIDEKICK_API;

      $scope.page = 1;
      $scope.loading = false;
      $scope.hasNext = false;
      $scope.games = [];

      $scope.limit = $scope.limit || 30;
      $scope.sortBy = $scope.sortBy || 'updated_at';
      $scope.sortOrder = $scope.sortOrder || 'desc';

      function getOffset() {
        return ($scope.page - 1) * $scope.limit;
      }

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      function shouldRetry(err) {
        const status = err && err.response && err.response.status;
        return status === 502 || status === 503 || status === 504 || !status;
      }

      async function withRetries(fn, retries = 3, baseDelay = 400, maxDelay = 2500) {
        let lastErr;

        for (let attempt = 0; attempt <= retries; attempt++) {
          try {
            return await fn();
          } catch (err) {
            lastErr = err;

            if (attempt === retries || !shouldRetry(err)) {
              throw err;
            }

            const delay = Math.min(maxDelay, baseDelay * Math.pow(2, attempt));
            await sleep(delay);
          }
        }

        throw lastErr;
      }

      function loadPage() {
        $scope.loading = true;

        var limit = $scope.limit || 30;
        var offset = getOffset();
        var sortBy = $scope.sortBy || 'updated_at';
        var sortOrder = $scope.sortOrder || 'desc';

        withRetries(() =>
          games.getAll(limit + 1, offset, sortBy, sortOrder)
        )
          .then(function (rows) {
            rows = rows || [];
            $scope.hasNext = rows.length > limit;
            $scope.games = rows.slice(0, limit);
          })
          .catch(function () {
            $scope.hasNext = false;
            $scope.games = [];
          })
          .finally(function () {
            $scope.loading = false;
            $scope.$applyAsync();
          });
      }

      $scope.nextPage = function () {
        if ($scope.hasNext && !$scope.loading) {
          $scope.page++;
          loadPage();
        }
      };

      $scope.prevPage = function () {
        if ($scope.page > 1 && !$scope.loading) {
          $scope.page--;
          loadPage();
        }
      };

      $timeout(function () {
        loadPage();
      }, 0);

    }]);