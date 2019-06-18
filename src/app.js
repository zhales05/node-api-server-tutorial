/*global axios */
/*global Vue */
var app = new Vue({
  el: '#app',
  data: {
    pokis: [],
    pokiName: '',
    pokiURL: '',
  },
  created: function() {
    this.getpokis();
  },
  methods: {
    async getpokis() {
      // `this` points to the vm instance
      console.log("get pokis");
      var url = "http://yourserver:4200/pokemon";
      try {
        let response = await axios.get(url);
        this.pokis = response.data;
        console.log(this.pokis);
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
  }
});
