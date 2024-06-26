import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import { imageSearch } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";

const searchForm = document.querySelector('#search-form');
const galleryImages = document.querySelector('.gallery');
let loader = null;
const moreButton = document.querySelector('.more-btn');
let currentPage = 1;
let currentQuery = '';
let allImages = []; 

function showLoader() {
    if (!loader) {
        loader = document.createElement('div');
        loader.classList.add('loader', 'loading');
        document.body.appendChild(loader);
    } else {
        loader.classList.add('loading');
    }
}

function hideLoader() {
    if (loader) {
        loader.remove();
        loader = null;
    }
}

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    galleryImages.innerHTML = '';
    const query = event.target.querySelector('#search-input').value.trim();

    if (query) {
        showLoader();
        try {
            const data = await imageSearch(query);
            if (data === null) {
                iziToast.error({
                    position: "topRight",
                    title: '❌',
                    icon: '',
                    message: "Sorry, there are no images matching your search query. Please try again!",
                });
                moreButton.classList.add('is-hidden');
            } else {
                allImages = data.hits; 
                renderImages(allImages, galleryImages);
                toggleMoreButton(data.totalHits, allImages.length);
                currentQuery = query;
                currentPage = 1;
            }
        } catch (error) {
            console.error(error);
        } finally {
            hideLoader();
        }
    } 
    event.target.reset();
});


moreButton.addEventListener('click', async (event) => {
    showLoader();
    try {
        const nextPageData = await imageSearch(currentQuery, currentPage + 1);
        if (nextPageData === null || nextPageData.hits.length === 0) {
            moreButton.classList.add('is-hidden');
            iziToast.info({
                position: "topRight",
                title: '',
                message: "We're sorry, but you've reached the end of search results.",
            });
        } else {
            allImages = allImages.concat(nextPageData.hits);
            renderImages(allImages, galleryImages);
            currentPage++;

            const galleryItems = document.querySelectorAll('.gallery-item');
            const lastGalleryItem = galleryItems[galleryItems.length - nextPageData.hits.length];
            const cardHeight = lastGalleryItem.getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2, 
                behavior: 'smooth'
            });

            toggleMoreButton(nextPageData.totalHits, allImages.length);
        }
    } catch (error) {
        console.error(error);
    } finally {
        hideLoader();
    }
});

function toggleMoreButton(totalHits, loadedImagesCount) {
    if (loadedImagesCount >= totalHits) {
        moreButton.classList.add('is-hidden');
    } else {
        moreButton.classList.remove('is-hidden');
    }
}
