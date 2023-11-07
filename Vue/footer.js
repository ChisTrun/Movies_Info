export default {
    props:['darkMode'],
    computed: {
        theme() {
            if(this.darkMode) return 'dark'
            return 'light'
        }
    },
    template:
    `
    <div class="row ">
        <nav class="navbar bg-body-tertiary rounded border border-light p-3 mb-2" :data-bs-theme="theme">
            <div class="container-fluid ">
                <h1 class="navbar-brand fs-6 ">footer</h1>
            </div>
        </nav>
    </div>
    `
}