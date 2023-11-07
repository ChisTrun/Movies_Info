import DBProvider from '../Js/DBProvider.js'
import sliderItem from './sliderItem.js';

export default {
    props: {
        title: "default",
        className: "default",
        countLoad: Number,
        darkMode: false
    },
    emits: ['showDetail', 'increaCount'],
    data() {
        return {
            currentPage: 1,
            perPage: 3,
            numberPage: 5,
            films: []
        }
    },
    computed: {
        getTargetSlide() {
            return "#" + this.className;
        }
    },
    components: {
        sliderItem
    },
    methods: {
        async fetchData(perPage, page) {
            const data = await DBProvider.methods.fetch(`get/${this.className}/?per_page=${perPage}&page=${page}`);
            return data.items;
        },
        async getFilm() {
            try {
                for (let page = 1; page <= this.numberPage; page++) {
                    const items = await this.fetchData(this.perPage, page);
                    this.films.push(items);
                }
                this.$emit("increaCount");
            } catch (error) {
                console.log(error);
            };
        },
        showDetail(film) {
            this.$emit("showDetail", film);
        }
    },
    watch: {
        className(newVal, oldVal) {
            if (newVal != oldVal) {
                this.getFilm();
            }
        }
    },
    mounted() {
        this.getFilm();
    },
    template:
        `
    <div class="row">
        <div :id="className" class="carousel slide homeSlider">
            
            <h1 :class="{'text-light': darkMode}">{{title}}</h1>
             
            <div class="carousel-indicators carousel-indicators_slider">
                    <button v-for="index in numberPage" type="button" :data-bs-target="getTargetSlide" :data-bs-slide-to="index - 1"
                    :class="{active : currentPage === index}" :aria-current="currentPage === index" :aria-label="'Slide ' + index"></button>
                </div>
            <div class="carousel-inner">
               <div>
                    <div v-for="(pageItem, index)  in  films" class="carousel-item  "  :class="{ active : index == currentPage}" >
                                
                            <div  class="d-flex justify-content-center" >
                                    <div v-for="item  in  pageItem" class="zoom d-flex flex-column justify-content-center align-items-center zoom w-25 m-1 position-relative">
                                        <slider-item :item="item" @showDetail="showDetail"/>
                                    </div>
                            </div>
                                    
                                
                    </div>
               </div>
            </div>
            <button class="carousel-control-prev" type="button" :data-bs-target="getTargetSlide"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" :data-bs-target="getTargetSlide"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    `
}