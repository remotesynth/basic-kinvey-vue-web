<template>
<div v-bind:class="{ hidden:isLoaded }"><p>Connecting...</p></div>
</template>

<script>
import Kinvey from 'kinvey-html5-sdk'

export default {
    data() {
        return {
            activeUser: null,
            isLoaded: false
        }
    },
    props: ['appKey','appSecret'],
    methods: {
    },
    created() {
        var client = Kinvey.init({
            appKey: this.appKey,
            appSecret: this.appSecret
        });
        this.activeUser = Kinvey.User.getActiveUser(client);

        if (!this.activeUser) {
            var that = this;
            console.log('signing up');
            Kinvey.User.signup()
                .then(function(user) {
                    that.activeUser = user;
                    that.isLoaded = true;
                    that.$emit('kinvey-connected',that.activeUser);
                }).catch(function(error) {
                    console.log(error);
                });
        }
        else {
            console.log('user exists');
            this.isLoaded = true;
            this.$emit('kinvey-connected',this.activeUser);
        }
    }
}
</script>

<style>
.hidden {
    display: none;
}
</style>