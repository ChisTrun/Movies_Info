export default {
    data() {
        return {
            hasLoad: false,
        }
    },
    watch: {
        item(newVal, oldVal) {
            if (newVal != oldVal) {
                this.hasLoad = false;
            }
        },
    },
    props:['item'],
    emits:['showDetail'],
    methods: {
        showDetail(value){
            this.$emit('showDetail',value);
        },
        imageLoaded(){
            this.hasLoad = true;
        }
    },
    template: 
    `
        <div class="card h-100" @click="showDetail(item.id)">
            <div style="height: 80%" class="d-flex justify-content-center align-items-center">
                    <div v-if="!hasLoad" style="height: 300px" class="d-flex justify-content-center align-items-center">
                        <div class="spinner-border text-primary" role="status"></div>
                    </div>
                    <img  v-show="hasLoad" @load="imageLoaded"  class="card-img-top" :src="item.image" >
            </div>
                <div class="card-body">
                    <h5 class="card-title text-center">{{item.title}}</h5>
                    <p class="card-text text-center">Release Date: {{item.releaseDate}}</p>
                    <p class="card-text text-center">Length: {{item.runtimeStr}}</p>
                    <p class="card-text text-center">Awards: {{item.awards}}</p>
                </div>
        </div>
    `
}
