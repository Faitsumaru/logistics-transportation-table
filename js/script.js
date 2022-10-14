var application = new Vue({
    el: '#app',
    data () {
      return {
        allData: [],
        pageNumber: 1,
        rowsPerPage: 5
      };
    },
    methods: {
      fetchAllData:function() {
          axios
            .post('php/action.php')
            .then(res => {
              application.allData = res.data;
              //console.log(res.data);
            })
            .catch(function(error) {
              console.log(error);
            });
      },
  
      sortBy(key) {
        return this.allData.sort(function(a, b){
          if (key == 'name' || key == 'date')
            return (a[key] > b[key]) ? 1 : -1;
          return (parseInt(a[key]) >= parseInt(b[key])) ? 1 : -1;
        });
      },
  
      pageClick(page) {
        this.pageNumber = page;
      },
  
      rightClick() {
        this.pageNumber++;
      },
  
      leftClick() {
        this.pageNumber--;
      }
  
    },
    created:function() {
      this.fetchAllData();
    },
    computed: {
      pages() {
        return Math.ceil(this.allData.length / 10 + 1);
      },
  
      paginatedPages() {
        let from = (this.pageNumber - 1) * this.rowsPerPage;
        let to = from + this.rowsPerPage;
        return this.allData.slice(from, to);
      }
    }
  });