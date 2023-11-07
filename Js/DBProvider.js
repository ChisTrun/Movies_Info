import db from '../db/data.js'

export default {

    methods: {
        async fetch(query) {
            const [type, className, pattern, params] = await this.parseQuery(query);
            const result = await this.getData(type, className, pattern, params);
            if (result) {
                return result;
            } else {
                throw new Error('no data');
            }
        },

        async parseQuery(query) {
            const [path, paramString] = query.split('?');
            const [type, className, pattern] = path.split('/');
            if (paramString != null) {
                const params = await this.parseParams(paramString);
                return [type, className, pattern, params];
            }
            return [type, className, pattern, {}];
        },

        async parseParams(paramString) {
            const params = {};
            paramString.split('&').forEach(param => {
                const [key, value] = param.split('=');
                params[key] = value || null;
            });
            return params;
        },

        async getData(type, className, pattern, params) {
            let data = db[className];
            let perPage = 1;
            let page = 1;
            let items;
            let search_type = "title";
            if (('per_page' in params)) {
                perPage = params.per_page;
            }
            if ('page' in params) {
                page = params.page;
            }
            let startIndex = (page - 1) * perPage;
            let endIndex = perPage * page - 1;
            switch (type) {
                case 'search':
                    if ('search_type' in params) {
                        search_type = params.search_type;
                    }
                    if (search_type == 'title') {
                        data = data.filter(movie => movie.title.toLowerCase().includes(pattern.toLowerCase()));
                    } else if (search_type == 'actor') {
                        data = data.filter(movie => movie.actorList.some(actor => actor.name.toLowerCase().includes(pattern.toLowerCase())));
                    }
                    items = data.slice(startIndex, endIndex + 1);
                    return {
                        search: className,
                        page: page,
                        per_page: perPage,
                        total_page: Math.ceil(data.length / perPage),
                        items: items
                    }
                case 'get':
                    
                    if (className == "Reviews") {
                        try {
                            data = (data.filter(item => item.movieId == pattern))[0].items;
                        } catch (error) {
                            return false;
                        };
                    }
                    if (pattern == 'top-grossing') {
                        data = data.sort((a, b) => {
                            const grossObj1 = Number(a.boxOffice.cumulativeWorldwideGross.replace(/[^0-9.-]+/g, ""));
                            const grossObj2 = Number(b.boxOffice.cumulativeWorldwideGross.replace(/[^0-9.-]+/g, ""));
                            return grossObj2 - grossObj1;
                        })
                    }
                    startIndex = (page - 1) * perPage;
                    endIndex = perPage * page - 1;
                    items = data.slice(startIndex, endIndex + 1);
                    return {
                        get: className,
                        page: page,
                        per_page: perPage,
                        total_page: Math.ceil(data.length / perPage),
                        items: items
                    }
                case 'detail':
                    items = data.filter(item => item.id == pattern);
                    return {
                        detail: pattern,
                        items: items
                    }
                default:
                    return false;
            }
        },

    },

}
