<template>
    <div ref="main" id="main" class="container is-fluid mt-5 p-32">
        <page-header></page-header>
        <div class="is-relative mb-5" style="min-height: 200px;">
            <loading v-model:active="isLoading"
            :can-cancel="false"
            :background-color="'white'"
            :opacity="1"
            :z-index="25"
            :loader="'spinner'"
            :is-full-page="fullPage">
                <template v-slot="before">
                    <img src="loaders/pica.gif" style="width: 65px" />
                </template>
            </loading>

            <template v-for="(i, index) in users" :key="index">
                <li v-show="!isLoading" style="list-style: none;">{{ (page * pageSize) - pageSize + index+1 }} ~ {{ i.name }} ({{ i.trips }})</li>
            </template>
        </div>

        <nav class="pagination is-small">
            <paginate
            v-model="page"
            :page-count="pageCount"
            :page-range="3"
            :margin-pages="0"
            :click-handler="clickCallback"
            :prev-link-class="'pagination-link'"
            :page-link-class="'pagination-link'"
            :next-link-class="'pagination-link'"
            :prev-text="'<i class=\'fa-solid fa-arrow-left\'></i>'"
            :next-text="'<i class=\'fa-solid fa-arrow-right\'></i>'"
            :no-li-surround="true"
            :active-class="'is-current'"
            :first-last-button="true"
            :first-button-text="'<i class=\'fa-solid fa-arrow-left-long-to-line\'></i>'"
            :last-button-text="'<i class=\'fa-solid fa-arrow-right-long-to-line\'></i>'"
            :hide-prev-next="true"
            :container-class="'pagination-list'"
            >
            </paginate>
        </nav>
    </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";
import Loading from "vue-loading-overlay";
import { ContentLoader, FacebookLoader } from 'vue-content-loader'

export default {
    name: "UsersView",
    components: {
        Paginate,
        Loading,
        FacebookLoader
    },
    data() {
        return {
            users: [],
            page: 1,
            pageCount: 0,
            pageSize: 15,
            isLoading: false,
            fullPage: false,
            loader: 'spinner'
        }
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        clickCallback: function (pageNum) {
            this.page = pageNum;
            this.getUsers();
        },
        getUsers: function() {
            let offset = this.page-1;
            this.isLoading = true;
            this.axios.get(`https://api.instantwebtools.net/v1/passenger?page=${offset}&size=${this.pageSize}`
            ).then((res) => {
                setTimeout(() => {
                    this.isLoading = false;
                    this.users = res.data.data;
                    this.pageCount = res.data.totalPages;
                }, 1000)
            })
        }
    }
}
</script>

<style scoped>
.vl-overlay {
    justify-content: left !important;
}
</style>
