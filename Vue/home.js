import topGrossSlider from "./topGrossSlider.js"
import slider from "./slider.js"

export default {
    props:["darkMode"],
    emits: ['showDetail'],
    data() {
        return {
            countLoad: 0
        }
    },
    methods: {
        showDetail(film){
            this.$emit("showDetail",film);
        },
        increaCount(){
            this.countLoad += 1; 
        }
    },
    components: {
        topGrossSlider,slider
    },
    
    template:
    `   
            <div v-if="countLoad != 3" class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
            </div>
            <div v-show="countLoad == 3">
                <top-gross-slider :countLoad="countLoad" @increaCount="increaCount" @showDetail="showDetail" />
                <slider title="Most Popular" :countLoad="countLoad" @increaCount="increaCount" className="MostPopularMovies" @showDetail="showDetail" :darkMode="darkMode"/>
                <slider title="Top Rating" :countLoad="countLoad" @increaCount="increaCount" className="Top50Movies" @showDetail="showDetail" :darkMode="darkMode"/>
            </div>
            
    `
}