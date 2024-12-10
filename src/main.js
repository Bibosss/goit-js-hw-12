import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { pixabayApi } from "./js/pixabay-api.js"
import { createGallery, renderGallery } from "./js/render-function.js"

const searchForm = document.querySelector('.js-search-form');
const gallery = document.querySelector(".js-gallery")
const loader = document.querySelector(".loader")
const loadMoreBtn = document.querySelector(".js-load-more");



let page = 1;
const per_page = 15;
let searchQuery = "";
let totalPages = 0;

searchForm.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", handleClickOn)


function toLoader(show) {
    if (show) {
        loader.classList.remove("hidden");
    }
    else {
        loader.classList.add("hidden");
    }
};

async function handleSubmit(event) {
    event.preventDefault();

    searchQuery = event.target.elements.user_query.value.trim();

    if (!searchQuery) {
        loadMoreBtn.classList.replace("load-more", "hidden")
        iziToast.error({
            message: 'Please write smth normal.',
            position: 'topRight',
        });
        return;
    };

    page = 1;
    gallery.innerHTML = "";
    loadMoreBtn.classList.replace("load-more", "hidden");
    toLoader(true);

    try {
        const data = await pixabayApi(searchQuery, page, per_page);

        if (data.total === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
            return;
        };

        renderGallery(data.hits);
        totalPages = Math.ceil(data.totalHits / per_page);

        if (page < totalPages) {
            loadMoreBtn.classList.replace("hidden", "load-more");
        };
    }
    catch (error) {
        iziToast.error({
            message: 'Failed to fetch images. Please try again later.',
            position: 'topRight',
        });
    } finally {
        toLoader(false);
    }

    event.target.elements.user_query.value = "";
}

async function handleClickOn() {
    page++;

    loadMoreBtn.disabled = true;

    try {
        const data = await pixabayApi(searchQuery, page, per_page);
        renderGallery(data.hits);
        
        if (page >= totalPages) {
            loadMoreBtn.classList.replace("load-more", "hidden")
            iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
        });
        }


        const card = document.querySelector(".gallery_item");
        const cardHeight = card.getBoundingClientRect().height;

        window.scrollBy({
            left: 0,
            top: cardHeight * 2,
            behavior: "smooth",
        })
        
    }
    catch (error) {
        iziToast.error({
            message: 'Failed to load more images. Please try again later.',
            position: 'topRight',
        });
    }
    finally {
        loadMoreBtn.disabled = false;
    }
}
