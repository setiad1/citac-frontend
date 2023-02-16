<template>
    <div id="mySidenav" class="sidenav">
        <aside class="menu">
            <div class="menu-label-top">
                <a href="/" class="has-text-grey-light">
                    <img src="add-512.png" height="28" width="17">
                </a>
                <span role="button" data="2" id="nav2" class="navix closebtn has-text-grey-light">
                    <i class="fa-thin fa-xmark"></i>
                </span>
            </div>
            <ul class="menu-list">
                <template v-for="(item, index) in menus" :key="index">
                    <template v-if="Object.keys(item.children).length === 0">
                        <li>
                            <router-link :to="item.to" class="has-text-grey-lighter">
                                <i class="fa-light fa-map-pin icon-menu-parent fa-rotate-270"></i> {{ item.label }}
                            </router-link>
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            <a class="menu-has-sub has-text-grey-lighter" v-on:click="Tes($event)">
                                <i class="fa-light fa-map-pin icon-menu-parent fa-rotate-270"></i> {{ item.label }} 
                                <span class="is-pulled-right" style="line-height: 30px;">
                                    <i class="fa-solid fa-angle-right hidex"></i>
                                    <i class="fa-solid fa-angle-down showx"></i>
                                </span>
                            </a>
                            <ul class="menu-has-sub-list">
                                <template v-for="(i, x) in item.children" :key="x">
                                    <li class="p-1">
                                        <router-link :to="i.to" class="p-0 has-text-grey-light">
                                            <i class="fa-solid fa-check"></i> {{ i.label }}
                                        </router-link>
                                    </li>
                                </template>
                            </ul>
                        </li>
                    </template>
                </template>
                
                <!-- <li>
                    <a href="documentation.php" class="has-text-grey-lighter">
                        <i class="fa-light fa-map-pin icon-menu-parent fa-rotate-270"></i> Documentation
                    </a>
                </li> -->
                <!-- <li>
                    <a class="menu-has-sub has-text-grey-lighter">
                        <i class="fa-light fa-map-pin icon-menu-parent fa-rotate-270"></i> User 
                        <span class="is-pulled-right" style="line-height: 30px;">
                            <i class="fa-solid fa-angle-right hidex"></i>
                            <i class="fa-solid fa-angle-down showx"></i>
                        </span>
                    </a>
                    <ul class="menu-has-sub-list">
                        <li class="p-1">
                            <a href="list.php" class="p-0 has-text-grey-light">
                                <i class="fa-solid fa-check"></i> List
                            </a>
                        </li>
                        <li class="p-1">
                            <a href="daftar.php" class="p-0 has-text-grey-light">
                                <i class="fa-solid fa-check"></i> Daftar
                            </a>
                        </li>
                        <li class="p-1">
                            <a class="p-0 has-text-grey-light">
                                <i class="fa-solid fa-check"></i> Lainnya
                            </a>
                        </li>
                    </ul>
                </li> -->
            </ul>
        </aside>
    </div>
</template>


<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            menus: {},
            clickCount: 0
        }
    },
    mounted() {
        this.fetchMenus();
        // check if numbe is odd
        function isOdd(num) { return num % 2; }
        // click counter
        let clickCount = 0;
        // click behaviour
        document.querySelectorAll(".navix").forEach(function (el) {
            el.addEventListener("click", function () {
                clickCount += 1;
                if (isOdd(clickCount)) {
                    document.getElementById("mySidenav").style.width = "260px";
                    el.classList.add("is-active");
                    let nav = el.getAttribute("data");
                    if (nav == 2) {
                        document.getElementById("nav1").classList.remove("is-active");
                    }
                }
                else {
                    el.classList.remove("is-active");
                    document.getElementById("mySidenav").style.width = "0";
                    let nav = el.getAttribute("data");
                    if (nav == 2) {
                        document.getElementById("nav1").classList.remove("is-active");
                    }
                }
            });
        });

        const nav2 = document.getElementById('mySidenav');
        const nav1 = document.getElementById("nav1");
        document.addEventListener('click', event => {
            const isClickInsideNav2 = nav2.contains(event.target);
            const isClickInsideNav1 = nav1.contains(event.target);
            if (!isClickInsideNav2) {
                if (!isClickInsideNav1) {
                    nav1.classList.remove("is-active");
                    nav2.style.width = "0";
                    clickCount = 0;
                }
            }
        });
    },
    methods: {
        fetchMenus: function() {
            this.axios.get("data/menu.json", {
            }).then((res) => {
                console.log(res.data);
                this.menus = res.data;
            }).catch((res) => {
                console.log(res.data);
            });
        },
        Tes: function(e) {
            var el = e.target;
            console.log(el.index);
            function isOdd(num) { return num % 2; }
            this.clickCount += 1;
            console.log(this.clickCount);
            if (isOdd(this.clickCount)) {
                el.nextElementSibling.style.display = "block";
                el.nextElementSibling.style.visibility = "visible";
                el.nextElementSibling.style.opacity = "1";
                el.lastElementChild.children[0].style.display = "none";
                el.lastElementChild.children[1].style.display = "block";
            }
            else {
                el.nextElementSibling.style.opacity = "0";
                el.nextElementSibling.style.display = "none";
                el.nextElementSibling.style.visibility = "hidden";
                el.lastElementChild.children[0].style.display = "block";
                el.lastElementChild.children[1].style.display = "none";
            }
        }
    }
}
</script>