import { PointofinterestSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

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
};
