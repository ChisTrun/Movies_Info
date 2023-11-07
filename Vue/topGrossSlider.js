import DBProvider from '../Js/DBProvider.js'
import pageItem from './topGrossSliderItem.js';

export default {
    props:["countLoad"],
    emits: ['showDetail','increaCount'],
    data(){
        return {
            currentPage: 1,
            perPage: 5,
            numberPage: 5,
            hasLoaded: false,
            data: []
        }
    },
    mounted() {
        this.fetchData(this.perPage,this.currentPage);
        
    },
    components: {pageItem},
    methods: {
        async fetchData(perPage,page) {
            try {
                this.data =  (await DBProvider.methods.fetch(`get/Movies/top-grossing?per_page=${perPage}&page=${page}`))
                this.$emit("increaCount");
            } catch (error) {
                console.log(error);
            };
            
        },
        showDetail(film){
            this.$emit("showDetail",film);
        }
    },
    template:
    `
    <div class="row popularMoviesRow">
                <div id="target" class="carousel slide">
                    <div class="carousel-indicators">
                        <button v-for="index in numberPage" type="button" data-bs-target="#target" :data-bs-slide-to="index - 1"
                        :class="{active : currentPage === index}" :aria-current="currentPage === index" :aria-label="'Slide ' + index"></button>
                    </div>
                    <div class="carousel-inner">
                        <div v-for="(item, index) in data.items" class="carousel-item" @click="showDetail(item.id)" :class="{active: index == currentPage}">
                            <page-item :item="item" ></page-item>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#target"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#target"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
    `
}