import { PointofinterestSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { Review } from "../models/mongo/review.js";

export const countryController = {
    index: {
        handler: async function (request, h) {
            const country = await db.countryStore.getCountryById(request.params.id);
            const viewData = {
                title: "Country",
                country: country,
            };
            return h.view("country-view", viewData);
        },
    },

    addPointofinterest: {
        validate: {
            payload: PointofinterestSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("country-view", { title: "Add pointofinterest error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const country = await db.countryStore.getCountryById(request.params.id);
            const newPointofinterest = {
                title: request.payload.title,
                county: request.payload.county,
                description: request.payload.description,
                latitude: Number(request.payload.latitude),
                longitude: Number(request.payload.longitude),
            };
            await db.pointofinterestStore.addPointofinterest(country._id, newPointofinterest);
            return h.redirect(`/country/${country._id}`);
        },
    },

    deletePointofinterest: {
        handler: async function (request, h) {
            const country = await db.countryStore.getCountryById(request.params.id);
            await db.pointofinterestStore.deletePointofinterest(request.params.pointofinterestid);
            return h.redirect(`/country/${country._id}`);
        },
    },

    getPointofinterest: {
        handler: async function (request, h) {
            const country = await db.countryStore.getCountryById(request.params.id);
            const pointofinterest = await db.pointofinterestStore.getPointofinterestById(request.params.pointofinterestid);
            const reviews = await db.reviewStore.getReviewsByPointofinterest(pointofinterest._id);
            const viewData = {
                title: "Point of Interest",
                country: country,
                pointofinterest: pointofinterest,
                reviews: reviews,
            };
            return h.view("pointofinterest-view", viewData);
        },
    },

    addReview: {
        handler: async function (request, h) {
            const pointofinterestId = request.params.pointofinterestId;
            const review = {
                username: request.payload.username,
                rating: request.payload.rating,
                comment: request.payload.comment
            };
            await db.pointofinterestStore.addReviewByPointofinterestId(pointofinterestId, review);
            return h.redirect(`/country/${request.params.countryId}/pointofinterest/${pointofinterestId}`);
        }
    },

    deleteReview: {
        handler: async function (request, h) {
            const pointofinterestId = request.params.pointofinterestId;
            const reviewId = request.params.reviewId;
            await db.pointofinterestStore.deleteReviewByPointofinterestIdAndReviewId(pointofinterestId, reviewId);
            return h.redirect(`/country/${request.params.countryId}/pointofinterest/${pointofinterestId}`);
        }
    },

    listReviews: {
        handler: async function (request, h) {
            const pointofinterestId = request.params.pointofinterestId;
            const reviews = await db.pointofinterestStore.getReviewsByPointofinterestId(pointofinterestId);
            const viewData = {
                title: "Reviews",
                reviews: reviews
            };
            return h.view("reviews-view", viewData);
        }
    },
};
