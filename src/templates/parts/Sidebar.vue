<template>
    <div id="mySidenav" class="sidenav">
        <aside class="menu">
            <div class="menu-label-top">
                <a href="/crud" class="has-text-grey-light">
                    <img src="add-512.png" height="28" width="17">
                </a>
                <span role="button" data="2" id="nav2" class="navix closebtn has-text-grey-light">
                    <i class="fa-thin fa-xmark"></i>
                </span>
            </div>
            <ul class="menu-list">
                <li>
                    <a href="/crud" class="has-text-grey-lighter">
                        <i class="fa-light fa-map-pin icon-menu-parent fa-rotate-270"></i> Home
                    </a>
                </li>
                <li>
                    <a href="documentation.php" class="has-text-grey-lighter">
                        <i class="fa-light fa-map-pin icon-menu-parent fa-rotate-270"></i> Documentation
                    </a>
                </li>
                <li>
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
                </li>
            </ul>
        </aside>
    </div>
</template>


<script>
export default {
    name: 'Sidebar',
    mounted() {
        // check if numbe is odd
        function isOdd(num) { return num % 2; }
        // click counter
        let clickCount = 0;
        // click behaviour
        document.querySelectorAll(".navix").forEach(function (el) {
            el.addEventListener("click", function () {
                console.log(2);
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
        let menuCount = 0;
        document.querySelectorAll(".menu-has-sub").forEach(function (el) {
            el.addEventListener("click", function () {
                menuCount += 1;
                if (isOdd(menuCount)) {
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
            });
        });
    }
}
</script>