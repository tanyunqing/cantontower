function emptyStringIsNull(s) {
    return s && s.length > 0 ? s : null;
}

window.hashCache = window.location.hash;

angular.module("menus.module", ["ngSanitize"])

    .controller("menuController", [
        "$scope", "$http", "$window",
        function($scope, $http, $window) {

            $scope.openShop = function() {
              //ACCESSO.openShop("daily");
              accesso.overlay.open();
            };

            $scope.openSection = function(section){
              if(section.url){
                if(section.url == "#/#daily" || section.url == "#daily")
                  $scope.openShop();
                else if(section.url.substring(0, 1) == "#"){
                  hashless = section.url.substring(1, section.url.length);
                  window.location.hash = hashless
                }else{
                  section.openURL();
                }
              }
            };

            $scope.handleLink = function(url){
              if(url){
                if(url.indexOf(window.location.origin + window.location.pathname) > -1 && url.indexOf("#") > -1){
                  //this is the same base URL, contains either a hash or a query string; only supporting hash for now
                  //handle hash manually
                  var hash = url.substring(url.indexOf("#"), url.length);
                  window.location.hash = hash;
                }else{
                  window.open(url, "_self");
                }
                if ($event.stopPropagation) $event.stopPropagation();
                if ($event.preventDefault) $event.preventDefault();
              }
            };

            $scope.menuPanelClick = function(item){
              if(item && item.links && item.links[0])
                $window.open(item.links[0].url, "_self");
            }

            var Section = function() {
                this.label = null;
                this.cssClass = null;
                this.url = null;
                this.subSection = null;
            }

            Section.prototype = {
                openURL: function() {
                    if (this.url) {
                      $window.open(this.url, "_self");
                    }
                },

                openSubSection: function() {
                    if (this.subSection) {
                        this.subSection.open();
                    }
                },

                closeSubSection: function() {
                    if (this.subSection) {
                        this.subSection.close();
                    }
                }
            }

            $scope.sections = null;

            var SubSection = function() {
                this.isOpen = false;
                this.items = null;
                this.cssClass = null;
            }

            SubSection.prototype = {
                open: function() {
                    this.isOpen = true;
                },

                close: function() {
                    this.isOpen = false;
                }
            }

            $scope.subSections = [];

            $scope.ready = true;

            //$http({ method: "GET", url: "/home/json/nav.json", cache: true }).error(function(a, b, c, d){}).success(function(data) {
            $http({ method: "GET", url: "/nav", cache: true }).error(function(a, b, c, d){}).success(function(data) {
                $scope.sections = _.map(data, function(element, index) {
                    var section = new Section();

                    section.label =  element.nav_label;
                    section.cssClass =  emptyStringIsNull(element.css_class_string);
                    section.url = emptyStringIsNull(element.url);

                    if (element.children && element.children.length>0) {
                        section.subSection = new SubSection();

                        section.subSection.items = _.map(element.children, function(element, index) {
                            var item = {};

                            item.label = element.nav_label;
                            item.description = element.description;
                            item.links = _.map(element.children, function(element, index) {
                                return {
                                    label: element.nav_label,
                                    url: element.url,
                                    cssClass: element.css_class_string
                                }
                            });

                            return item;
                        });

                        $scope.subSections.push(section.subSection);
                    }

                    return section;
                });

                $scope.isOpen = false;

                $scope.open = function() {
                    if ($scope.ready) {
                        $scope.isOpen = true;
                    }
                }

                $scope.close = function() {
                    if ($scope.ready) {
                        $scope.isOpen = false;
                    }
                }

                $scope.isHover = false;

                $scope.hoverIn = function() {
                    if ($scope.ready) {
                        $scope.isHover = true;
                    }
                }

                $scope.hoverOut = function() {
                    if ($scope.ready) {
                        $scope.isHover = false;
                    }
                }

                $scope.backgroundColor = "blue"

                // export some globals

                window.openMenu = function() {
                  $scope.open();
                  if(!$scope.$$phase)
                    $scope.$apply();
                };

                window.closeMenu = function() {
                  $scope.close();
                  if(!$scope.$$phase)
                    $scope.$apply();
                }

                window.setMenuColor = function(c) {
                  $scope.backgroundColor = c;
                  if(!$scope.$$phase)
                    $scope.$apply();
                }

                if(window.maybeLoaded)
                  window.maybeLoaded();

                if($(window).width() > 800)
                  window.openMenu();

            });
        }
    ])

    .directive("mobileMenuContainer", [
        function() {
            function linker(scope, element, attrs) {
              $(window).resize(function() {
                var scale = document.documentElement.clientHeight/$(element).height();

                //$(element).css("transform", "scale("+scale+","+scale+")");
              });

              $(window).trigger("resize");


              //window location hash hack, for both mobile and desktop (since this directive is included in desktop, just hidden)
              if(window.hashCache){
                //there's a hash passed directly into the URL, but Angular's routing seems to get in the way of actually letting the browser scroll to that anchor.
                //workaround:  remove the hash upon load; wait some time; reapply the hash
                window.location.hash = "#loading";
                var reapplyHash = function(){
                  window.location.hash = window.hashCache;
                }
                setTimeout(reapplyHash, 1500)
              }
            }

            return {
                link: linker,
                restrict: "C"
            }
        }
    ])

    .controller("mobileMenuController", [
        "$scope", "$http", "$window", "$timeout",
        function($scope, $http, $window, $timeout) {
            $scope.menuPages = [];
            $scope.ready = false;


            $scope.showFullSizedMenu = false;

            $scope.setHiddenPromise = null;

            $scope.anyPageOpen = function(){
              return _.reduce($scope.menuPages, function(memo, menuPage){  return memo || menuPage.isOpen; }, false);
            }

            $scope.$watch($scope.anyPageOpen, function(){
              if($scope.anyPageOpen()){
                $scope.showFullSizedMenu = true;
                if($scope.setHiddenPromise){
                  $timeout.cancel($scope.setHiddenPromise);
                  $scope.setHiddenPromise = null;
                }
              }else{
                var setHidden = function(){
                  $scope.showFullSizedMenu = false;
                  if(!$scope.$$phase)
                    $scope.$apply();
                }
                $scope.setHiddenPromise = $timeout(setHidden, 500);
              }
            });


            $scope.openShop = function() {
              //ACCESSO.openShop("daily");
              accesso.overlay.open();
            };

            var MenuPage = function(dataObj, zIndex) {
                this.isOpen = false;
                this.label = dataObj.nav_label;
                this.url = dataObj.children.length > 0 ? null : emptyStringIsNull(dataObj.url);
                this.cssClass = emptyStringIsNull(dataObj.css_class_string);
                this.parentId = dataObj.parent_id ? parseInt(dataObj.parent_id) : -1;
                this.zIndex = zIndex;
                this.description = dataObj.children.length==1 && dataObj.children[0].children.length==0 ? dataObj.description : null;
                this.children = _.map(dataObj.children, function(element, index){
                    var newPage = new MenuPage(element, zIndex + 10);
                    if (newPage.children.length>0) {
                        $scope.menuPages.push(newPage);
                    }
                    return newPage;
                });
            }

            MenuPage.prototype = {
                open: function() {
                    this.isOpen = true;
                },

                close: function() {
                    this.isOpen = false;
                },

                openContent: function() {
                  if (this.url) {
                    if(this.url.indexOf(window.location.origin + window.location.pathname) > -1 && this.url.indexOf("#") > -1){
                      //this is the same base URL, contains either a hash or a query string; only supporting hash for now
                      //handle hash manually
                      var hash = this.url.substring(this.url.indexOf("#"), this.url.length);
                      window.location.hash = hash;
                    }else{
                      window.open(this.url, "_self");
                    }
                  }
                  else {
                      this.open();
                  }
                }
            }

            //$http({ method: "GET", url: "/home/json/nav.json", cache: true }).success(function(data) {
            $http({ method: "GET", url: "/nav", cache: true }).success(function(data) {
                var i = 0;
                while(i<data.length) {
                    if (data[i].css_class_string.length==0) {
                        data.splice(i, 1);
                    }
                    else {
                        i++;
                    }
                }
                $scope.rootPage = new MenuPage({ children: data }, 10);
                $scope.menuPages.push($scope.rootPage);

                $scope.openMenu = function() {
                    $scope.rootPage.open();
                }

                $scope.closeMenu = function() {
                    $.each($scope.menuPages, function(index, element){
                        element.close();
                    });
                }

                window.openMobileMenu = $scope.openMenu;
                window.closeMobileMenu = $scope.closeMenu;
            });
        }
    ])