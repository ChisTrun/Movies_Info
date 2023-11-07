import pageHeader from './header.js'
import pageHome from './home.js'
import navPage from './nav.js'
import filmDetail from './filmDetail.js'
import search from './search.js'
import pageFooter from './footer.js'
import actorDetail from './actorDetail.js'

export default {
    data() {
        return {
            targetFilm: "",
            targetActor: "",
            currentContent: "page-home",
            searchValue: "",
            searchType: "title",
            darkMode: false
        }
    },
    computed:{
        getProp() {
            if(this.currentContent == "page-home") {
                return {
                    darkMode: this.darkMode
                }
            }
            if(this.currentContent == "film-detail") {
                return {
                    targetFilm: this.targetFilm,
                    darkMode: this.darkMode,
                    targetActor: this.targetActor
                }
            } 
            if(this.currentContent == "search") {
                return {
                    searchValue: this.searchValue,
                    searchType: this.searchType,
                    
                }
            } 
            if(this.currentContent == "actor-detail") {
                return {
                    targetActor: this.targetActor
                }
            } 
            
            
        },
        getEvent() {
            if(this.currentContent == "page-home") {
                return {
                    showDetail: this.showDetail
                }
            }
            if(this.currentContent == "film-detail") {
                return {
                    showActor: this.showActor
                }
            }
            if(this.currentContent == "search") {
                return {
                    showDetail: this.showDetail
                }
            }
            if(this.currentContent == "actor-detail") {
                return {
                    
                }
            } 
        },
        
        
    },
    methods: {
        handleCheck() {
            this.darkMode = !this.darkMode;
        },
        updateSearchType(value){
            this.searchType = value;
        },
        search() {
            this.searchValue = $('input[type="search"]').val();
            this.currentContent = 'search';
        },
        showDetail(value){
            this.targetFilm = value;
            this.currentContent = 'film-detail';
        },
        showActor(value) {
            this.targetActor = value;
            this.currentContent = "actor-detail";
        },
        returnHome(){
            this.currentContent = 'page-home';
        }
    },
    components: {
        pageHeader,pageHome,navPage,filmDetail,search,pageFooter,actorDetail
    },
    template: 
    `
    <div class="container-fluid" :class="{'bg-dark': darkMode,'bgColor' : !darkMode}">
            <page-header @handleCheck="handleCheck" :darkMode="darkMode"/>
            <nav-page :darkMode="darkMode" @returnHome="returnHome" @updateSearchType="updateSearchType" @search="search" :searchType="searchType" ></nav-page>
            <component :is="currentContent" v-bind="getProp" v-on="getEvent" />
            <page-footer :darkMode="darkMode"/>
    </div>
    `
}