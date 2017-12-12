import Vue from 'vue'
import Kinvey from 'kinvey-html5-sdk'
import KinveyConfig from '../../kinvey-config'

const KinveyVue = new Vue({
    data: {
        appkey: KinveyConfig.APPKEY,
        appsecret: KinveyConfig.APPSECRET,
        activeUser: null,
        isConnected: false,
        DataStoreType: Kinvey.DataStoreType
    },
    created() {
        var client = Kinvey.init({
            appKey: this.appkey,
            appSecret: this.appsecret
        });
        this.activeUser = Kinvey.User.getActiveUser(client);
        
        if (!this.activeUser) {
            var that = this;
            console.log('signing up');
            Kinvey.User.signup()
                .then(function(user) {
                    that.activeUser = user;
                    that.isConnected = true;
                    that.$emit('kinvey-connected');
                }).catch(function(error) {
                    console.log(error);
                });
        }
        else {
            console.log('user exists');
            this.isConnected = true;
            this.$emit('kinvey-connected');
        }
    },
    methods: {
        getCollection(collectionName,datastoretype) {
            return Kinvey.DataStore.collection(collectionName,datastoretype);    
        }
    }
});

export default KinveyVue;