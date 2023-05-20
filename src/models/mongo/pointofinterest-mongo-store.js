import { Pointofinterest } from "./pointofinterest.js";
import { Country } from "./country.js";
import { Review } from "./review.js";

export const pointofinterestMongoStore = {
    async getAllPointofinterests() {
        const pointofinterests = await Pointofinterest.find().lean();
        return pointofinterests;
    },

    async addPointofinterest(countryId, pointofinterest) {
        pointofinterest.countryid = countryId;
        const newPointofinterest = new Pointofinterest(pointofinterest);
        const pointofinterestObj = await newPointofinterest.save();
        return this.getPointofinterestById(pointofinterestObj._id);
    },

    async getPointofinterestsByCountryId(id) {
        const pointofinterests = await Pointofinterest.find({ countryid: id }).lean();
        return pointofinterests;
    },

    async getPointofinterestById(id) {
        if (id) {
            const pointofinterest = await Pointofinterest.findOne({ _id: id }).lean();
            return pointofinterest;
        }
        return null;
    },

    async deletePointofinterest(id) {
        try {
            await Pointofinterest.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllPointofinterests() {
        await Pointofinterest.deleteMany({});
    },

    async updatePointofinterest(pointofinterest, updatedPointofinterest) {
        pointofinterest.title = updatedPointofinterest.title;
        pointofinterest.county = updatedPointofinterest.county;
        pointofinterest.description = updatedPointofinterest.description;
        pointofinterest.latitude = updatedPointofinterest.latitude;
        pointofinterest.longitude = updatedPointofinterest.longitude;
        await pointofinterest.save();
    },

    async getReviewsByPointofinterestId(pointofinterestId) {
        const pointofinterest = await Pointofinterest.findById(pointofinterestId);
        return pointofinterest.reviews;
    },

    async addReviewByPointofinterestId(pointofinterestId, review) {
        const pointofinterest = await Pointofinterest.findById(pointofinterestId);
        pointofinterest.reviews.push(review);
        await pointofinterest.save();
    },

    async deleteReviewByPointofinterestIdAndReviewId(
        pointofinterestId,
        reviewId
    ) {
        const pointofinterest = await Pointofinterest.findById(pointofinterestId);
        pointofinterest.reviews = pointofinterest.reviews.filter(
            (review) => review._id !== reviewId
        );
        await pointofinterest.save();
    },


};
