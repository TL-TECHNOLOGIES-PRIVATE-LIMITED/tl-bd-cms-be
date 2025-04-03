class StatsController {
    #StatsService
    constructor(statsService) {
        this.#StatsService = statsService

    }

    async totalCounts(req, res) {
        try {
            const counts = await this.#StatsService.getTotalCounts();
            res.json({
                success: true,
                counts
            });
        } catch (error) {
            console.error("Error fetching counts:", error.message);
            const statusCode = error.status || 500;
            res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

    async enquiryStats(req, res) {
        try {
            const chartData = await this.#StatsService.getEnquiryStats();
            res.json(chartData);
        } catch (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({ 
                error: "Failed to fetch data" 
            });
        }
    }



    async activeUsers(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const dateRange = {
                startDate: startDate || '30daysAgo',
                endDate: endDate || 'today'
            };

            const result = await this.#StatsService.activeUsersAnalytics(dateRange);

            if (!result.length) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'No active users data found.' 
                });
            }

            res.json({ success: true, data: result });
        } catch (error) {
            console.error('Error fetching active users:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch active users.' 
            });
        }
    }

    async engagedSessions(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const dateRange = {
                startDate: startDate || '30daysAgo',
                endDate: endDate || 'today'
            };

            const result = await this.#StatsService.engagedSessionsAnalytics(dateRange);

            if (!result.length) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'No engaged sessions data found.' 
                });
            }

            res.json({ success: true, data: result });
        } catch (error) {
            console.error('Error fetching engaged sessions:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch engaged sessions.' 
            });
        }
    }

    async cityStats(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const dateRange = {
                startDate: startDate || '30daysAgo',
                endDate: endDate || 'today'
            };

            const result = await this.#StatsService.cityStatsAnalytics(dateRange);

            if (!result.length) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'No city statistics found.' 
                });
            }

            res.json({ success: true, data: result });
        } catch (error) {
            console.error('Error fetching city stats:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch city-wise stats.' 
            });
        }
    }

    async totalPageViews(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const dateRange = {
                startDate: startDate || '30daysAgo',
                endDate: endDate || 'today'
            };

            const result = await this.#StatsService.pageViewsAnalytics(dateRange);

            if (!result.length) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'No page view data found.' 
                });
            }

            res.json({ success: true, data: result });
        } catch (error) {
            console.error('Error fetching page views:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch total page views.' 
            });
        }
    }

    async bounceRate(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const dateRange = {
                startDate: startDate || '30daysAgo',
                endDate: endDate || 'today'
            };

            const result = await this.#StatsService.bounceRateAnalytics(dateRange);

            if (!result.length) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'No bounce rate data found.' 
                });
            }

            res.json({ success: true, data: result });
        } catch (error) {
            console.error('Error fetching bounce rate:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch bounce rate.' 
            });
        }
    }

    async pageViewsByPage(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const dateRange = {
                startDate: startDate || '30daysAgo',
                endDate: endDate || 'today'
            };

            const result = await this.#StatsService.pageViewsByPageAnalytics(dateRange);

            if (!result.length) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'No page-wise view data found.' 
                });
            }

            res.json({ success: true, data: result });
        } catch (error) {
            console.error('Error fetching page views by page:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch page views by page.' 
            });
        }
    }

    async trafficSources(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const dateRange = {
                startDate: startDate || '30daysAgo',
                endDate: endDate || 'today'
            };

            const result = await this.#StatsService.trafficSourcesAnalytics(dateRange);

            if (!result.sources.length) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'No traffic sources data found.' 
                });
            }

            res.json({ 
                success: true, 
                data: result.sources,
                summary: result.summary
            });
        } catch (error) {
            console.error('Error fetching traffic sources data:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch traffic sources data.' 
            });
        }
    }

    async sessionDuration(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const dateRange = {
                startDate: startDate || '30daysAgo',
                endDate: endDate || 'today'
            };

            const result = await this.#StatsService.sessionDurationAnalytics(dateRange);

            if (!result.length) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'No session duration data found.' 
                });
            }

            res.json({ success: true, data: result });
        } catch (error) {
            console.error('Error fetching session duration data:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch session duration data.' 
            });
        }
    }

    async totalEnquiries(req, res) {
        try {
            const totalEnquiries = await this.#StatsService.totalEnquiriesAnalytics();

            res.status(200).json({
                success: true,
                data: totalEnquiries,
            });
        } catch (error) {
            console.error("Error fetching total enquiries:", error.message);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    async newsletterSubscribers(req, res) {
        try {
            const totalSubscribers = await this.#StatsService.newsletterSubscribersAnalytics();

            res.status(200).json({
                success: true,
                data: totalSubscribers,
            });
        } catch (error) {
            console.error("Error fetching total newsletter subscribers:", error.message);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }



}
export default StatsController