export default {
    props:["item"],
    data() {
        return {
            hasLoad: false
        }
    },
    methods: {
        showDetail(film){
            this.$emit("showDetail",film);
        },
        imageLoaded(){
            this.hasLoad = true;
        }
    },
    template: `
    
        <div v-if="!hasLoad" style="width: 100%;height: 500px" class="d-flex justify-content-center align-items-center">
                <div class="spinner-border text-primary" role="status"></div>
        </div>
        <div v-show="hasLoad" style="width: 100%">
            <img :src="item.image" @load="imageLoaded"
                class="d-block w-50 mx-auto " :alt="item.image">
            <div class="carousel-caption d-none d-md-block">
                <h5>{{item.fullTitle}}</h5>
            
            </div>
        </div>


    `
}