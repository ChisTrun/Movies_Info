import DBProvider from '../Js/DBProvider.js'

export default {
    props: ['targetActor'],
    data() {
        return {
            actor: Object,
            hasData: false,
            films: [],
            page: 1,
            perPage: 1,
            listSize: 0,
        }
    },
    computed: {
        total_page(){
            if(Math.ceil(this.listSize / this.perPage) == 0) this.page = 0;
            return Math.ceil(this.listSize / this.perPage);
        },
        startIndex() { return (this.page - 1) * this.perPage },
        endIndex() { return this.perPage * this.page - 1 }
    },
    methods: {
        async getFilms(films) {
            const tempList = [];
            for (const film of films) {

                const tempItem = (await DBProvider.methods.fetch(`detail/Movies/${film.id}`)).items[0];
                if (tempItem != null) {
                    this.listSize +=1;
                    tempList.push(tempItem);
                }
            }
            return tempList;

        },
        async getData() {
            try {
                this.actor = (await DBProvider.methods.fetch(`detail/Names/${this.targetActor}`)).items[0];
                this.films = await this.getFilms(this.actor.castMovies);
                this.hasData = true;
            } catch (error) {
                console.log(error)
            }
        },
        changePage(isNext) {
            if (isNext && this.page < this.total_page) {
                this.page += 1;
            } else if (!isNext && this.page > 1) {
                this.page -= 1;
            }
        },

    },
    mounted() {
        this.getData();
    },
    template:
        `
    <div v-if="hasData" class="row p-3">

    <div class="col-12">
        <table class="table">
            <tbody>
                <tr>
                    <th class="custom-width">Image</th>
                    <td><img :src="actor.image " class="rounded w-25  mx-auto d-block" alt="..."></td>
                </tr>
                <tr>
                    <th class="custom-width">Name</th>
                    <td>{{actor.name}}</td>
                </tr>
                <tr>
                    <th>Summary</th>
                    <td>{{actor.summary}}</td>
                </tr>
                <tr>
                    <th>castMovies</th>
                    <td>
                        <div class="card-deck">
                            <ul class="pagination d-flex  justify-content-center">
                                <li class="page-item">
                                    <a class="page-link" @click="changePage(false)"   aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li class="page-item w-25 text-center " >{{page}}/{{total_page}}</li>
                                <li class="page-item">
                                    <a class="page-link" @click="changePage(true)"  aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                            <div v-for="(film,index) in films" class="card ">
                                <div v-if="index >= startIndex && index <= endIndex" class="card-body bg-secondary">
                                    <h5 class="card-title text-light">{{film.fullTitle}}</h5>
                                    <p class="card-text text-light">{{film.awards}}</p>
                                    <p class="card-text text-light" v-html="film.plotFull"></p>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>

    <div class="row">
</div>

</div>
<div v-else>
        <div class="alert alert-danger " role="alert">
                <h4 class="alert-heading">Data Not Found or Currently Being Updated</h4>
                <p>I apologize for the inconvenience. The data you are looking for is currently unavailable or in the process of being updated. We understand the importance of this information to you and are working diligently to resolve this issue. We appreciate your patience and understanding during this time.</p>
                <hr>
                <p class="mb-0">Best Regards, Vo Chi Trung.</p>
        </div>
    </div>

    `
}