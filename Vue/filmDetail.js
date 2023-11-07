import provider from '../Js/DBProvider.js'

export default {
    props: {
        targetFilm: "default",
        targetActor: "dafault",
        darkMode: Boolean
    },
    emits: ['showActor'],
    data() {
        return {
            film: Object,
            reviews: Object,
            currentPage: 1,
            perPage: 3,
            numberPage: 5,
            hasData: false,
        }
    },
    methods: {
        async getData() {
            this.film = (await provider.methods.fetch(`detail/Movies/${this.targetFilm}`)).items[0];
        },
        async getReviews(perPage, page) {
            this.reviews = (await provider.methods.fetch(`get/Reviews/${this.targetFilm}?per_page=${perPage}&page=${page}`));
        },

        async getAllData(perPage, page) {
            try {
                await this.getData();
                await this.getReviews(this.perPage, this.currentPage);
                this.hasData = true;
            } catch (error) {
                console.log(error);
            };

        },
        changeReviewPage(isNext) {
            if (isNext && this.currentPage < this.reviews.total_page) {
                this.currentPage += 1;
                this.getReviews(this.perPage, this.currentPage);
            } else if (!isNext && this.currentPage > 1) {
                this.currentPage -= 1;
                this.getReviews(this.perPage, this.currentPage);
            }
        },
        showActor(value){
            this.$emit('showActor',value);
        }

    },
    mounted() {
        this.getAllData(this.perPage, this.currentPage);
    },
    template:
        `
    <div v-if="hasData" >
        <div  class="row p-5">
                    <p class="display-1 " :class="{'text-light' : darkMode}">{{film.title}}</p>
                    <div id="carouselExampleFade" class="carousel slide carousel-fade detailSlider">
                        <div class="carousel-inner">
                            <div v-for="(item,index) in film.images" class="carousel-item" :class="{active: index == 1}">
                                <img :src="item.image" class="d-block w-50 mx-auto " alt="...">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>

                    </div>
                </div>
                <div class="row p-5">
                    <p class="display-3 " :class="{'text-light' : darkMode}">General information</p>
                    <div class="card">
                        <div class="card-body">
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <th class="custom-width">Title</th>
                                        <td>{{film.title}}</td>
                                    </tr>
                                    <tr>
                                        <th>Year</th>
                                        <td>{{film.year}}</td>

                                    </tr>
                                    <tr>
                                        <th>Director</th>
                                        <td >
                                            <template v-for="(director,index) in film.directorList" :key="index">
                                                <a>{{director.name}}
                                                <a v-if="index != film.directorList.length -1 ">, </a>
                                                </a>
                                            </template>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Actor</th>
                                        <td >
                                            <template v-for="(actor,index) in film.actorList" :key="index">
                                                <a @click="showActor(actor.id)">{{actor.name}}
                                                <a v-if="index != film.actorList.length -1 ">, </a>
                                                </a>
                                            </template>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Type</th>
                                        <td>{{film.type}}

                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Plot Full</th>
                                        <td v-html="film.plotFull"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div class="row p-5">
                    <p class="display-3 " :class="{'text-light' : darkMode}"  >Review</p>
                    <div class="card">
                        <div class="card-body">
                    
                            <div v-for="review in reviews.items" class="card mb-3">
                                <div class="row g-0">
                                    <div class="col-12">
                                        <div class="card-body">
                                            <h5 class="card-title">{{review.username}}</h5>
                                            <p class="card-text display-3">{{review.rate}}
                                            </p>
                                            <p class="card-text">{{review.title}}
                                            </p>
                                            <p class="card-text">{{review.content}}
                                            </p>
                                            <p class="card-text"><small class="text-body-secondary">{{review.date}}</small>
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                <li class="page-item">
                                    <a class="page-link"  @click="changeReviewPage(false)" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li class="page-item w-25 text-center">{{currentPage}}/{{reviews.total_page}}</li>
                                <li class="page-item">
                                    <a class="page-link" @click="changeReviewPage(true)"  aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                                </ul>
                            </nav>

                        </div>

                    </div>
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