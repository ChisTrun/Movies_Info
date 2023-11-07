export default {
    props: ['searchType','darkMode'],
    emits:['returnHome','search','updateSearchType'],
    computed: {
        theme() {
            if(this.darkMode) return 'dark'
            return 'light'
        }
    },
    methods: {
        returnHome(){
            this.$emit('returnHome');
        },
        search() {
            this.$emit('search');
        },
        updateSearchType($event){
            this.$emit('updateSearchType',$event.target.text)
        }
    },
    template:
    `
    <div class="row mb-2">
                <nav class="navbar bg-body-tertiary rounded border border-light " :data-bs-theme="theme">
                    <div class="container-fluid  ">
                        <a class="navbar-brand" @click="returnHome">Home</a>
                        <form class="d-flex justify-content-end  w-50" role="search" v-on:submit.prevent="search">
                            <input  class="form-control me-2 w-50" type="search" placeholder="Search" aria-label="Search"
                                data-bs-theme="light">
                            <button class="btn btn-outline-success w-25  me-2" type="submit">Search</button>
                            
                            <div class="btn-group mr-5 w-25 me-2" role="group">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                {{searchType}}
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" @click="updateSearchType($event)">title</a></li>
                                    <li><a class="dropdown-item" @click="updateSearchType($event)">actor</a></li>
                                </ul>
                            </div>

                        </form>
                    </div>
                </nav>
            </div>
    `
}