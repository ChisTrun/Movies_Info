export default  {
    props:['darkMode'],
    emits: ['handleCheck'],
    computed: {
        theme() {
            if(this.darkMode) return 'dark'
            return 'light'
        }
    },
    methods: {
        handleCheck() {
            this.$emit('handleCheck');
        }
    },
    template: 
    `
    <div class="row ">
                <nav class="navbar bg-body-tertiary rounded border border-light pt-3 pb-3  mb-2" :data-bs-theme="theme">
                    <div class="container-fluid ">
                        <h1 class="navbar-brand fs-6 w-25">21120159</h1>
                        <h1 class="navbar-brand fs-1">Movies info</h1>
                        <div class="navbar-brand d-flex flex-column align-items-end w-25">
                            <h1 class="fs-6">21159</h1>
                            <div class="d-flex flex-row align-items-center">
                                <label class="switch">
                                    <input type="checkbox" @change="handleCheck">
                                    <span class="sliderButton round"></span>
                                </label>
                                <h1 class="navbar-brand fs-6 m-2 ">Dark mode</h1>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            
            
    `
}