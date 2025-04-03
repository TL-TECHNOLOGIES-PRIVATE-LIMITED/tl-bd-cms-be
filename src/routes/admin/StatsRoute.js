import express from "express";
import Repositorys from "../../repositories/repositorys.js";
import StatsService from "../../services/statsService.js";
import StatsController from "../../controllers/statsController.js";



const router = express.Router();
const statsController = new StatsController(new StatsService(new Repositorys));

router.get("/total-counts", (req, res) => statsController.totalCounts(req, res));
router.get("/enquiry-stats", (req, res) => statsController.enquiryStats(req, res));

// New analytics routes
router.get("/country-analytics", (req, res) => statsController.countryAnalytics(req, res));
router.get("/active-users", (req, res) => statsController.activeUsers(req, res));
router.get("/engaged-sessions", (req, res) => statsController.engagedSessions(req, res));
router.get("/city-stats", (req, res) => statsController.cityStats(req, res));
router.get("/page-views", (req, res) => statsController.totalPageViews(req, res));
router.get("/bounce-rate", (req, res) => statsController.bounceRate(req, res));
router.get("/page-views-by-page", (req, res) => statsController.pageViewsByPage(req, res));
router.get("/traffic-sources", (req, res) => statsController.trafficSources(req, res));
router.get("/session-duration", (req, res) => statsController.sessionDuration(req, res));
router.get("/total-enquiries", (req, res) => statsController.totalEnquiries(req, res));
router.get("/newsletter-subscribers", (req, res) => statsController.newsletterSubscribers(req, res));
export default router;