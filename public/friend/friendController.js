angular
    .module('myApp')
    .controller('FriendCtrl', function FriendController($scope, $http){
        console.log("angular controller is being connected");
    
        var dummy1 = {
            name: 'aku',
            email: 'aku@friend.com',
            phone: '081122'
        };

        var dummy2 = {
            name: 'kamu',
            email: 'kamu@friend.com', 
            phone: '082233'
        };
        var dummyCollection = [dummy1, dummy2];

        $scope.friendList = [];
        
        function getAllData(){ 
            var url = 'http://127.0.0.1:4000/getAllFriend';
            $http.get(url)
            .then(function(response) {
                //alert(JSON.stringify(response.data.models));
                $scope.friendList = response.data.models;
                //alert($scope.friendList);
            })
            .catch(function(error) {
                //alert(error.data)
                console.log('error:', error);    
                console.log('error status:', error.status);
            });
        };
        getAllData();

        $scope.select = function(data){
            var config = {
			headers : {
                    'Content-Type': 'application/json'
                }
            };

            var url = 'http://127.0.0.1:4000/getFriendById/' + data;
            $http.post(url, config)
            .then(function(response) {
                var result = response.data.models[0];
                var firstArray = JSON.stringify(result);

                //convert to obejct
                var jsonO = JSON.parse(firstArray);

                //display
                $scope.newName = jsonO.name;
                $scope.newEmail = jsonO.email;
                $scope.newPhone = jsonO.phone;
                $scope.editedId = jsonO.id;
            })
            .catch(function(error) {
                console.log('error:', error);    
                console.log('error status:', error.status);
            });
        }

        $scope.addFriend = function(){
            var newItem = {}
            newItem.bname = $scope.newName;
            newItem.bemail = $scope.newEmail;
            newItem.bphone = $scope.newPhone;
            
            var config = {
			headers : {
                    'Content-Type': 'application/json'
                }
            };
            var url = 'http://127.0.0.1:4000/addFriend';            
		    $http.post(url, newItem, config)
            .then(function(response){
                $scope.newName = '';
                $scope.newEmail = '';
                $scope.newPhone = '';
                $scope.editedId = 0;                
                getAllData();
            })
            .catch(function(error){
                alert('failed to insert');
            });
        }

        $scope.removeFriend = function(id){
            var config = {
                headers : {
                        'Content-Type': 'application/json'
                    }
                };
            var url = 'http://127.0.0.1:4000/removeFriend/' + id;            
		    $http.post(url, config)
            .then(function(response){
                getAllData();
            })
            .catch(function(error){
                alert('failed to remove');
            });
        }

        $scope.editFriend = function(data){
            var updatedItem = {}
            updatedItem.bid = data;
            updatedItem.bname = $scope.newName;
            updatedItem.bemail = $scope.newEmail;
            updatedItem.bphone = $scope.newPhone;
            console.log(updatedItem)

            var config = {
                headers : {
                        'Content-Type': 'application/json'
                    }
                };
            var url = 'http://127.0.0.1:4000/editFriend';            
		    $http.post(url, updatedItem, config)
            .then(function(response){
                $scope.newName = '';
                $scope.newEmail = '';
                $scope.newPhone = '';
                $scope.editedId = 0;                
                getAllData();
            })
            .catch(function(error){
                alert('failed to update');
            });
        }

    });