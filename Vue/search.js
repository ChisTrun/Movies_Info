import provider from '../Js/DBProvider.js'
import searchItem from './searchItem.js';

export default {
    props:['searchValue','searchType'],
    emits: ['showDetail'],
    data() {
        return {
            data: Object,
            currentPage: 1,
            perPage: 9,
        }
    },
    methods: {
        async getData() {
            this.data = (await provider.methods.fetch(`search/Movies/${this.searchValue}?per_page=${this.perPage}&page=${this.currentPage}&search_type=${this.searchType}`));
        },
        showDetail(film){
            this.$emit("showDetail",film);
        },
        changePage(isNext) {
            if (isNext && this.currentPage < this.data.total_page) {
                this.currentPage += 1;
                this.getData();
            } else if (!isNext && this.currentPage > 1) {
                this.currentPage -= 1;
                this.getData();
            }
        },
    },
    watch: {
        searchValue(newVal, oldVal) {
            if (newVal != oldVal) {
                this.currentPage =1;
                this.getData();
            }
        },
        searchType(newVal, oldVal) {
            if (newVal != oldVal) {
                this.currentPage =1;
                this.getData();
            }
        }
    },
    mounted() {
        (async () => {
            await this.getData();
        })()
    },
    components: {searchItem},
    template:
    `
    <div v-if="data.total_page == 0">
        <div class="alert alert-danger " role="alert">
                    <h4 class="alert-heading">Data Not Found or Currently Being Updated</h4>
                    <p>I apologize for the inconvenience. The data you are looking for is currently unavailable or in the process of being updated. We understand the importance of this information to you and are working diligently to resolve this issue. We appreciate your patience and understanding during this time.</p>
                    <hr>
                    <p class="mb-0">Best Regards, Vo Chi Trung.</p>
        </div>
    </div>
    <div class="row">
                <div v-for="item in data.items" class="col-sm-4 p-5">
                    <search-item @showDetail="showDetail" :item="item"></search-item>
                </div>
            </div>
            <div v-if="data.total_page > 1" class="row ">
                <ul class="pagination d-flex  justify-content-center">
                    <li class="page-item">
                        <a class="page-link" @click="changePage(false)" href="#"  aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item w-25 text-center text-light" >{{currentPage}}/{{data.total_page}}</li>
                    <li class="page-item">
                        <a class="page-link" @click="changePage(true)" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </div>
    `
}