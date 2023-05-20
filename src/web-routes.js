import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { countryController } from "./controllers/country-controller.js";
import { pointofinterestController } from "./controllers/pointofinterest-controller.js";
import { Review } from "./models/mongo/review.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },

    { method: "GET", path: "/about", config: aboutController.index },

    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "POST", path: "/dashboard/addcountry", config: dashboardController.addCountry },
    { method: "GET", path: "/dashboard/deletecountry/{id}", config: dashboardController.deleteCountry },

    { method: "GET", path: "/country/{id}", config: countryController.index },
    { method: "POST", path: "/country/{id}/addpointofinterest", config: countryController.addPointofinterest },
    { method: "GET", path: "/country/{id}/deletepointofinterest/{pointofinterestid}", config: countryController.deletePointofinterest },

    { method: "GET", path: "/pointofinterest/{id}/editpointofinterest/{pointofinterestid}", config: pointofinterestController.index },
    { method: "POST", path: "/pointofinterest/{id}/updatepointofinterest/{pointofinterestid}", config: pointofinterestController.update },
    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
    {
        method: "POST",
        path: "/country/{countryId}/pointofinterest/{pointofinterestId}/reviews",
        handler: async (request, h) => {
            const { review } = request.payload;
            const { countryId, pointofinterestId } = request.params;

            // Save the review to the database and associate it with the point of interest
            const savedReview = await Review.create({
                text: review,
                pointofinterest: pointofinterestId,
            });

            // Redirect back to the point of interest page
            return h.redirect(`/country/${countryId}/pointofinterest/${pointofinterestId}`);
        },
    }


];
