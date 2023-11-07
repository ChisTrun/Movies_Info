export default {
    props:["item"],
    emits:["showDetail"],
    data() {
        return {
            isHover: false,
            hasLoad: false
        }
    },
    methods: {
        mouseover(){
            this.isHover = true;
        },
        mouseOut() {
            this.isHover = false;
        },
        showDetail(value){
            this.$emit('showDetail',value)
        },
        imageLoaded(){
            this.hasLoad = true;
        }
    },
    template: 
    `
    

    <div v-if="!hasLoad" style="width: 100%;height: 400px" class="d-flex justify-content-center align-items-center">
        <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div v-show="hasLoad" style="width: 100%">
        <img   @load="imageLoaded"   :src="item.image"
            class="d-block  w-100 m-1" :alt="item.image" @click="showDetail(item.id)"  @mouseover="mouseover()" 
            @mouseleave="mouseOut()">
        
    </div>
    <div v-show="isHover" class="position-absolute  custom-text"  >
        <p  @click="showDetail(item.id)"  @mouseover="mouseover()" 
        class="text-center display-6 text-light bg-dark m-0 ">{{item.fullTitle}}</p>
    </div>
                            
    `
}