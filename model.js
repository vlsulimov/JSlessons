window.Model = {
    login(appID, permis){
        return new Promise((resolve, reject) => {
            VK.init({
                apiId: appID
            });

            VK.Auth.login(response => {
                if (response.session){
                    resolve(response);
                } else{
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, permis);
        });
    },
    callApi(method, params){
        params.v = params.v || '5.78';
        return new Promise((resolve, reject) => {
            VK.api(method, params, response => {
                if (response.error) {
                    reject(new Error(response.error.error_msg))
                } else{
                    resolve(response.response);
                }
            });
        });
    },
    getFriends(params = {}){
        return this.callApi('friends.get', params);
    }
};